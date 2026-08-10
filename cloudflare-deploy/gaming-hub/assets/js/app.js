import { trackSiteVisit } from "./traffic-metrics.js";

const HUB_ROOT = "/gaming-hub";
const PAGE_ROOT = `${HUB_ROOT}/pages`;

const navItems = [
  ["home", "Home", `${HUB_ROOT}/index.html`],
  ["games", "Games", `${PAGE_ROOT}/games.html`],
  ["coming-soon", "Coming Soon", `${PAGE_ROOT}/coming-soon.html`],
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

const initWelcomeModal = () => {
  // Check if user is signed in
  const user = localStorage.getItem('qag_user') || localStorage.getItem('qag_token');
  const dismissed = sessionStorage.getItem('qag_welcome_dismissed');

  // Skip modal on signin/signup pages or if already signed in / dismissed
  const isAuthPage = window.location.pathname.includes('signin.html') || window.location.pathname.includes('signup.html');
  if (user || dismissed || isAuthPage) return;

  const modalHtml = `
    <div id="qag-auth-modal" class="auth-modal-overlay">
      <div class="auth-modal-content">
        <button id="qag-modal-close" class="auth-modal-close" type="button" aria-label="Close">&times;</button>
        <h2 class="auth-modal-title">Welcome to Quest &amp; Guides</h2>
        <p class="auth-modal-sub">
          Create a free account or sign in to enable <strong>Active Progress Tracking</strong>, sync 100% checklists across devices, and unlock Platinum trophy roadmaps.
        </p>

        <div class="auth-btn-stack">
          <a href="${PAGE_ROOT}/signup.html?provider=google" class="auth-provider-btn btn-google">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29c-.8 1.6-1.29 3.39-1.29 5.42s.49 3.82 1.29 5.42l3.99-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
            Continue with Google Account
          </a>

          <a href="${PAGE_ROOT}/signup.html?provider=apple" class="auth-provider-btn btn-apple">
            <svg width="18" height="18" viewBox="0 0 170 170" fill="currentColor"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.13-9.62-1.92-14.42-6.14-3.21-2.74-7.05-7.38-11.53-13.91-6.62-9.54-11.82-20.2-15.6-32.01-3.78-11.8-5.67-22.95-5.67-33.45 0-14.28 3.59-26 10.77-35.15 7.18-9.15 16.27-13.82 27.27-14.02 4.48 0 9.49 1.16 15.02 3.49 5.53 2.33 9.4 3.5 11.62 3.5 1.95 0 5.92-1.22 11.92-3.66 6.01-2.44 11.08-3.56 15.22-3.35 12.06.57 21.6 4.96 28.62 13.16-10.73 6.47-15.96 15.54-15.68 27.21.32 9.27 4.04 17.06 11.16 23.36 7.12 6.3 15.55 9.77 25.28 10.42-2.3 6.84-5.32 14.16-9.06 21.96zM119.22 31.08c0-7.09 2.56-13.84 7.69-20.26 5.13-6.42 11.75-10.38 19.86-11.89.28 1.48.42 2.87.42 4.18 0 7.23-2.61 14.15-7.83 20.76-5.22 6.61-11.79 10.63-19.72 12.06-.14-1.27-.42-3.23-.42-4.85z"/></svg>
            Continue with Apple ID / iCloud
          </a>

          <a href="${PAGE_ROOT}/signup.html" class="auth-provider-btn" style="background: var(--accent); border-color: var(--accent);">
            Create Account with Email
          </a>
        </div>

        <div style="margin-top: 16px; text-align: center;">
          <a href="${PAGE_ROOT}/signin.html" style="color: var(--gold); font-size: 0.9rem; text-decoration: underline;">Already have an account? Sign In</a>
        </div>

        <div class="auth-modal-guest">
          <button id="qag-modal-guest" type="button">Continue as Guest (Save Progress Locally)</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const closeModal = () => {
    const modal = document.getElementById('qag-auth-modal');
    if (modal) modal.remove();
    sessionStorage.setItem('qag_welcome_dismissed', 'true');
  };

  document.getElementById('qag-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('qag-modal-guest')?.addEventListener('click', closeModal);
};

document.querySelector("#site-header").innerHTML = renderHeader();
document.querySelector("#site-footer").innerHTML = renderFooter();
wireGlobalSearch();
wireMobileNav();
trackSiteVisit();
initWelcomeModal();
