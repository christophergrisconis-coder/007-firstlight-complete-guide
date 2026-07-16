const STORAGE_KEY = "rdr2-guide-progress-v1";

const CATEGORIES = [
  {
    title: "Main Story",
    items: [
      ["prologue", "Prologue", "Escape Colter and establish camp."],
      ["chapter-2", "Chapter 2", "Stabilize Horseshoe Overlook and unlock camp systems."],
      ["chapter-3", "Chapter 3", "Lemoyne conflicts and escalating gang pressure."],
      ["chapter-4", "Chapter 4", "Saint Denis story beats and high-risk missions."],
      ["chapter-5-6", "Chapter 5-6", "Guarma return, Beaver Hollow, and endgame setup."],
      ["epilogue", "Epilogue", "Complete both epilogue parts and final mission."],
    ],
  },
  {
    title: "Challenges",
    items: [
      ["bandit", "Bandit", "Finish all 10 Bandit ranks."],
      ["explorer", "Explorer", "Complete treasure hunts and Explorer ranks."],
      ["herbalist", "Herbalist", "Collect all required plants for Herbalist challenges."],
      ["master-hunter", "Master Hunter", "Complete predator and perfect pelt objectives."],
      ["sharpshooter", "Sharpshooter", "Finish weapon precision challenges."],
    ],
  },
  {
    title: "Collectibles",
    items: [
      ["dinosaur-bones", "Dinosaur Bones", "Find all bone locations."],
      ["dreamcatchers", "Dreamcatchers", "Collect every dreamcatcher tree marker."],
      ["rock-carvings", "Rock Carvings", "Document all carving points."],
      ["cigarette-cards", "Cigarette Cards", "Complete all card sets."],
      ["exotics", "Duchesses and Other Animals", "Finish Algernon Wasp requests."],
    ],
  },
  {
    title: "100% Checklist",
    items: [
      ["stranger-missions", "Stranger Missions", "Finish enough stranger questlines for 100%."],
      ["legendary-animals", "Legendary Animals", "Hunt and skin all legendary animals."],
      ["legendary-fish", "Legendary Fish", "Catch all legendary fish."],
      ["gang-hideouts", "Gang Hideouts", "Clear all required hideouts."],
      ["table-games", "Table Games", "Play all required gambling activities."],
      ["compendium", "Compendium", "Reach the needed compendium completion thresholds."],
    ],
  },
];

const grid = document.getElementById("category-grid");
const searchInput = document.getElementById("search");
const resetBtn = document.getElementById("reset-progress");
const completedEl = document.getElementById("completed-count");
const totalEl = document.getElementById("total-count");
const percentEl = document.getElementById("progress-percent");

const state = load();

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function allItems() {
  return CATEGORIES.flatMap((c) => c.items);
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  grid.innerHTML = "";

  for (const category of CATEGORIES) {
    const filtered = category.items.filter(([, label, desc]) => {
      const text = `${label} ${desc}`.toLowerCase();
      return query ? text.includes(query) : true;
    });

    if (!filtered.length) continue;

    const card = document.createElement("article");
    card.className = "card";

    const heading = document.createElement("h2");
    heading.textContent = category.title;

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "items";

    for (const [id, label, desc] of filtered) {
      const row = document.createElement("label");
      row.className = `item ${state[id] ? "done" : ""}`;

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!state[id];
      cb.addEventListener("change", () => {
        state[id] = cb.checked;
        save();
        render();
      });

      const text = document.createElement("div");
      text.innerHTML = `<b>${label}</b><small>${desc}</small>`;

      row.append(cb, text);
      itemsWrap.appendChild(row);
    }

    card.append(heading, itemsWrap);
    grid.appendChild(card);
  }

  const items = allItems();
  const completed = items.filter(([id]) => state[id]).length;
  const total = items.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  completedEl.textContent = String(completed);
  totalEl.textContent = String(total);
  percentEl.textContent = `${pct}%`;
}

searchInput.addEventListener("input", render);
resetBtn.addEventListener("click", () => {
  for (const [id] of allItems()) {
    delete state[id];
  }
  save();
  render();
});

render();
