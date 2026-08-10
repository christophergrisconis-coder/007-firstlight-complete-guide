/**
 * access.js
 * Quest & Guides — access state using QAG auth (qag_user in localStorage).
 * Falls back to basic tier for guests.
 * Admin/owner accounts always get pro tier and full access.
 */

const USER_KEY = 'qag_user';

function getQagUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export const getAccessState = async () => {
  const user = getQagUser();

  if (!user) {
    return {
      tier: 'basic',
      isSignedIn: false,
      source: 'guest',
      trialDaysLeft: 0,
      reason: 'Sign in for full guide access.',
    };
  }

  // Admin / owner accounts always get full pro access
  if (user.role === 'admin' || user.tier === 'pro') {
    return {
      tier: 'pro',
      isSignedIn: true,
      source: user.role === 'admin' ? 'owner' : 'subscription',
      trialDaysLeft: 0,
      reason: user.role === 'admin' ? 'Owner — full access.' : 'Pro membership active.',
    };
  }

  if (user.tier === 'trial') {
    return {
      tier: 'trial',
      isSignedIn: true,
      source: 'trial',
      trialDaysLeft: 3,
      reason: 'Free trial active.',
    };
  }

  return {
    tier: 'basic',
    isSignedIn: true,
    source: 'signed-in-free',
    trialDaysLeft: 0,
    reason: 'Subscribe to unlock full guide access.',
  };
};
