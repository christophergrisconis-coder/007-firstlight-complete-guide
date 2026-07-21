import { HERO_IMAGE_MANIFEST } from "./image-manifest.js?v=2";
import { assertSupabase } from "./supabase-client.js";
import { GAMES } from "./games-data.js";
import { CUSTOM_GUIDE_ROUTES } from "./custom-guide-routes.js";
import { getVisitTotals } from "./traffic-metrics.js";

const hero = document.querySelector("#home-hero");
const homeGuidePreviewGrid = document.querySelector("#home-guide-preview-grid");

const resolveCustomRoute = (route) => {
  if (!route) {
    return route;
  }

  if (/^(https?:)?\/\//i.test(route) || route.startsWith("/")) {
    return route;
  }

  return `./${route.replace(/^\.\//, "")}`;
};

const guideHref = (id) => {
  const customRoute = CUSTOM_GUIDE_ROUTES[id];
  if (customRoute) {
    return resolveCustomRoute(customRoute);
  }
  return `./guide?game=${encodeURIComponent(id)}`;
};

const guideLinkAttrs = (id) => {
  const route = CUSTOM_GUIDE_ROUTES[id];
  if (!route) {
    return "";
  }
  const isExternal = /^(https?:)?\/\//i.test(route);
  return isExternal ? 'target="_blank" rel="noopener noreferrer"' : "";
};

const renderHomeGuidePreview = () => {
  if (!homeGuidePreviewGrid) {
    return;
  }

  const picks = GAMES.slice(0, 6);
  homeGuidePreviewGrid.innerHTML = picks
    .map((game) => {
      const quick = (game.guideSections || []).slice(0, 2);
      return `
        <article class="panel game-card home-preview-card">
          <p class="eyebrow">${game.featured ? "Popular Pick" : "Guide Pick"}</p>
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <ul class="guide-list">${quick.map((item) => `<li>${item}</li>`).join("")}</ul>
          <a class="btn btn-accent" href="${guideHref(game.id)}" ${guideLinkAttrs(game.id)}>Open Guide</a>
        </article>
      `;
    })
    .join("");
};

const renderRegistrationPanel = async () => {
  if (!hero) {
    return;
  }

  let supabase;
  try {
    supabase = assertSupabase();
  } catch (error) {
    console.info(error.message);
    return;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  const panel = document.createElement("section");
  panel.className = "hero-stats";
  panel.innerHTML = `
    <p class="eyebrow">Owner Metrics</p>
    <h2>Website Metrics</h2>
    <div class="metrics-stack">
      <p class="metric-label">Registered Accounts</p>
      <p id="registration-count" class="metric-value">Loading...</p>
      <p class="metric-label">Total Visits</p>
      <p id="total-visits-count" class="metric-value">Loading...</p>
    </div>
    <a class="btn btn-secondary" href="./pages/admin.html">Open Admin Dashboard</a>
    <p class="hero-note">Private count visible only to your owner account.</p>
  `;

  try {
    await supabase.rpc("claim_owner_metrics");
  } catch {
    return;
  }

  hero.querySelector(".hero-content")?.appendChild(panel);

  try {
    const { data, error } = await supabase.rpc("get_owner_registration_count");

    if (error) {
      throw error;
    }

    const value = Number(data || 0);
    panel.querySelector("#registration-count").textContent = String(value);
  } catch (error) {
    panel.querySelector("#registration-count").textContent = "Owner metrics unavailable";
    console.info(error.message);
  }

  try {
    const visits = await getVisitTotals();
    const total = Number(visits.totalVisits || 0).toLocaleString();
    const sourceSuffix = visits.source === "local" ? " (cached)" : "";
    panel.querySelector("#total-visits-count").textContent = `${total}${sourceSuffix}`;
  } catch {
    panel.querySelector("#total-visits-count").textContent = "Unavailable";
  }
};

const getHeroFrames = () => {
  const approved = HERO_IMAGE_MANIFEST.filter((item) => item.approvedUrl);
  if (!approved.length) {
    return [
      { approvedUrl: "", title: "Fallback Frame 1" },
      { approvedUrl: "", title: "Fallback Frame 2" },
      { approvedUrl: "", title: "Fallback Frame 3" },
    ];
  }
  return approved;
};

const startHeroRotation = () => {
  if (!hero) {
    return;
  }

  const frames = getHeroFrames();
  let idx = 0;

  const applyFrame = () => {
    const frame = frames[idx];
    if (frame.approvedUrl) {
      hero.style.backgroundImage = `linear-gradient(rgba(8, 12, 16, 0.58), rgba(8, 12, 16, 0.76)), url('${frame.approvedUrl}')`;
    } else {
      hero.style.backgroundImage = "linear-gradient(125deg, #0f171e 0%, #1a2731 56%, #263746 100%)";
    }
  };

  applyFrame();
  setInterval(() => {
    idx = (idx + 1) % frames.length;
    hero.classList.add("fade-out");
    setTimeout(() => {
      applyFrame();
      hero.classList.remove("fade-out");
    }, 260);
  }, 4500);
};

startHeroRotation();
renderRegistrationPanel();
renderHomeGuidePreview();
