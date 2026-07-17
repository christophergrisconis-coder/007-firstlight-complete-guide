const ANALYTICS_STORAGE_KEY = "first-light-guide-analytics-v1";
const COUNT_API_BASE = "https://api.countapi.xyz";
const COUNT_API_NAMESPACE = "007-firstlight-complete-guide";

const loadAnalyticsState = () => {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveAnalyticsState = (state) => {
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(state));
};

const createVisitorId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const requestJson = async (path) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${COUNT_API_BASE}${path}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`CountAPI request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const hitCounter = async (key) => {
  const payload = await requestJson(`/hit/${COUNT_API_NAMESPACE}/${key}`);
  return Number(payload?.value || 0);
};

const getCounter = async (key) => {
  const payload = await requestJson(`/get/${COUNT_API_NAMESPACE}/${key}`);
  return Number(payload?.value || 0);
};

export const getInitialUserTracker = () => ({
  loading: true,
  available: false,
  source: "pending",
  newUsersTotal: null,
  pageViewsTotal: null,
  visitorIdShort: "",
  message: "Loading user tracker...",
  lastUpdated: null,
});

export const fetchUserTracker = async () => {
  const local = loadAnalyticsState();
  const visitorId = local.visitorId || createVisitorId();
  const visitorIdShort = visitorId.slice(0, 8);

  const nextLocal = {
    ...local,
    visitorId,
    seenAsNewUser: Boolean(local.seenAsNewUser),
    lastKnownNewUsersTotal: Number.isFinite(local.lastKnownNewUsersTotal)
      ? local.lastKnownNewUsersTotal
      : null,
    lastKnownPageViewsTotal: Number.isFinite(local.lastKnownPageViewsTotal)
      ? local.lastKnownPageViewsTotal
      : null,
  };

  saveAnalyticsState(nextLocal);

  try {
    const pageViewsTotal = await hitCounter("page-views");

    let newUsersTotal;
    if (!nextLocal.seenAsNewUser) {
      newUsersTotal = await hitCounter("new-users");
      nextLocal.seenAsNewUser = true;
    } else {
      newUsersTotal = await getCounter("new-users");
    }

    nextLocal.lastKnownNewUsersTotal = newUsersTotal;
    nextLocal.lastKnownPageViewsTotal = pageViewsTotal;
    saveAnalyticsState(nextLocal);

    return {
      loading: false,
      available: true,
      source: "countapi",
      newUsersTotal,
      pageViewsTotal,
      visitorIdShort,
      message: "New users are counted once per browser profile.",
      lastUpdated: new Date().toISOString(),
    };
  } catch {
    return {
      loading: false,
      available: false,
      source: "local-cache",
      newUsersTotal: nextLocal.lastKnownNewUsersTotal,
      pageViewsTotal: nextLocal.lastKnownPageViewsTotal,
      visitorIdShort,
      message:
        "Live analytics unavailable right now. Showing cached values when available.",
      lastUpdated: nextLocal.lastUpdated || null,
    };
  }
};
