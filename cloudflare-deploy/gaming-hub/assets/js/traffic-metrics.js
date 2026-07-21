const COUNTAPI_NAMESPACE = "questandguides";
const PAGE_VIEWS_KEY = "gaming-hub-total-visits";
const VISITOR_KEY = "gaming-hub-visitor-id";
const LOCAL_METRICS_KEY = "gaming-hub-local-metrics";
const REQUEST_TIMEOUT_MS = 2500;

const inMemoryFlags = {
  trackedVisit: false,
};

const getStorage = (kind) => {
  try {
    return globalThis[kind] || null;
  } catch {
    return null;
  }
};

const localStorageRef = getStorage("localStorage");

const readLocalMetrics = () => {
  if (!localStorageRef) {
    return { totalVisits: 0, lastSeenAt: null };
  }

  try {
    const parsed = JSON.parse(localStorageRef.getItem(LOCAL_METRICS_KEY) || "{}");
    return {
      totalVisits: Number(parsed.totalVisits || 0),
      lastSeenAt: parsed.lastSeenAt || null,
    };
  } catch {
    return { totalVisits: 0, lastSeenAt: null };
  }
};

const writeLocalMetrics = (metrics) => {
  if (!localStorageRef) {
    return;
  }

  const payload = {
    totalVisits: Number(metrics.totalVisits || 0),
    lastSeenAt: metrics.lastSeenAt || new Date().toISOString(),
  };

  localStorageRef.setItem(LOCAL_METRICS_KEY, JSON.stringify(payload));
};

const ensureVisitorId = () => {
  if (!localStorageRef) {
    return "anonymous-visitor";
  }

  const existing = localStorageRef.getItem(VISITOR_KEY);
  if (existing) {
    return existing;
  }

  const generated = `v-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
  localStorageRef.setItem(VISITOR_KEY, generated);
  return generated;
};

const countApiUrl = (path) => `https://api.countapi.xyz/${path}`;

const fetchWithTimeout = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const hitCountApi = async () => {
  const url = countApiUrl(`hit/${encodeURIComponent(COUNTAPI_NAMESPACE)}/${encodeURIComponent(PAGE_VIEWS_KEY)}`);
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Count API hit failed (${response.status})`);
  }

  const data = await response.json();
  return Number(data.value || 0);
};

const readCountApi = async () => {
  const url = countApiUrl(`get/${encodeURIComponent(COUNTAPI_NAMESPACE)}/${encodeURIComponent(PAGE_VIEWS_KEY)}`);
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Count API get failed (${response.status})`);
  }

  const data = await response.json();
  return Number(data.value || 0);
};

export const trackSiteVisit = async () => {
  if (inMemoryFlags.trackedVisit) {
    return;
  }

  inMemoryFlags.trackedVisit = true;
  ensureVisitorId();

  const current = readLocalMetrics();
  writeLocalMetrics({
    totalVisits: current.totalVisits + 1,
    lastSeenAt: new Date().toISOString(),
  });

  try {
    const totalVisits = await hitCountApi();
    writeLocalMetrics({ totalVisits, lastSeenAt: new Date().toISOString() });
  } catch {
    // Local total is already bumped above so the UI still has a usable number.
  }
};

export const getVisitTotals = async () => {
  const fallback = readLocalMetrics();

  try {
    const totalVisits = await readCountApi();
    writeLocalMetrics({ totalVisits, lastSeenAt: new Date().toISOString() });
    return { totalVisits, source: "live" };
  } catch {
    return { totalVisits: fallback.totalVisits, source: "local" };
  }
};