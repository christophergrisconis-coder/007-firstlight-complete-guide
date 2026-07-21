import { assertSupabase } from "./supabase-client.js";
import { getVisitTotals } from "./traffic-metrics.js";

const statusEl = document.querySelector("#admin-status");
const metricsWrap = document.querySelector("#admin-metrics");
const registrationsEl = document.querySelector("#admin-registration-count");
const visitsEl = document.querySelector("#admin-total-visits");
const ownerEl = document.querySelector("#admin-owner-email");
const refreshBtn = document.querySelector("#admin-refresh");

const setStatus = (text) => {
  if (statusEl) {
    statusEl.textContent = text;
  }
};

const setMetric = (node, value) => {
  if (!node) {
    return;
  }
  node.textContent = value;
};

const renderSignedOut = () => {
  setStatus("Sign in with your owner account to view admin metrics.");
  setMetric(registrationsEl, "--");
  setMetric(visitsEl, "--");
  setMetric(ownerEl, "Not signed in");
  metricsWrap?.classList.add("admin-metrics-disabled");
};

const loadOwnerMetrics = async (supabase) => {
  try {
    await supabase.rpc("claim_owner_metrics");
    const { data, error } = await supabase.rpc("get_owner_registration_count");
    if (error) {
      throw error;
    }
    const count = Number(data || 0).toLocaleString();
    setMetric(registrationsEl, count);
  } catch (error) {
    setMetric(registrationsEl, "Owner-only");
    setStatus(error.message || "Unable to load owner metrics.");
  }
};

const loadVisitMetrics = async () => {
  try {
    const visits = await getVisitTotals();
    const total = Number(visits.totalVisits || 0).toLocaleString();
    const sourceSuffix = visits.source === "local" ? " (cached)" : "";
    setMetric(visitsEl, `${total}${sourceSuffix}`);
  } catch {
    setMetric(visitsEl, "Unavailable");
  }
};

const refreshAdmin = async () => {
  let supabase;
  try {
    supabase = assertSupabase();
  } catch (error) {
    setStatus(error.message);
    setMetric(ownerEl, "Supabase not configured");
    setMetric(registrationsEl, "--");
    await loadVisitMetrics();
    return;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    renderSignedOut();
    await loadVisitMetrics();
    return;
  }

  metricsWrap?.classList.remove("admin-metrics-disabled");
  setMetric(ownerEl, session.user.email || "Owner session active");
  setStatus("Loading owner metrics...");

  await Promise.all([loadOwnerMetrics(supabase), loadVisitMetrics()]);
  setStatus(`Last refreshed: ${new Date().toLocaleTimeString()}`);
};

refreshBtn?.addEventListener("click", refreshAdmin);
refreshAdmin();
setInterval(refreshAdmin, 30000);