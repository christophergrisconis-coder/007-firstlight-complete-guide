import { GAMES } from "./games-data.js";

const input = document.querySelector("#search-input");
const loading = document.querySelector("#search-loading");
const empty = document.querySelector("#search-empty");
const results = document.querySelector("#search-results");

const toCard = (game) => `
  <article class="panel game-card">
    <h2>${game.title}</h2>
    <p>${game.description}</p>
    <p><strong>Genre:</strong> ${game.genre.join(", ")}</p>
    <p><strong>Platform:</strong> ${game.platform.join(", ")}</p>
  </article>
`;

const searchGames = (value) => {
  const q = value.trim().toLowerCase();
  if (!q) {
    return [];
  }

  return GAMES.filter((game) => {
    const haystack = [game.title, game.description, ...game.genre, ...game.platform].join(" ").toLowerCase();
    return haystack.includes(q);
  });
};

const render = (list) => {
  if (!results || !empty) {
    return;
  }

  if (!list.length) {
    results.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  results.innerHTML = list.map(toCard).join("");
};

const runSearch = (value) => {
  if (!loading) {
    return;
  }

  loading.classList.remove("hidden");
  setTimeout(() => {
    const found = searchGames(value);
    loading.classList.add("hidden");
    render(found);
  }, 120);
};

const params = new URLSearchParams(location.search);
const initial = params.get("q") || "";
if (input) {
  input.value = initial;
  input.addEventListener("input", () => runSearch(input.value));
}

runSearch(initial);
