const getBasePath = () => (location.pathname.includes("/pages/") ? ".." : ".");

const navItems = [
  ["Home", "index.html"],
  ["Games", "pages/games.html"],
  ["Search", "pages/search.html"],
  ["Help", "pages/help.html"],
  ["Contact", "pages/contact.html"],
  ["Donations", "pages/donations.html"],
  ["Subscribe", "pages/subscribe.html"],
  ["Sign In", "pages/signin.html"],
  ["Sign Up", "pages/signup.html"],
];

const renderHeader = () => {
  const base = getBasePath();
  const active = document.body.dataset.page || "home";
  const links = navItems
    .map(([label, path]) => {
      const isActive = path.includes(active) || (active === "home" && path === "index.html");
      return `<a class="${isActive ? "active" : ""}" href="${base}/${path}">${label}</a>`;
    })
    .join("");

  return `
    <header class="topbar">
      <div class="container nav-wrap">
        <a class="brand" href="${base}/index.html">Arcadia Grid</a>
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
  const base = getBasePath();
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <section>
          <h3>Arcadia Grid</h3>
          <p>Premium gaming hub focused on discoverability, updates, and community growth.</p>
        </section>
        <section>
          <h3>Legal</h3>
          <a href="${base}/pages/privacy.html">Privacy</a>
          <a href="${base}/pages/terms.html">Terms</a>
        </section>
        <section>
          <h3>Owner Notes</h3>
          <p>Admin and owner details intentionally kept lightweight for a content-first gaming platform.</p>
        </section>
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
    const base = getBasePath();
    location.href = `${base}/pages/search.html${query ? `?q=${query}` : ""}`;
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
