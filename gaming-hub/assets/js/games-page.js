import { GAMES } from "./games-data.js";

const grid = document.querySelector("#games-grid");
const empty = document.querySelector("#games-empty");

const card = (game) => `
  <article class="panel game-card">
    <p class="eyebrow">${game.featured ? "Featured" : "Game"}</p>
    <h2>${game.title}</h2>
    <p>${game.description}</p>
    <p><strong>Genre:</strong> ${game.genre.join(", ")}</p>
    <p><strong>Platform:</strong> ${game.platform.join(", ")}</p>
    <p><strong>Status:</strong> ${game.releaseWindow}</p>
  </article>
`;

if (grid) {
  grid.innerHTML = GAMES.map(card).join("");
  if (!GAMES.length && empty) {
    empty.classList.remove("hidden");
  }
}
