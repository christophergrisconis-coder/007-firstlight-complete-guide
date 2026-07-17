import { supabase } from "./supabase-client.js";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

const daysBetween = (endIso) => {
  if (!endIso) {
    return 0;
  }
  const diff = new Date(endIso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
};

export const getAccessState = async () => {
  if (!supabase) {
    return {
      tier: "basic",
      isSignedIn: false,
      source: "config-missing",
      trialDaysLeft: 0,
      reason: "Configure Supabase to enable membership checks.",
    };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      tier: "basic",
      isSignedIn: false,
      source: "guest",
      trialDaysLeft: 0,
      reason: "Sign in for trial or Pro access.",
    };
  }

  const userId = session.user.id;
  const profileRes = await supabase
    .from("profiles")
    .select("trial_ends_at")
    .eq("id", userId)
    .single();

  const subscriptionRes = await supabase
    .from("subscriptions")
    .select("status,current_period_end")
    .eq("user_id", userId)
    .maybeSingle();

  const trialEndsAt = profileRes.data?.trial_ends_at || null;
  const trialDaysLeft = daysBetween(trialEndsAt);
  const trialActive = trialDaysLeft > 0;

  const sub = subscriptionRes.data;
  const subActive = Boolean(
    sub &&
      ACTIVE_STATUSES.has(String(sub.status || "").toLowerCase()) &&
      (!sub.current_period_end || new Date(sub.current_period_end).getTime() > Date.now())
  );

  if (subActive) {
    return {
      tier: "pro",
      isSignedIn: true,
      source: "subscription",
      trialDaysLeft,
      reason: "Pro membership active.",
    };
  }

  if (trialActive) {
    return {
      tier: "trial",
      isSignedIn: true,
      source: "trial",
      trialDaysLeft,
      reason: `Free trial active: ${trialDaysLeft} day(s) left.`,
    };
  }

  return {
    tier: "basic",
    isSignedIn: true,
    source: "expired-trial",
    trialDaysLeft: 0,
    reason: "Trial ended. Upgrade to Pro for full guide access.",
  };
};
