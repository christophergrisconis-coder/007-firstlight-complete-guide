const STORAGE_KEY = "rdr2-guide-progress-v1";

const RDR2_BACKGROUND_SET = {
  page: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/reddeadredemption2.jpg",
  hero: "https://cdn.mos.cms.futurecdn.net/Z89HvNTEypo7YhypK88b3U.jpg",
  categories: {
    "Chapter 1 Mission Steps": "https://cdn.mos.cms.futurecdn.net/2vDiAZxqVvWPPTJHqgEk6U.jpg",
    "Chapter 2 Mission Steps": "https://cdn.mos.cms.futurecdn.net/5xHNtCc8Y9zfmGcv9YmHU.jpg",
    "Chapter 3 Mission Steps": "https://cdn.mos.cms.futurecdn.net/34Ymgt24io6VCkXvxSAVRU.jpg",
    "Chapter 4 Mission Steps": "https://cdn.mos.cms.futurecdn.net/3gNtyiojUS4tbxtJKqcxWW.jpg",
  },
};

const createMission = (id, title, objective, complication, finishStep) => ({
  id,
  title,
  steps: [
    `Start mission and lock checkpoint for ${title}.`,
    `Complete the main objective: ${objective}.`,
    `Handle the pressure point: ${complication}.`,
    finishStep || "Reach the final objective marker and complete the mission result scene.",
  ],
});

const missionItemsFromChapter = (chapterId, missions) =>
  missions.flatMap((mission) =>
    mission.steps.map((step, index) => [
      `${chapterId}-${mission.id}-step-${String(index + 1).padStart(2, "0")}`,
      `${mission.title} - Step ${index + 1}`,
      step,
    ])
  );

const STORY_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Chapter 1 Mission Steps",
    missions: [
      createMission("outlaws-from-the-west", "Outlaws from the West", "Ride to Adler Ranch and secure shelter", "Fight through O'Driscoll resistance", "Bring supplies and survivors back to camp."),
      createMission("enter-pursued-by-a-memory", "Enter, Pursued by a Memory", "Track and hunt deer in the snow", "Navigate low visibility and keep pace with Charles", "Deliver food to camp and complete the lesson."),
      createMission("old-friends", "Old Friends", "Scout the O'Driscoll camp with the gang", "Hold position and win the firefight", "Loot the camp and return to Dutch."),
      createMission("aftermath-of-genesis", "The Aftermath of Genesis", "Hunt and skin game to restock provisions", "Land clean kills while learning bow usage", "Return meat and pelts to Pearson."),
      createMission("leviticus-cornwall", "Who the Hell is Leviticus Cornwall?", "Board and rob the Cornwall train", "Survive armed guards and lawmen pursuit", "Escape by rail bridge route and regroup."),
      createMission("eastward-bound", "Eastward Bound", "Break camp and travel to Horseshoe Overlook", "Manage convoy during transit", "Set up new camp and trigger chapter transition."),
    ],
  },
  {
    id: "chapter-2",
    title: "Chapter 2 Mission Steps",
    missions: [
      createMission("polite-society", "Polite Society, Valentine Style", "Escort the women safely into Valentine", "Defuse trouble in town", "Return everyone safely to camp."),
      createMission("americans-at-rest", "Americans at Rest", "Join Javier and Charles in the saloon", "Win the brawl and remove threats", "Return from Valentine after the fight."),
      createMission("exit-pursued", "Exit Pursued by a Bruised Ego", "Track and tame the black Shire", "Hunt the legendary bear with Hosea", "Return after deciding whether to pursue or withdraw."),
      createMission("not-without-sin", "Who Is Not without Sin", "Find Reverend Swanson near Flatneck Station", "Win or disrupt the card-table conflict", "Rescue Swanson and return him to camp."),
      createMission("money-lending-1", "Money Lending and Other Sins I", "Collect first debt as instructed by Strauss", "Handle debtor resistance without failing objective", "Report collection results to Strauss."),
      createMission("money-lending-2", "Money Lending and Other Sins II", "Track second debt target", "Force repayment or collect valuables", "Log outcome in camp ledger progress."),
      createMission("money-lending-3", "Money Lending and Other Sins III", "Close third debt task", "Survive hostility during collection", "Return to camp and update debt chain."),
      createMission("we-loved-once-1", "We Loved Once and True I", "Meet Mary in Valentine", "Accept and plan her request", "Travel to mission follow-up location."),
      createMission("we-loved-once-2", "We Loved Once and True II", "Locate Jamie and begin escort", "Prevent escalation while disarming conflict", "Return Jamie safely and resolve scene."),
      createMission("we-loved-once-3", "We Loved Once and True III", "Conclude the Mary follow-up meeting", "Choose response path in dialogue", "Finish the questline segment."),
      createMission("good-honest-snake-oil", "Good, Honest, Snake Oil", "Track down the target near town", "Use lasso and secure the prisoner", "Deliver target to sheriff alive."),
      createMission("paying-social-call", "Paying a Social Call", "Ride to Kieran's target location", "Clear O'Driscoll hideout in combat", "Search site and retreat to safety."),
      createMission("quiet-time", "A Quiet Time", "Follow Lenny through Valentine", "Complete saloon interactions without mission fail", "Regroup after the law response."),
      createMission("blessed-are-the-meek", "Blessed are the Meek?", "Infiltrate Strawberry jail area", "Free Micah and survive town gunfight", "Escape the region and lie low."),
      createMission("spines-of-america", "The Spines of America", "Travel with Hosea to Carmody Dell", "Steal stagecoach and avoid witness spread", "Deliver coach to fence for payout."),
      createMission("pouring-forth-oil-1", "Pouring Forth Oil I", "Scout train opportunity with John", "Steal required wagon resource", "Move mission prep to camp."),
      createMission("pouring-forth-oil-2", "Pouring Forth Oil II", "Acquire second wagon task", "Evade law while transporting target", "Store mission resources successfully."),
      createMission("pouring-forth-oil-3", "Pouring Forth Oil III", "Set train robbery approach point", "Plant and time robbery start", "Hold through gunfight phase."),
      createMission("pouring-forth-oil-4", "Pouring Forth Oil IV", "Board and secure train sections", "Loot valuables and neutralize resistance", "Escape pursuit and regroup with gang."),
      createMission("fisher-of-men", "A Fisher of Men", "Take Jack fishing at Dakota River", "Respond to Pinkerton encounter dialogue", "Return Jack to camp safely."),
      createMission("american-pastoral", "An American Pastoral Scene", "Join Micah for stagecoach hold-up", "Control chase and eliminate pursuers", "Cash out and complete mission route."),
      createMission("sheep-and-goats", "The Sheep and the Goats", "Herd sheep to Valentine auction", "Survive Cornwall confrontation and town fight", "Retreat with gang after shootout."),
      createMission("strange-kindness", "A Strange Kindness", "Prepare gang movement after Cornwall heat", "Ride with Dutch and monitor pursuit", "Reach new camp and end chapter."),
    ],
  },
  {
    id: "chapter-3",
    title: "Chapter 3 Mission Steps",
    missions: [
      createMission("new-south", "The New South", "Ride patrol through Rhodes region", "Handle escaped prisoner events", "Return to camp with intel."),
      createMission("female-suffrage", "Further Questions of Female Suffrage", "Assist in distributing movement flyers", "Handle hostile reactions without failure", "Complete town route and leave cleanly."),
      createMission("american-distillation", "American Distillation", "Raid moonshine operation with Dutch", "Destroy stills and defeat raiders", "Escape before law pressure peaks."),
      createMission("honest-mistake", "An Honest Mistake", "Track coach robbery setup", "Survive ambush and secure cover", "Retreat to gang after losses."),
      createMission("horse-flesh", "Horse Flesh for Dinner", "Steal Braithwaite horses", "Deliver horses to buyers quietly", "Complete sale and return."),
      createMission("fine-joys", "The Fine Joys of Tobacco", "Burn Gray tobacco fields and wagons", "Keep group alive through crossfire", "Escape on route out of estate."),
      createMission("magicians", "Magicians for Sport", "Travel to rescue Trelawny", "Clear captors and free hostage", "Return after extraction."),
      createMission("friends-low-places", "Friends in Very Low Places", "Meet Trelawny in Rhodes", "Run carriage con setup", "Close mission after social infiltration."),
      createMission("sodom", "Sodom? Back to Gomorrah", "Rob Valentine bank with gang", "Control civilians and crack safe", "Fight escape route to camp."),
      createMission("advertising-1", "Advertising, the New American Art I", "Prepare moonshine wagon job", "Drive under pressure and avoid failure", "Deliver cargo to target."),
      createMission("advertising-2", "Advertising, the New American Art II", "Follow-up sales route with wagon", "Survive counterattack and complete drop", "Return to mission giver."),
      createMission("preaching", "Preaching Forgiveness as He Went", "Attack enemy stronghold with gang", "Advance through fortified positions", "Regroup after the battle."),
      createMission("blood-feuds", "Blood Feuds, Ancient and Modern", "Assault Braithwaite Manor", "Clear resistance and search estate", "Recover Jack lead and retreat."),
      createMission("battle-of-shady-belle", "The Battle of Shady Belle", "Take Shady Belle for new camp", "Eliminate Lemoyne Raider defense", "Secure camp perimeter and settle in."),
    ],
  },
  {
    id: "chapter-4",
    title: "Chapter 4 Mission Steps",
    missions: [
      createMission("joys-of-civilization", "The Joys of Civilization", "Enter Saint Denis with Dutch and crew", "Track city leads while avoiding heat", "Return with intelligence update."),
      createMission("angelo-bronte", "Angelo Bronte, a Man of Honor", "Meet Bronte at his mansion", "Follow his assignment in the city", "Complete objective and return to Dutch."),
      createMission("no-no-thrice", "No, No and Thrice, No", "Rescue Tilly from abductors", "Chase and neutralize captors", "Ensure Tilly is safe at camp."),
      createMission("gilded-cage", "The Gilded Cage", "Attend mayor's party with Dutch", "Collect key social and political leads", "Exit without blowing gang cover."),
      createMission("fine-night", "A Fine Night of Debauchery", "Board riverboat and work the con", "Win control of high-stakes table pressure", "Escape once operation turns violent."),
      createMission("american-fathers-1", "American Fathers I", "Aid Eagle Flies contact sequence", "Manage negotiation and movement objectives", "Return after completing support objective."),
      createMission("american-fathers-2", "American Fathers II", "Continue conflict support objectives", "Handle combat and tactical push", "Conclude operation with allies."),
      createMission("horsemen-apocalypses", "Horsemen, Apocalypses", "Defend Saint Denis streets in retreat", "Escort gang through heavy pursuit", "Reach extraction point and regroup."),
      createMission("urban-pleasures", "Urban Pleasures", "Execute city trolley robbery plan", "Survive derailment and firefight", "Escape law pressure with gang."),
      createMission("country-pursuits", "Country Pursuits", "Pursue Bronte lead through bayou", "Use boat and foot pursuit phases", "Capture target and exit swamp."),
      createMission("revenge-dish", "Revenge is a Dish Best Eaten", "Assault Bronte estate", "Secure mansion and extract Bronte", "Finish mission after confrontation."),
      createMission("banking-old-art", "Banking, the Old American Art", "Rob Saint Denis bank with full crew", "Hold off law and Pinkerton response", "Attempt escape and survive chapter fallout."),
    ],
  },
  {
    id: "chapter-5",
    title: "Chapter 5 Mission Steps",
    missions: [
      createMission("welcome-new-world", "Welcome to the New World", "Regroup after Guarma shipwreck", "Reach safe position with survivors", "Stabilize and establish temporary camp."),
      createMission("savagery-unleashed", "Savagery Unleashed", "Rescue Javier from captivity", "Fight through guards and free prisoner", "Retreat to hidden position."),
      createMission("kind-benevolent-despot", "A Kind and Benevolent Despot", "Support local rebel strike", "Sabotage enemy objectives in combat", "Return to allies after success."),
      createMission("hell-hath-no-fury", "Hell Hath No Fury", "Defend shoreline against warship attack", "Operate artillery and repel assault", "Regroup after battle."),
      createMission("paradise-departed", "Paradise Mercifully Departed", "Push final Guarma objective", "Escape hostile forces during withdrawal", "Board return route to mainland."),
    ],
  },
  {
    id: "chapter-6",
    title: "Chapter 6 Mission Steps",
    missions: [
      createMission("dear-uncle-tacitus", "Dear Uncle Tacitus", "Locate gang at new hideout", "Ride through hostile territory safely", "Reconnect with camp and trigger chapter setup."),
      createMission("fleeting-joy", "Fleeting Joy", "Defend Lakay from Pinkerton assault", "Hold lines with gang under heavy fire", "Evacuate with survivors."),
      createMission("murfree-country", "That's Murfree Country", "Escort survivors through Murfree ambush territory", "Repel attacks and keep wagon alive", "Reach camp safely."),
      createMission("icarus-and-friends", "Icarus and Friends", "Launch hot air balloon recon", "Track prison route from the air", "Land and report findings."),
      createMission("visiting-hours", "Visiting Hours", "Infiltrate Sisika Penitentiary approach", "Rescue John under heavy resistance", "Extract team and escape waterways."),
      createMission("social-call", "Just a Social Call", "Raid enemy hideout with Sadie", "Clear the compound and recover lead", "Return after mission cleanup."),
      createMission("rage-unleashed", "A Rage Unleashed", "Support Rains Fall and Eagle Flies route", "Destroy military assets under fire", "Withdraw after operation."),
      createMission("delights-van-horn", "The Delights of Van Horn", "Confront gang traitor at Van Horn", "Chase and secure target", "Complete handoff and report to camp."),
      createMission("goodbye-dear-friend", "Goodbye, Dear Friend", "Assist Sadie in prisoner transfer", "Fight through interruption ambush", "Ensure Sadie survives and mission resolves."),
      createMission("favored-sons", "Favored Sons", "Aid Wapiti defense at mountain pass", "Hold ridge line and repel soldiers", "Retreat with allies after casualties."),
      createMission("kings-son", "The King's Son", "Rescue Eagle Flies from Fort Wallace", "Stealth entry or forced combat completion", "Escape fort and deliver Eagle Flies."),
      createMission("my-last-boy", "My Last Boy", "Follow Dutch into assault operation", "Survive collapse of mission plan", "Retreat and regroup after losses."),
      createMission("our-best-selves", "Our Best Selves", "Prepare and execute final train robbery", "Push through Pinkerton response", "Reach temporary safety point."),
      createMission("red-dead-redemption", "Red Dead Redemption", "Return for final camp confrontation", "Protect allies and survive last stand", "Complete Arthur's ending path."),
    ],
  },
  {
    id: "epilogue-1",
    title: "Epilogue Part I Mission Steps",
    missions: [
      createMission("wheel", "The Wheel", "Travel to Pronghorn Ranch", "Take first ranch labor objective", "Complete shift and settle in."),
      createMission("simple-pleasures", "Simple Pleasures", "Work ranch chores and delivery run", "Respond to local trouble", "Return to ranch safely."),
      createMission("farming-beginners", "Farming, for Beginners", "Learn and complete daily ranch tasks", "Handle disruption from hired men", "Close shift with ranch owner."),
      createMission("fatherhood-beginners", "Fatherhood, for Beginners", "Ride with Jack for a hunting outing", "Protect him during wolf attack", "Return Jack home safely."),
      createMission("old-habits", "Old Habits", "Recover bounty lead with old contacts", "Track and capture target", "Turn in bounty and collect payout."),
      createMission("jim-milton-rides", "Jim Milton Rides, Again?", "Join Sadie for bounty operation", "Clear enemies and secure target", "Deliver target to jail."),
      createMission("motherhood", "Motherhood", "Reunite family and move to Beecher's Hope", "Handle transition objectives", "Complete relocation sequence."),
      createMission("gainful-employment", "Gainful Employment", "Take ranch and supply work", "Finish task chain without failure", "Return home and conclude mission."),
      createMission("tool-box", "The Tool Box", "Meet Uncle and Charles for house build prep", "Acquire lumber and supplies", "Deliver materials to construction site."),
    ],
  },
  {
    id: "epilogue-2",
    title: "Epilogue Part II Mission Steps",
    missions: [
      createMission("new-jerusalem", "A New Jerusalem", "Work with crew to build the house frame", "Complete hammering and construction beats", "Finish build milestone scene."),
      createMission("honest-days-labors", "An Honest Day's Labors", "Ride with Sadie on bounty lead", "Capture or eliminate target gang", "Return and close bounty payout."),
      createMission("landowning-classes", "The Landowning Classes", "Confront Geddes ranch conflict", "Win the gunfight and secure property", "Return to settle aftermath."),
      createMission("uncle-bad-day", "Uncle's Bad Day", "Track Uncle after kidnapping", "Raid hideout and rescue him", "Bring Uncle back to Beecher's Hope."),
      createMission("home-improvement", "Home Improvement for Beginners", "Arrange home financing and legal paperwork", "Complete commerce and meeting beats", "Finalize ownership milestone."),
      createMission("american-venom", "American Venom", "Join Sadie and Charles to hunt Micah", "Fight through mountain defenses", "Finish final confrontation and ending."),
    ],
  },
];

const CATEGORIES = STORY_CHAPTERS.map((chapter) => ({
  title: chapter.title,
  items: missionItemsFromChapter(chapter.id, chapter.missions),
}));

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
