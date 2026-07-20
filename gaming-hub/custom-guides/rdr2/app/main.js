const STORAGE_KEY = "rdr2-guide-progress-v1";

const RDR2_BACKGROUND_SET = {
  page: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/reddeadredemption2.jpg",
  hero: "https://cdn.mos.cms.futurecdn.net/Z89HvNTEypo7YhypK88b3U.jpg",
  categories: {
    "Story and Epilogue": "https://cdn.mos.cms.futurecdn.net/2vDiAZxqVvWPPTJHqgEk6U.jpg",
    "Challenges (90 Ranks)": "https://cdn.mos.cms.futurecdn.net/34Ymgt24io6VCkXvxSAVRU.jpg",
    "Collectibles and Discoveries": "https://cdn.mos.cms.futurecdn.net/3gNtyiojUS4tbxtJKqcxWW.jpg",
    "Missions and Events (100%)": "https://cdn.mos.cms.futurecdn.net/5xHNtCc8Y9zfmGcv9YmHU.jpg",
  },
};

const makeSeries = (prefix, titlePrefix, descriptionPrefix, count) =>
  Array.from({ length: count }, (_, index) => {
    const value = index + 1;
    return [
      `${prefix}-${String(value).padStart(2, "0")}`,
      `${titlePrefix} ${value}`,
      `${descriptionPrefix} ${value} of ${count}.`,
    ];
  });

const challengeTracks = [
  "Bandit",
  "Explorer",
  "Gambler",
  "Herbalist",
  "Horseman",
  "Master Hunter",
  "Sharpshooter",
  "Survivalist",
  "Weapons Expert",
];

const challengeItems = challengeTracks.flatMap((track) =>
  makeSeries(
    `challenge-${track.toLowerCase().replace(/\s+/g, "-")}`,
    `${track} Rank`,
    `Complete ${track} challenge rank`,
    10
  )
);

const chanceEncounterItems = makeSeries(
  "chance-encounter",
  "Chance Encounter",
  "Resolve tracked chance encounter",
  25
);

const huntingRequestItems = makeSeries(
  "hunting-request",
  "Hunting Request",
  "Complete hunting request board step",
  5
);

const CATEGORIES = [
  {
    title: "Story and Epilogue",
    items: [
      ["chapter-1-colter", "Chapter 1 - Colter", "Complete all Chapter 1 story missions."],
      ["chapter-2-horseshoe", "Chapter 2 - Horseshoe Overlook", "Complete all Chapter 2 story missions."],
      ["chapter-3-clemens", "Chapter 3 - Clemens Point", "Complete all Chapter 3 story missions."],
      ["chapter-4-saint-denis", "Chapter 4 - Saint Denis", "Complete all Chapter 4 story missions."],
      ["chapter-5-guarma", "Chapter 5 - Guarma", "Complete all Chapter 5 story missions."],
      ["chapter-6-beaver-hollow", "Chapter 6 - Beaver Hollow", "Complete all Chapter 6 story missions."],
      ["epilogue-pronghorn", "Epilogue Part I", "Complete all Epilogue Part I missions."],
      ["epilogue-beechers-hope", "Epilogue Part II", "Complete all Epilogue Part II missions."],
    ],
  },
  {
    title: "Missions and Events (100%)",
    items: [
      ["stranger-a-test-of-faith", "Stranger Strand - A Test of Faith", "Finish the dinosaur bones stranger strand."],
      ["stranger-all-that-glitters", "Stranger Strand - All That Glitters", "Finish the treasure hunter stranger strand."],
      ["stranger-the-smell-of-grease-paint", "Stranger Strand - The Smell of the Grease Paint", "Finish the theater stranger strand."],
      ["stranger-a-fisher-of-fish", "Stranger Strand - A Fisher of Fish", "Finish the legendary fish stranger strand."],
      ["stranger-geology-for-beginners", "Stranger Strand - Geology for Beginners", "Finish the rock carvings stranger strand."],
      ["stranger-arcadia-for-amateurs", "Stranger Strand - Arcadia for Amateurs", "Finish Albert Mason's stranger strand."],
      ["stranger-the-ties-that-bind-us", "Stranger Strand - The Ties That Bind Us", "Finish the escaped prisoners stranger strand."],
      ["stranger-fundraiser", "Stranger Strand - Fundraiser", "Finish the Saint Denis charity stranger strand."],
      ["stranger-of-men-and-angels", "Stranger Strand - Of Men and Angels", "Finish the nun charity stranger strand."],
      ["stranger-duchesses", "Stranger Strand - Duchesses and Other Animals", "Finish Algernon Wasp's exotic requests."],
      ["bounty-new-hanover", "Bounty Set - New Hanover", "Complete New Hanover bounty targets."],
      ["bounty-lemoyne", "Bounty Set - Lemoyne", "Complete Lemoyne bounty targets."],
      ["bounty-west-elizabeth", "Bounty Set - West Elizabeth", "Complete West Elizabeth bounty targets."],
      ["bounty-ambarino", "Bounty Set - Ambarino", "Complete Ambarino bounty targets."],
      ["bounty-tumbleweed", "Bounty Set - Tumbleweed", "Complete New Austin bounty targets."],
      ...chanceEncounterItems,
      ["gang-hideout-hanging-dog", "Gang Hideout - Hanging Dog Ranch", "Clear the O'Driscoll hideout."],
      ["gang-hideout-shady-belle", "Gang Hideout - Shady Belle", "Clear the Lemoyne Raiders hideout."],
      ["gang-hideout-beaver-hollow", "Gang Hideout - Beaver Hollow", "Clear the Murfree Brood hideout."],
      ["gang-hideout-six-point", "Gang Hideout - Six Point Cabin", "Clear Six Point Cabin."],
      ["gang-hideout-thieves-landing", "Gang Hideout - Thieves' Landing", "Clear Thieves' Landing in New Austin."],
      ["gang-hideout-fort-mercer", "Gang Hideout - Fort Mercer", "Clear Fort Mercer in New Austin."],
      ...huntingRequestItems,
    ],
  },
  {
    title: "Challenges (90 Ranks)",
    items: challengeItems,
  },
  {
    title: "Compendium and Progression",
    items: [
      ["player-level-50", "Player Level 50", "Reach player level 50."],
      ["full-health", "Core Upgrade - Health", "Reach maximum Health level."],
      ["full-stamina", "Core Upgrade - Stamina", "Reach maximum Stamina level."],
      ["full-dead-eye", "Core Upgrade - Dead Eye", "Reach maximum Dead Eye level."],
      ["horse-bonding-4", "Horse Bonding Level 4", "Reach bonding level 4 with one horse."],
      ["compendium-animals", "Compendium - Animals", "Reach required 100% compendium progress for animals."],
      ["compendium-equipment", "Compendium - Equipment", "Reach required 100% compendium progress for equipment."],
      ["compendium-fish", "Compendium - Fish", "Reach required 100% compendium progress for fish."],
      ["compendium-gangs", "Compendium - Gangs", "Reach required 100% compendium progress for gangs."],
      ["compendium-horses", "Compendium - Horses", "Reach required 100% compendium progress for horses."],
      ["compendium-plants", "Compendium - Plants", "Reach required 100% compendium progress for plants."],
      ["compendium-weapons", "Compendium - Weapons", "Reach required 100% compendium progress for weapons."],
    ],
  },
  {
    title: "Collectibles and Discoveries",
    items: [
      ...makeSeries("cigarette-card-set", "Cigarette Card Set", "Complete cigarette card set", 12),
      ...makeSeries("dinosaur-bone", "Dinosaur Bone", "Discover dinosaur bone location", 30),
      ...makeSeries("dreamcatcher", "Dreamcatcher", "Inspect dreamcatcher location", 20),
      ...makeSeries("rock-carving", "Rock Carving", "Inspect rock carving location", 10),
      ["points-of-interest", "Point of Interest", "Discover at least one point of interest."],
      ...makeSeries("shack-visit", "Shack Visit", "Visit unique shack location", 5),
      ...makeSeries("legendary-animal", "Legendary Animal", "Hunt required legendary animal", 5),
      ...makeSeries("legendary-fish", "Legendary Fish", "Catch required legendary fish", 13),
      ["table-game-poker", "Table Game - Poker", "Play Poker."],
      ["table-game-blackjack", "Table Game - Blackjack", "Play Blackjack."],
      ["table-game-dominoes", "Table Game - Dominoes", "Play Dominoes."],
      ["table-game-five-finger", "Table Game - Five Finger Fillet", "Play Five Finger Fillet."],
      ["treasure-hunt-progress", "Treasure Hunt Progress", "Complete at least one full treasure hunt chain."],
      ["exotics-requests", "Exotics Requests", "Complete all requested orchid/plume hand-ins."],
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

const applyGuideBackgrounds = () => {
  document.documentElement.style.setProperty("--rdr-guide-bg", `url('${RDR2_BACKGROUND_SET.page}')`);
  document.documentElement.style.setProperty("--rdr-hero-bg", `url('${RDR2_BACKGROUND_SET.hero}')`);
};

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
    const categoryBg = RDR2_BACKGROUND_SET.categories[category.title];
    if (categoryBg) {
      card.style.backgroundImage =
        `linear-gradient(135deg, rgba(14, 9, 6, 0.9), rgba(31, 19, 13, 0.8)), url('${categoryBg}')`;
    }

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

applyGuideBackgrounds();

searchInput.addEventListener("input", render);
resetBtn.addEventListener("click", () => {
  for (const [id] of allItems()) {
    delete state[id];
  }
  save();
  render();
});

render();
