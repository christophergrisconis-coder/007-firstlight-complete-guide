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

create or replace view public.registration_metrics as
select count(*)::int as registration_count
from public.profiles;

alter table public.profiles enable row level security;
alter table public.subscribers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.missing_reports enable row level security;

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

-- Public metrics access (safe aggregated count only)
grant select on public.registration_metrics to anon, authenticated;
