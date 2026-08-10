import { trackSiteVisit } from "./traffic-metrics.js";

const HUB_ROOT = "/gaming-hub";
const PAGE_ROOT = `${HUB_ROOT}/pages`;

const navItems = [
  ["home", "Home", `${HUB_ROOT}/index.html`],
  ["games", "Games", `${PAGE_ROOT}/games.html`],
  ["search", "Search", `${PAGE_ROOT}/search.html`],
  ["community", "Community", `${PAGE_ROOT}/community.html`],
  ["help", "Help", `${PAGE_ROOT}/help.html`],
  ["contact", "Contact", `${PAGE_ROOT}/contact.html`],
  ["donations", "Donations", `${PAGE_ROOT}/donations.html`],
  ["subscribe", "Subscribe", `${PAGE_ROOT}/subscribe.html`],
  ["admin", "Admin", `${PAGE_ROOT}/admin.html`],
  ["signin", "Sign In", `${PAGE_ROOT}/signin.html`],
  ["signup", "Sign Up", `${PAGE_ROOT}/signup.html`],
];

const renderHeader = () => {
  const active = document.body.dataset.page || "home";
  // Auth-aware nav
  let user = null;
  try { const s = localStorage.getItem('qag_session'); if (s) user = JSON.parse(s); } catch {}
  const extraItems = user
    ? [['account', user.display_name || 'My Account', `${PAGE_ROOT}/account.html`]]
    : [];
  const allItems = [...navItems, ...extraItems];
  const links = allItems
    .filter(([key]) => {
      if (user) return !['signin','signup'].includes(key);
      return key !== 'admin';
    })
    .map(([key, label, href]) => {
      const isActive = key === active;
      return `<a class="${isActive ? "active" : ""}" href="${href}">${label}</a>`;
    })
    .join("");

  return `
    <header class="topbar">
      <div class="container nav-wrap">
        <a class="brand" href="${HUB_ROOT}/index.html">Quest <span>&amp;</span> Guides</a>
        <button id="mobile-nav-toggle" class="mobile-nav-btn" type="button" aria-label="Toggle navigation">Menu</button>
        <nav id="site-nav" class="site-nav">${links}</nav>
      </div>
      <div class="container search-global">
        <label for="global-search" class="sr-only">Search games</label>
        <input id="global-search" type="search" placeholder="Search games..." />
        <button id="global-search-btn" class="btn btn-accent" type="button">Search</button>
      </div>
    </header>
  `;
};

const renderFooter = () => {
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <section>
          <h3>Quest &amp; Guides</h3>
          <p>Deep 100% completion walkthroughs, trophy roadmaps, and collectible trackers for serious players.</p>
        </section>
        <section>
          <h3>Legal</h3>
          <a href="${PAGE_ROOT}/privacy.html">Privacy</a>
          <a href="${PAGE_ROOT}/terms.html">Terms</a>
        </section>
        <section>
          <h3>More Guides</h3>
          <p>New walkthroughs are added regularly. Check back or create an account to get notified.</p>
        </section>
      </div>
      <div class="container footer-note">
        <small>
          All guides are works in progress. Missing information is reviewed and added as quickly as possible.
        </small>
      </div>
    </footer>
  `;
};

const wireGlobalSearch = () => {
  const input = document.querySelector("#global-search");
  const btn = document.querySelector("#global-search-btn");
  if (!input || !btn) {
    return;
  }

  const goSearch = () => {
    const query = encodeURIComponent(input.value.trim());
    location.href = `${PAGE_ROOT}/search.html${query ? `?q=${query}` : ""}`;
  };

  btn.addEventListener("click", goSearch);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      goSearch();
    }
  });
};

const wireMobileNav = () => {
  const button = document.querySelector("#mobile-nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
};

document.querySelector("#site-header").innerHTML = renderHeader();
document.querySelector("#site-footer").innerHTML = renderFooter();
wireGlobalSearch();
wireMobileNav();
trackSiteVisit();
