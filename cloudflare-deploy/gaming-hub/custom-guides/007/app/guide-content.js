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

const MISSION_OBJECTIVE_PROFILES = {
  "Against The Odds": [
    "Insert at the deployment camp edge and clear your first guarded lane before crossing into the container grid.",
    "Push into the Central Camp route, secure key intel interactions, and keep alarms disabled.",
    "Move through hostage and storage containers, collecting objective items before advancing the story trigger.",
    "Open the final camp path and clear resistance waves while maintaining mission momentum.",
    "Complete the extraction sequence and confirm all side-room pickups before exiting the mission.",
  ],
  "In His Majesty's Secret Service": [
    "Complete the opening MI6 briefing path and interact with every mandatory orientation objective.",
    "Follow the secure-facility route through training checkpoints without skipping dialogue or scans.",
    "Use traversal prompts to clear each controlled test area in order.",
    "Finish the objective handoff sequence and lock in all mission updates.",
    "Exit through the designated operations transition after confirming optional interactions are complete.",
  ],
  "The Needle's Eye": [
    "Start at Basic Training and finish the opening movement/combat sequence cleanly.",
    "Advance through the scoped recon objective chain and identify all required targets.",
    "Clear security chokepoints in order before activating the next story marker.",
    "Take the final infiltration route while preserving stealth as long as possible.",
    "Close the mission with the end encounter and verify all checkpoint interactions are complete.",
  ],
  "The Heart of the Matter": [
    "Enter Q-Lab and complete every mandatory analysis/tutorial interaction.",
    "Progress through lab terminals and gadget validation objectives in sequence.",
    "Resolve all objective prompts tied to personnel briefings before leaving the area.",
    "Trigger the mission handoff only after optional intel interactions are done.",
    "Finish the transition objective to unlock the next operational chapter.",
  ],
  "A New Home": [
    "Clear the Home introduction sequence and collect all immediate objective prompts.",
    "Move into Advanced Training and complete each gated trial before pushing forward.",
    "Advance to compound-side objectives and clear interior and perimeter interactions.",
    "Secure mission-critical rooms in order, using stealth to reduce reinforcements.",
    "Complete the final compound objective and exit after sweeping remaining side spaces.",
  ],
  "A Night Out": [
    "Enter the venue and complete access setup objectives without raising alerts early.",
    "Work through crowd-facing checkpoints and secure required IDs or entry routes.",
    "Push to Get Upstairs and finish all mandatory interactions tied to target progression.",
    "Clear the upper-route objective chain while maintaining route control.",
    "Finish the mission finale and verify stage/bar back routes for missed items before exfil.",
  ],
  "A Matter of Considerable Delicacy": [
    "Begin in Field Equipment and complete gear preparation objectives in full.",
    "Advance through Operations-floor tasks and close required desk/terminal interactions.",
    "Move into Master Manipulator objectives and finish the office chain in order.",
    "Resolve all dialogue and proof-of-access prompts before mission close.",
    "Complete extraction/transition once all mission tasks and optional interactions are done.",
  ],
  "All the Time in the World": [
    "Finish In Position setup and secure the opening route into the event complex.",
    "Clear The Game is On objective chain, including room access and side interactions.",
    "Progress through delivery and hotel-floor objectives without skipping locked-room opportunities.",
    "Complete the late mission objective beats and track all keycard-gated spaces.",
    "Close the final sequence and confirm remaining room sweeps before exit.",
  ],
  "Out of the Ashes": [
    "Run the opening recovery brief and complete all required check-ins.",
    "Advance to Talk to Moneypenny objectives and clear operations-floor interactions.",
    "Progress through follow-up intelligence prompts in order.",
    "Finish the mission-critical handoff sequence without skipping interactive nodes.",
    "Exit once chapter progression confirms all mandatory objectives are complete.",
  ],
  "The Past Never Dies": [
    "Enter Aleph and clear the Arriving objective path while mapping early routes.",
    "Push through Black Market objectives, including all mandatory stalls and access gates.",
    "Complete Find 009 and associated movement/combat sequences in order.",
    "Resolve crime-scene and departure objectives without bypassing side branches.",
    "Finish the escape/exfil chain and verify market-side collectibles before mission end.",
  ],
  "Beyond the Grave": [
    "Start the wreck approach and clear the opening traversal objective chain.",
    "Advance through interior wreck progression, activating each required path unlock.",
    "Complete bridge/control objectives while managing multi-angle combat pressure.",
    "Secure final story interactions inside the wreck route.",
    "Exit after completing the end objective and confirming no missed side containers.",
  ],
  Uninvited: [
    "Enter through Gala Entrance and secure your initial social stealth route.",
    "Progress from Get Upstairs to Security Office objectives without skipping room checks.",
    "Complete Basement and Storage Room chains in sequence, including lock/keycard objectives.",
    "Push through Courtyard conflict and final access gates.",
    "Finish the mission finale and sweep remaining gala-side paths before exfil.",
  ],
  Knightfall: [
    "Infiltrate the Executive 1st Floor and clear first office objective requirements.",
    "Advance through penthouse and security-linked objective chains in order.",
    "Use vent/balcony routes to maintain stealth while completing access tasks.",
    "Resolve Cargo Floor and late mission conflict sequences cleanly.",
    "Close the mission and verify all executive-side rooms before final exit.",
  ],
  "Going Old School": [
    "Start with the opening setup objective and move into Q-Lab-linked progression.",
    "Complete In the Zone interactions and all required mission prompts.",
    "Advance through the classic-ops sequence while preserving tactical control.",
    "Finish mandatory puzzle/combat gates in the designed order.",
    "Complete end objective handoff and exit only after confirming side interactions.",
  ],
  "Time to Die": [
    "Complete A Package from Q and establish the mission loadout path.",
    "Work through The Three Targets in sequence without skipping target-linked sub-objectives.",
    "Finish Suit Up and late pursuit segments while maintaining checkpoint discipline.",
    "Resolve final confrontation chain and clear all objective confirmations.",
    "Exit after mission completion and verify target-area sweep is fully done.",
  ],
  "Man of the Hour": [
    "Clear Stand Down objectives and collect all required opening interactions.",
    "Advance to The Betrayal chain and complete each controlled room objective.",
    "Push through Q-lab sectors in order, including secured cabinet/door interactions.",
    "Finish high-pressure story beats and lock in mission-critical evidence.",
    "Complete extraction and confirm all section-specific pickups before closing.",
  ],
  "Wave of the Future": [
    "Begin with gantry and gatehouse objectives, clearing each access layer in order.",
    "Progress through robotics and operations department chains without skipping side rooms.",
    "Resolve command-center safety objectives and all required system interactions.",
    "Complete silo-side endgame sequence while controlling reinforcement routes.",
    "Finish mission end path and verify late-checkpoint collectibles are complete.",
  ],
  "For England": [
    "Start in Null Space and clear opening narrative objectives before tunnel progression.",
    "Advance through Backstairs, pod, and utility tunnel checkpoints in sequence.",
    "Complete THEIA and Q-Lab Showdown chain with full objective confirmation.",
    "Resolve final confrontation and all scripted mission interactions.",
    "Finish the end mission sequence after a last side-room and collectible sweep.",
  ],
};

const getMissionObjectiveProfile = (missionName) =>
  MISSION_OBJECTIVE_PROFILES[missionName] || [
    "Complete the opening objective chain.",
    "Follow objective markers through mid-mission progression.",
    "Finish required interactions and combat gates.",
    "Resolve final objective beats.",
    "Exit after confirming side content completion.",
  ];

const buildMissionWalkthrough = (id, name) => {
  const profile = getMissionObjectiveProfile(name);
  return [
  {
    id: `${id}-w1`,
    label: "Step 1: Opening route",
    detail: profile[0],
  },
  {
    id: `${id}-w2`,
    label: "Step 2: Core objective chain",
    detail: profile[1],
  },
  {
    id: `${id}-w3`,
    label: "Step 3: Mid-mission control",
    detail: profile[2],
  },
  {
    id: `${id}-w4`,
    label: "Step 4: Final objective setup",
    detail: profile[3],
  },
  {
    id: `${id}-w5`,
    label: "Step 5: Mission completion",
    detail: profile[4],
  },
  {
    id: `${id}-w6`,
    label: "Step 6: 100% confirmation",
    detail:
      "Before final lock-in, confirm quest checklist, challenge set, and mission-linked collectibles are complete. Use Checkpoint Select only for targeted cleanup.",
  },
  ];
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
    walkthrough: buildMissionWalkthrough(id, name),
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
    const firstSentence = (record.route || "").split(".")[0]?.trim();
    return {
      id: `${type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(index + 1).padStart(2, "0")}`,
      name: record.name,
      type,
      missionId,
      checkpoint: record.checkpoint,
      locationHint: firstSentence || `Search around ${record.checkpoint}.`,
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
  const firstSentence = (cardRecord.route || "").split(".")[0]?.trim();
  return {
    id: `playing-cards-${String(index + 1).padStart(2, "0")}`,
    name,
    type: "Playing Cards",
    missionId: missionIdByName[cardRecord.mission],
    checkpoint: cardRecord.checkpoint,
    rank,
    suit,
    locationHint: firstSentence || `Search around ${cardRecord.checkpoint}.`,
    routeNote: cardRecord.route || "Card route note pending verification.",
    isVerifiedName: true,
  };
});

export const COLLECTIBLES = [...postcards, ...intelFiles, ...mementos, ...legacyItems, ...cards];

const collectiblesByMission = COLLECTIBLES.reduce((acc, item) => {
  acc[item.missionId] = acc[item.missionId] || [];
  acc[item.missionId].push(item);
  return acc;
}, {});

export const CHALLENGES = MISSIONS.map((mission, index) => ({
  id: `challenge-${mission.id}`,
  missionId: mission.id,
  title: `${mission.name} Challenge Set`,
  description: "Finish this mission with clean stealth entries, efficient objective routing, and no missed interaction opportunities.",
  strategy: [
    "Run a first pass for completion and route learning, then replay checkpoints for strict challenge conditions.",
    "Use checkpoint restarts after detection-heavy sections instead of replaying the full mission.",
    "Bank all collectibles in the same run to avoid duplicating traversal.",
  ],
  tierTargets: ["Bronze", "Silver", "Gold"],
  order: index + 1,
}));

export const QUESTS = MISSIONS.flatMap((mission, index) => {
  const missionCollectibles = collectiblesByMission[mission.id] || [];
  const profile = getMissionObjectiveProfile(mission.name);
  const firstCheckpoint = missionCollectibles[0]?.checkpoint || "Opening objective";
  const midpointCheckpoint =
    missionCollectibles[Math.floor(missionCollectibles.length / 2)]?.checkpoint || "Mid-mission objective";
  const lastCheckpoint =
    missionCollectibles[missionCollectibles.length - 1]?.checkpoint || "Final objective";

  const mainQuest = {
    id: `quest-${mission.id}-main`,
    missionId: mission.id,
    title: mission.name,
    type: "Main Quest",
    isPlaceholder: false,
    note: `Step-by-step route for completing ${mission.name} from first objective to extraction.`,
    steps: [
      `1) ${profile[0]} (anchor checkpoint: ${firstCheckpoint}).`,
      `2) ${profile[1]} (track progress through ${midpointCheckpoint}).`,
      `3) ${profile[2]} and avoid advancing the trigger until nearby side rooms are checked.`,
      `4) ${profile[3]} with alarms/cameras managed before each interaction.`,
      `5) ${profile[4]} (final checkpoint focus: ${lastCheckpoint}).`,
      "6) After completion, verify mission checklist, quest status, challenge status, and collectible count before leaving the board.",
    ],
    order: index * 2 + 1,
  };

  const cleanupQuest = {
    id: `quest-${mission.id}-cleanup`,
    missionId: mission.id,
    title: `${mission.name} 100% Cleanup`,
    type: "Completion Quest",
    isPlaceholder: false,
    note: "Focused replay plan for remaining collectibles, challenge checks, and mission checklist items.",
    steps: [
      `1) Start Checkpoint Select at ${firstCheckpoint} and clear uncollected pickups first.`,
      "2) Advance one checkpoint at a time; never trigger the next objective before sweeping current side routes.",
      `3) Re-run ${midpointCheckpoint} for unresolved stealth/combat challenge conditions.`,
      `4) Sweep ${lastCheckpoint} route plus adjacent rooms, vents, and overlook tables for missed items.`,
      "5) Complete all mission challenge tiers and confirm each mission checklist box is marked complete.",
      "6) Return to mission board and ensure mission percent, quests, collectibles, and challenge counters are all fully closed.",
    ],
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
