export const GAME = {
  title: "007 First Light",
  subtitle: "100% Completion Companion",
  missionTotal: 18,
  collectibleTotals: {
    "Playing Cards": 36,
    "Intel / MI6 Files": 23,
    Mementos: 14,
    Postcards: 10,
    "Legacy Items": 9,
  },
  completionRules: [
    "Collectibles save immediately when picked up.",
    "Chapter Select and Checkpoint Select support replay cleanup after completion.",
    "No collectible is treated as permanently missable in tracker logic.",
  ],
};

export const MISSIONS = [
  "Against The Odds",
  "In His Majesty's Secret Service",
  "The Needle's Eye",
  "The Heart of the Matter",
  "A New Home",
  "A Night Out",
  "A Matter of Considerable Delicacy",
  "All the Time in the World",
  "Out of the Ashes",
  "The Past Never Dies",
  "Beyond the Grave",
  "Uninvited",
  "Knightfall",
  "Going Old School",
  "Time to Die",
  "Man of the Hour",
  "Wave of the Future",
  "For England",
].map((name, index) => {
  const id = `m${String(index + 1).padStart(2, "0")}`;
  return {
    id,
    order: index + 1,
    name,
    isStructuralSlot: false,
    walkthrough: [
      {
        id: `${id}-w1`,
        label: "Recon and entry route",
        detail: "Placeholder route notes; replace with exact route once verified.",
      },
      {
        id: `${id}-w2`,
        label: "Primary objective chain",
        detail: "Placeholder objective sequence; replace with exact objective beats.",
      },
      {
        id: `${id}-w3`,
        label: "Stealth/combat decision points",
        detail: "Placeholder tactical advice; replace with tested strategy.",
      },
      {
        id: `${id}-w4`,
        label: "Collectible sweep segment",
        detail: "Placeholder collectible path; replace with exact checkpoint pathing.",
      },
      {
        id: `${id}-w5`,
        label: "Challenge optimization",
        detail: "Placeholder challenge route; replace with mission-specific method.",
      },
      {
        id: `${id}-w6`,
        label: "Exit and replay cleanup notes",
        detail: "Placeholder cleanup notes for chapter/checkpoint mop-up.",
      },
    ],
    checklist: [
      { id: `${id}-c1`, label: "Complete mission" },
      { id: `${id}-c2`, label: "Finish mission challenge set" },
      { id: `${id}-c3`, label: "Collect all mission-linked collectibles" },
    ],
  };
});

const missionIdByName = Object.fromEntries(MISSIONS.map((mission) => [mission.name, mission.id]));

const postcardRecords = [
  {
    name: "Iceland Postcard",
    mission: "Against The Odds",
    checkpoint: "06 - Central Camp",
    route: "From F8 containers, cut across crates into B2 and loot the desk inside.",
  },
  {
    name: "Malta Postcard",
    mission: "The Needle's Eye",
    checkpoint: "01 - Basic Training",
    route: "At the obstacle course start path, grab it from the right-side table.",
  },
  {
    name: "Slovakia Postcard",
    mission: "All the Time in the World",
    checkpoint: "07 - Accessing Room 206",
    route: "Pickpocket Room 205 keycard from the maid and loot the bedside table in 205.",
  },
  {
    name: "Mauritania Postcard",
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "Laser the small fenced padlock near the red anchor and take the postcard inside.",
  },
  {
    name: "Kensington Postcard",
    mission: "Uninvited",
    checkpoint: "06 - Security Office",
    route: "Search desk corners in the CCTV/security room after entry.",
  },
  {
    name: "City of London Postcard",
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Use Greenway boost via statues, shimmy into window, then loot the bar table.",
  },
  {
    name: "Vietnam Postcard",
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "After finding Ellis White route, loot a table inside the Ocean View Bar area.",
  },
  {
    name: "Q-Lab Postcard",
    mission: "Man of the Hour",
    checkpoint: "04 - The Betrayal",
    route: "Reach Q-01 Gym, climb filing cabinets, cross ledge corridor, take from desk.",
  },
  {
    name: "Antarctica Postcard",
    mission: "Wave of the Future",
    checkpoint: "16 - Safety Off",
    route: "After command access path near cat statue route, pick up from nearby chair area.",
  },
  {
    name: "MI6 Postcard",
    mission: "For England",
    checkpoint: "06 - Backstairs",
    route: "After the red phone/earpiece sequence, squeeze shelves and check floor right side.",
  },
];

const legacyItemRecords = [
  {
    name: "Cruciform Key",
    mission: "Against The Odds",
    checkpoint: "06 - Central Camp",
    route: "In container F8, loot the shelf beside the broken screen.",
  },
  {
    name: "Dagger Shoes",
    mission: "A Matter of Considerable Delicacy",
    checkpoint: "03 - Field Equipment",
    route: "In Q-07 Wearables, take from central table after speaking with Q.",
  },
  {
    name: "Chess Biography",
    mission: "All the Time in the World",
    checkpoint: "03 - The Game is On",
    route: "Past the arguing pair, enter right seating room and inspect side table magazine.",
  },
  {
    name: "ATAC Device",
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "Follow crypto-wallet side path, drop to lower ledge before antenna, loot at dead end.",
  },
  {
    name: "Concert Poster",
    mission: "Uninvited",
    checkpoint: "05 - Get Upstairs",
    route: "In gala cafe, check back-right table.",
  },
  {
    name: "Blades Club Badge",
    mission: "Knightfall",
    checkpoint: "03 - The Penthouse",
    route: "At penthouse bar on right, loot small table.",
  },
  {
    name: "Tarot Deck",
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "After Ramon Hernandez sequence, search bedroom bedside table.",
  },
  {
    name: "Trilby Hat",
    mission: "Man of the Hour",
    checkpoint: "04 - The Betrayal",
    route: "In Q-07 Wearables changing rooms, collect from inside locker/changing area.",
  },
  {
    name: "Jaws Design Specs",
    mission: "Wave of the Future",
    checkpoint: "08 - Robotics Department",
    route: "From robotics entrance, check back-left crates/servers area.",
  },
];

const mementoRecords = [
  {
    name: "Satellite Part",
    mission: "Against The Odds",
    checkpoint: "06 - Central Camp",
    route: "Enter G9 hostages container, take storage key, loot desk memento.",
  },
  {
    name: "Cocktail Napkin",
    mission: "A Night Out",
    checkpoint: "05 - Get Upstairs",
    route: "Move behind bar counter and take from shelf near bartenders.",
  },
  {
    name: "Pillow Mint",
    mission: "All the Time in the World",
    checkpoint: "03 - The Game is On",
    route: "Acquire staff room key from staff NPC and loot inside locked room.",
  },
  {
    name: "Championship Badge",
    mission: "All the Time in the World",
    checkpoint: "03 - The Game is On",
    route: "Go behind chess hall stage gap; left room has badge on crate.",
  },
  {
    name: "Pirate Grillz",
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "After fee objective starts, loot opposite stall at ramp base.",
  },
  {
    name: "Crocodile Tooth",
    mission: "The Past Never Dies",
    checkpoint: "09 - Leaving Aleph",
    route: "After crocodile pit, pass Bawma's car and check crates ahead.",
  },
  {
    name: "Anniversary Pin",
    mission: "Uninvited",
    checkpoint: "05 - Get Upstairs",
    route: "From cloak room shelves squeeze-gap, loot pin from shelf.",
  },
  {
    name: "Tero Murto Locket",
    mission: "Uninvited",
    checkpoint: "07 - Basement",
    route: "Use restoration keycard sequence to open Room 3 and loot desk.",
  },
  {
    name: "Office Toy",
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Use vent behind wrapped crate and check back-right cabinet in office.",
  },
  {
    name: "Diving Watch",
    mission: "Time to Die",
    checkpoint: "07 - Suit Up",
    route: "After bowtie QTE in villa, turn around and check bedside table.",
  },
  {
    name: "Niko Murto Locket",
    mission: "Man of the Hour",
    checkpoint: "02 - Stand Down",
    route: "Find Basil from accounting; loot desk directly behind him.",
  },
  {
    name: "Snow Globe",
    mission: "Wave of the Future",
    checkpoint: "04 - The Gate House",
    route: "At reception/eavesdrop desk, collect from counter.",
  },
  {
    name: "Robot Keychain",
    mission: "Wave of the Future",
    checkpoint: "19 - Silo Entrance",
    route: "After vent and hatch drop, loot lectern near meeting room main screen.",
  },
  {
    name: "Dashboard Toy",
    mission: "For England",
    checkpoint: "14 - Q-Lab Showdown",
    route: "In Q-07 Wearables during cleanup, loot toy from table.",
  },
];

const intelRecords = [
  {
    name: "Selina Tan Intel",
    mission: "The Heart of the Matter",
    checkpoint: "Q-Lab",
    route: "Back-right Q-Lab cabinet near scientists/printer.",
  },
  {
    name: "00 Recruits Intel",
    mission: "The Heart of the Matter",
    checkpoint: "Q-Lab",
    route: "After Q Lens tutorial, interact with terminal behind Q's desk.",
  },
  {
    name: "Lennox Munroe Intel",
    mission: "A New Home",
    checkpoint: "01 - Home",
    route: "In apartment living area, inspect dresser photo.",
  },
  {
    name: "Cressida Bright Intel",
    mission: "A New Home",
    checkpoint: "01 - Home",
    route: "In Cressida's bedroom, inspect gift box on bed.",
  },
  {
    name: "Arrowhead Report Intel",
    mission: "A Matter of Considerable Delicacy",
    checkpoint: "07 - Operations",
    route: "From operations elevator, move opposite objective and inspect desk by whiteboard.",
  },
  {
    name: "009 Profile Intel",
    mission: "A Matter of Considerable Delicacy",
    checkpoint: "08 - Master Manipulator",
    route: "Inside Moneypenny's office, inspect desk collectible.",
  },
  {
    name: "Niko and Tero Murto Intel",
    mission: "Out of the Ashes",
    checkpoint: "05 - Talk to Moneypenny",
    route: "At operations floor cabinets behind elevator route, inspect left-wall case.",
  },
  {
    name: "Bawma Intel",
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "Find red buoy stall area and inspect counter item.",
  },
  {
    name: "John Greenway Intel",
    mission: "The Past Never Dies",
    checkpoint: "08 - Examine the Crime Scene",
    route: "In cabin office near evidence sequence, inspect side table item.",
  },
  {
    name: "James Bond Intel",
    mission: "Uninvited",
    checkpoint: "02 - Back Home",
    route: "In Bond's room, inspect bedside family photo.",
  },
  {
    name: "Webb Industries Intel",
    mission: "Uninvited",
    checkpoint: "05 - Get Upstairs",
    route: "In media/press room secure table, distract guards and inspect press pack.",
  },
  {
    name: "Stephen Bright Intel",
    mission: "Uninvited",
    checkpoint: "06 - Security Office",
    route: "Enter side meeting room and inspect conference table notice.",
  },
  {
    name: "Roger Finch Intel",
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Open R. Finch office and inspect wooden spoon.",
  },
  {
    name: "Isola Vale Intel",
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Follow vent route to final office and inspect desk contract.",
  },
  {
    name: "Damien Webb Intel",
    mission: "Knightfall",
    checkpoint: "03 - The Penthouse",
    route: "In penthouse back-right shelf, inspect dossier.",
  },
  {
    name: "Q Intel",
    mission: "Going Old School",
    checkpoint: "04 - In the Zone",
    route: "In Q-Lab prep area, inspect driving gloves on right desk.",
  },
  {
    name: "Theresa Lorca Intel",
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "After speaking with Theresa Lorca, inspect keynote item near pool.",
  },
  {
    name: "Caliban Intel",
    mission: "Time to Die",
    checkpoint: "07 - Suit Up",
    route: "From villa bedroom area, inspect profile on living room cabinet.",
  },
  {
    name: "Riptide Intel",
    mission: "Time to Die",
    checkpoint: "15 - Tracking Damien",
    route: "After chainsaw escape/rejoin Greenway, inspect gun case on spool.",
  },
  {
    name: "Rhys Beckett Intel",
    mission: "Man of the Hour",
    checkpoint: "04 - The Betrayal",
    route: "In Q-03 Stress Testing, unlock cabinet with code 4397 and inspect photo.",
  },
  {
    name: "M Intel",
    mission: "Wave of the Future",
    checkpoint: "12 - Operations Department",
    route: "Inside security office, inspect desk by vent before command-center access.",
  },
  {
    name: "Sir Nicholas Webb Intel",
    mission: "Wave of the Future",
    checkpoint: "16 - Safety Off",
    route: "After ID upgrade route, inspect manuscript on chair near cat statue path.",
  },
  {
    name: "Eve Moneypenny Intel",
    mission: "For England",
    checkpoint: "10 - Utility Tunnels",
    route: "After fan-off tunnel route, inspect wallet on half wall to the left.",
  },
];

const playingCardNames = [
  "7 of Acorns",
  "Under of Acorns",
  "7 of Roses",
  "Ober of Bells",
  "Ace of Acorns",
  "Ober of Shields",
  "6 of Roses",
  "6 of Acorns",
  "7 of Bells",
  "6 of Bells",
  "Ober of Acorns",
  "Ace of Roses",
  "9 of Acorns",
  "Banner of Shields",
  "6 of Shields",
  "8 of Acorns",
  "Ober of Roses",
  "King of Shields",
  "8 of Roses",
  "9 of Shields",
  "Banner of Roses",
  "Banner of Bells",
  "7 of Shields",
  "King of Acorns",
  "Under of Shields",
  "Banner of Acorns",
  "8 of Shields",
  "9 of Roses",
  "King of Roses",
  "Under of Bells",
  "Under of Roses",
  "Ace of Bells",
  "9 of Bells",
  "King of Bells",
  "Ace of Shields",
  "8 of Bells",
];

const playingCardRecords = [
  {
    mission: "Against The Odds",
    checkpoint: "04 - Deployment Camp",
    route: "After BT-65 cutscene, check storage shelf before moving the vehicle.",
  },
  {
    mission: "A New Home",
    checkpoint: "02 - Advanced Training",
    route: "Hack first gate, backtrack upstairs to Greenway's ledge and grab card.",
  },
  {
    mission: "A New Home",
    checkpoint: "10 - Search the Compound",
    route: "Drop to lower route by pier and clear storage room guards; card in back corner.",
  },
  {
    mission: "A Night Out",
    checkpoint: "05 - Get Upstairs",
    route: "Go behind stage, climb scaffolding and catwalk to far end near VIP balcony.",
  },
  {
    mission: "All the Time in the World",
    checkpoint: "02 - In Position",
    route: "After car exit, take left stairs downward before following objective path.",
  },
  {
    mission: "All the Time in the World",
    checkpoint: "03 - The Game is On",
    route: "Enter dining room from side corridor and loot back-left table.",
  },
  {
    mission: "All the Time in the World",
    checkpoint: "03 - The Game is On",
    route: "Open manager safe in office (code 1952) and collect card inside.",
  },
  {
    mission: "All the Time in the World",
    checkpoint: "08 - Delivery Area",
    route: "Ignore window route briefly; loot table on terrace beside end gate.",
  },
  {
    mission: "All the Time in the World",
    checkpoint: "10 - The Vanishing",
    route: "After dining puzzle basement access, take dead-end left path to crate.",
  },
  {
    mission: "The Past Never Dies",
    checkpoint: "02 - Arriving at Aleph",
    route: "At first market split, check bathroom behind central gun-lit shelves.",
  },
  {
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "Open wall cabinet behind pickup truck with Laser Strap.",
  },
  {
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "From fight pit roof gym, loot small side room near entrance.",
  },
  {
    mission: "The Past Never Dies",
    checkpoint: "03 - Black Market",
    route: "Break fish-tank glass near eavesdrop guards and collect card.",
  },
  {
    mission: "The Past Never Dies",
    checkpoint: "07 - Find 009",
    route: "On 009's booby-trapped boat, take left rear deck route to chessboard table.",
  },
  {
    mission: "Beyond the Grave",
    checkpoint: "10 - Find a way inside the shipwreck",
    route: "Before lowering bridge for Greenway, check barrels near raised bridge.",
  },
  {
    mission: "Uninvited",
    checkpoint: "04 - Gala Entrance",
    route: "At initial gala hall, check stone bench in back-right corner.",
  },
  {
    mission: "Uninvited",
    checkpoint: "05 - Get Upstairs",
    route: "In upstairs exhibit room, clear guards and loot central crate.",
  },
  {
    mission: "Uninvited",
    checkpoint: "09 - Storage Room",
    route: "After escaping restraints, turn around and loot table behind chair.",
  },
  {
    mission: "Uninvited",
    checkpoint: "09 - Storage Room",
    route: "After light-rig traversal, check right-side balcony table before door.",
  },
  {
    mission: "Uninvited",
    checkpoint: "10 - The Courtyard",
    route: "Use vent or room code route into locked dining-hall room; card on cart.",
  },
  {
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Enter maintenance room and laser-open ceiling vent for collectible.",
  },
  {
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Shimmy to balcony, hack door path for Greenway, loot billiards table.",
  },
  {
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "Hack into Einstein office from Bohr office and collect on table.",
  },
  {
    mission: "Knightfall",
    checkpoint: "02 - Executive 1st Floor",
    route: "After security keycard, unlock balcony door and loot table outside.",
  },
  {
    mission: "Knightfall",
    checkpoint: "09 - Cargo Floor",
    route: "Take downward stair from split after guard fight; card sits on crate.",
  },
  {
    mission: "Time to Die",
    checkpoint: "03 - A Package from Q",
    route: "In Bond villa bathroom upstairs, collect from sink counter.",
  },
  {
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "At Tranquility Platform yoga zone, loot back-right lantern/basket area.",
  },
  {
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "At Tranquility Cave, eavesdrop/pickpocket key, enter storage room.",
  },
  {
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "At Lotus Bar, check rear countertop corner for card.",
  },
  {
    mission: "Time to Die",
    checkpoint: "05 - The Three Targets",
    route: "In Hung Villa bathroom after Hernandez sequence, loot sink area.",
  },
  {
    mission: "Wave of the Future",
    checkpoint: "03 - The Gantries",
    route: "After first fights and stair climb, card is in initial hall end.",
  },
  {
    mission: "Wave of the Future",
    checkpoint: "04 - The Gate House",
    route: "At cable-car ID section, go top-right to sleeping woman bench.",
  },
  {
    mission: "Wave of the Future",
    checkpoint: "08 - Robotics Department",
    route: "From robotics entrance, move toward Utility and check angled cabinet on right.",
  },
  {
    mission: "For England",
    checkpoint: "03 - Null Space",
    route: "After wounded woman scene, enter room ahead before following voices.",
  },
  {
    mission: "For England",
    checkpoint: "08 - Moneypenny's Pod",
    route: "Kick open adjacent meeting room before entering Moneypenny office.",
  },
  {
    mission: "For England",
    checkpoint: "12 - THEIA",
    route: "After entrance standoff, check right-side L-shaped desk corner.",
  },
];

const createCollectibles = (records, type) =>
  records.map((record, index) => {
    const missionId = missionIdByName[record.mission] || MISSIONS[0].id;
    return {
      id: `${type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(index + 1).padStart(2, "0")}`,
      name: record.name,
      type,
      missionId,
      checkpoint: record.checkpoint,
      locationHint: `Checkpoint ${record.checkpoint}; precise room path can be expanded in route notes.`,
      routeNote: record.route || "Route note pending verification.",
      isVerifiedName: true,
    };
  });

const postcards = createCollectibles(postcardRecords, "Postcards");
const legacyItems = createCollectibles(legacyItemRecords, "Legacy Items");
const mementos = createCollectibles(mementoRecords, "Mementos");
const intelFiles = createCollectibles(intelRecords, "Intel / MI6 Files");

const cards = playingCardNames.map((name, index) => {
  const [rank, , suit] = name.split(" ");
  const cardRecord = playingCardRecords[index];
  return {
    id: `playing-cards-${String(index + 1).padStart(2, "0")}`,
    name,
    type: "Playing Cards",
    missionId: missionIdByName[cardRecord.mission],
    checkpoint: cardRecord.checkpoint,
    rank,
    suit,
    locationHint: `Checkpoint ${cardRecord.checkpoint}; precise pickup position can be expanded in route notes.`,
    routeNote: cardRecord.route || "Card route note pending verification.",
    isVerifiedName: true,
  };
});

export const COLLECTIBLES = [...postcards, ...intelFiles, ...mementos, ...legacyItems, ...cards];

export const CHALLENGES = MISSIONS.map((mission, index) => ({
  id: `challenge-${mission.id}`,
  missionId: mission.id,
  title: `${mission.name} Challenge Set`,
  description: "Placeholder: replace with verified mission challenge requirements.",
  tierTargets: ["Bronze", "Silver", "Gold"],
  order: index + 1,
}));

export const QUESTS = MISSIONS.flatMap((mission, index) => {
  const mainQuest = {
    id: `quest-${mission.id}-main`,
    missionId: mission.id,
    title: mission.name,
    type: "Main Quest",
    isPlaceholder: mission.isStructuralSlot,
    note: mission.isStructuralSlot
      ? "Placeholder: replace with exact prologue/tutorial segmented quest title if needed."
      : "Primary mission quest entry.",
    order: index * 2 + 1,
  };

  const cleanupQuest = {
    id: `quest-${mission.id}-cleanup`,
    missionId: mission.id,
    title: `${mission.name} Cleanup Sweep`,
    type: "Cleanup Quest",
    isPlaceholder: true,
    note: "Placeholder: replace with verified mission-specific cleanup quest title.",
    order: index * 2 + 2,
  };

  return [mainQuest, cleanupQuest];
});

export const ACHIEVEMENTS = [
  {
    id: "achv-main-ops",
    title: "Main Operations Complete",
    category: "Story",
    description: "Complete all 18 normalized missions.",
    metricType: "missionsCompleted",
    target: 18,
  },
  {
    id: "achv-collector-total",
    title: "Asset Recovery",
    category: "Collectibles",
    description: "Collect all 92 collectibles.",
    metricType: "collectiblesTotal",
    target: 92,
  },
  {
    id: "achv-card-master",
    title: "Card Shark",
    category: "Collectibles",
    description: "Collect all 36 playing cards.",
    metricType: "collectiblesByType",
    metricKey: "Playing Cards",
    target: 36,
  },
  {
    id: "achv-intel-archive",
    title: "Intelligence Archive",
    category: "Collectibles",
    description: "Collect all 23 Intel / MI6 Files.",
    metricType: "collectiblesByType",
    metricKey: "Intel / MI6 Files",
    target: 23,
  },
  {
    id: "achv-memento-curator",
    title: "Memento Curator",
    category: "Collectibles",
    description: "Collect all 14 Mementos.",
    metricType: "collectiblesByType",
    metricKey: "Mementos",
    target: 14,
  },
  {
    id: "achv-postal-service",
    title: "Postal Service",
    category: "Collectibles",
    description: "Collect all 10 Postcards.",
    metricType: "collectiblesByType",
    metricKey: "Postcards",
    target: 10,
  },
  {
    id: "achv-legacy-vault",
    title: "Legacy Vault",
    category: "Collectibles",
    description: "Collect all 9 Legacy Items.",
    metricType: "collectiblesByType",
    metricKey: "Legacy Items",
    target: 9,
  },
  {
    id: "achv-challenge-sweep",
    title: "Challenge Sweep",
    category: "Challenges",
    description: "Complete all mission challenge sets.",
    metricType: "challengesCompleted",
    target: 18,
  },
  {
    id: "achv-quest-completion",
    title: "Field Operative",
    category: "Quests",
    description: "Complete all tracked quest entries.",
    metricType: "questsCompleted",
    target: QUESTS.length,
  },
];

export const DATA_VALIDATION = {
  missionCount: MISSIONS.length,
  questCount: QUESTS.length,
  collectibleCount: COLLECTIBLES.length,
  collectibleByType: COLLECTIBLES.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {}),
};
