-- Run this in Supabase SQL Editor.
-- This schema creates real auth-linked profile records,
-- a safe registration metrics view, and subscriber storage.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  trial_ends_at timestamptz not null default (now() + interval '3 days'),
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null default 'inactive',
  price_cents int not null default 199,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, provider)
);

create table if not exists public.missing_reports (
  id bigint generated always as identity primary key,
  reporter_email text,
  page_url text,
  details text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.quest_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null,
  quest_id text not null,
  completed boolean not null default false,
  current_step int not null default 0,
  is_expanded boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id, quest_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (id) do update
  set email = excluded.email,
      display_name = excluded.display_name,
      trial_ends_at = coalesce(public.profiles.trial_ends_at, now() + interval '3 days');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.subscribers (
  id bigint generated always as identity primary key,
  email text unique not null,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.owner_metrics (
  id boolean primary key default true,
  owner_user_id uuid unique references auth.users(id) on delete set null,
  registration_count int not null default 0,
  updated_at timestamptz not null default now(),
  check (id = true)
);

insert into public.owner_metrics (id, registration_count)
values (true, (select count(*)::int from public.profiles))
on conflict (id) do nothing;

create or replace function public.refresh_owner_registration_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.owner_metrics
  set registration_count = (select count(*)::int from public.profiles),
      updated_at = now()
  where id = true;

  return null;
end;
$$;

drop trigger if exists owner_registration_count_refresh on public.profiles;
create trigger owner_registration_count_refresh
after insert or delete on public.profiles
for each statement execute procedure public.refresh_owner_registration_count();

create or replace function public.claim_owner_metrics()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_owner uuid;
begin
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;

  select owner_user_id into current_owner
  from public.owner_metrics
  where id = true;

  if current_owner is null then
    update public.owner_metrics
    set owner_user_id = auth.uid(),
        updated_at = now()
    where id = true;
    return;
  end if;

  if current_owner <> auth.uid() then
    raise exception 'Owner metrics already claimed by another account';
  end if;
end;
$$;

create or replace function public.get_owner_registration_count()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  total_count int;
  current_owner uuid;
begin
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;

  select owner_user_id into current_owner
  from public.owner_metrics
  where id = true;

  if current_owner is null or current_owner <> auth.uid() then
    raise exception 'Not authorized for owner metrics';
  end if;

  select registration_count into total_count
  from public.owner_metrics
  where id = true;

  return coalesce(total_count, 0);
end;
$$;

alter table public.profiles enable row level security;
alter table public.subscribers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.missing_reports enable row level security;
alter table public.quest_progress enable row level security;
alter table public.owner_metrics enable row level security;

-- Profiles policies
-- Users can read/update only their own profile.
drop policy if exists "profile read own" on public.profiles;
create policy "profile read own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profile update own" on public.profiles;
create policy "profile update own"
on public.profiles
for update
using (auth.uid() = id);

drop policy if exists "subscription read own" on public.subscriptions;
create policy "subscription read own"
on public.subscriptions
for select
using (auth.uid() = user_id);

drop policy if exists "quest progress own all" on public.quest_progress;
create policy "quest progress own all"
on public.quest_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Subscriber policies
-- Anyone can create/refresh their subscription record.
drop policy if exists "subscriber insert anon" on public.subscribers;
create policy "subscriber insert anon"
on public.subscribers
for insert
with check (true);

drop policy if exists "subscriber update anon" on public.subscribers;
create policy "subscriber update anon"
on public.subscribers
for update
using (true)
with check (true);

drop policy if exists "missing reports insert anon" on public.missing_reports;
create policy "missing reports insert anon"
on public.missing_reports
for insert
with check (true);

drop policy if exists "owner metrics read owner only" on public.owner_metrics;
create policy "owner metrics read owner only"
on public.owner_metrics
for select
using (auth.uid() = owner_user_id);

grant execute on function public.claim_owner_metrics() to authenticated;
grant execute on function public.get_owner_registration_count() to authenticated;
