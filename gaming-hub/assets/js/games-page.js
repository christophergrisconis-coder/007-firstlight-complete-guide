import { GAMES } from "./games-data.js";
import { getAccessState } from "./access.js";
import { CUSTOM_GUIDE_ROUTES } from "./custom-guide-routes.js";

const grid = document.querySelector("#games-grid");
const empty = document.querySelector("#games-empty");
const banner = document.querySelector("#guide-access-banner");
const basePath = location.pathname.includes("/pages/") ? ".." : ".";

const listItems = (items) => items.map((item) => `<li>${item}</li>`).join("");
const badgeList = (items, cls) => items.map((item) => `<span class="${cls}">${item}</span>`).join("");
const resolveCustomRoute = (route) => {
  if (!route) {
    return route;
  }

  if (/^(https?:)?\/\//i.test(route) || route.startsWith("/")) {
    return route;
  }

  return `${basePath}/${route.replace(/^\.\//, "")}`;
};

const guideHref = (id) => {
  const customRoute = CUSTOM_GUIDE_ROUTES[id];
  if (customRoute) {
    return resolveCustomRoute(customRoute);
  }
  return `${basePath}/guide.html?game=${encodeURIComponent(id)}`;
};

const card = (game, access) => {
  const all = game.guideSections || [];
  const canViewFull = access.tier === "pro" || access.tier === "trial";
  const visibleCount = canViewFull ? all.length : Math.max(1, Math.ceil(all.length * 0.5));
  const visibleSections = all.slice(0, visibleCount);
  const lockedPercent = canViewFull ? 100 : 50;

  return `
  <article class="panel game-card">
    <p class="eyebrow">${game.featured ? "Featured" : "Game"}</p>
    <h2>${game.title}</h2>
    <p>${game.description}</p>
    <div class="meta-row">${badgeList(game.genre, "meta-badge")}</div>
    <div class="meta-row">${badgeList(game.platform, "platform-badge")}</div>
    <p><strong>Status:</strong> ${game.releaseWindow}</p>
    <div class="guide-lock-meter">
      <span>Guide Access</span>
      <strong>${lockedPercent}%</strong>
    </div>
    <a class="btn btn-accent" href="${guideHref(game.id)}" ${CUSTOM_GUIDE_ROUTES[game.id] ? 'target="_blank" rel="noopener noreferrer"' : ""}>Open Guide</a>
    <p class="form-note">Quick Guide Snapshot</p>
    <ul class="guide-list">${listItems(visibleSections)}</ul>
    ${
      canViewFull
        ? ""
        : `<p class=\"form-note\">More walkthrough steps unlock after opening the guide and progressing through it.</p>`
    }
  </article>
`;
};

const renderBanner = (access) => {
  if (!banner) {
    return;
  }

  const tierLabel = access.tier === "pro" ? "Pro" : access.tier === "trial" ? "Trial" : "Basic";
  banner.innerHTML = `
    <h2>Guide Access: ${tierLabel}</h2>
    <p>${access.reason}</p>
    <p class="form-note">Basic users can only view the first 50% of each guide.</p>
  `;
};

const init = async () => {
  const access = await getAccessState();
  renderBanner(access);

  if (grid) {
    grid.innerHTML = GAMES.map((game) => card(game, access)).join("");
    if (!GAMES.length && empty) {
      empty.classList.remove("hidden");
    }
  }
};

init();
