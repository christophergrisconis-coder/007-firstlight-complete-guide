import { GAMES } from "./games-data.js";
import { getAccessState } from "./access.js";

const grid = document.querySelector("#games-grid");
const empty = document.querySelector("#games-empty");
const banner = document.querySelector("#guide-access-banner");

const listItems = (items) => items.map((item) => `<li>${item}</li>`).join("");

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
    <p><strong>Genre:</strong> ${game.genre.join(", ")}</p>
    <p><strong>Platform:</strong> ${game.platform.join(", ")}</p>
    <p><strong>Status:</strong> ${game.releaseWindow}</p>
    <div class="guide-lock-meter">
      <span>Guide Access</span>
      <strong>${lockedPercent}%</strong>
    </div>
    <ul class="guide-list">${listItems(visibleSections)}</ul>
    ${
      canViewFull
        ? ""
        : `<p class=\"form-note\">Remaining guide sections are locked for Pro members. Start a free 3-day trial, then continue at $1.99/month.</p><a class=\"btn btn-accent\" href=\"./subscribe.html\">Unlock Full Guide</a>`
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
