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

const inferLoadoutStep = (objective, complication) => {
  const text = `${objective} ${complication}`.toLowerCase();

  if (text.includes("hunt") || text.includes("deer") || text.includes("bear")) {
    return "Equip bow/rifle, bring scent cover if available, and prioritize clean shots for pelt quality.";
  }

  if (text.includes("train") || text.includes("bank") || text.includes("rob")) {
    return "Bring high-damage sidearm, shotgun, and full dead-eye tonics before the robbery phase starts.";
  }

  if (text.includes("rescue") || text.includes("escort")) {
    return "Pack healing items and prioritize horse health so the escort/rescue path cannot fail late.";
  }

  if (text.includes("steal") || text.includes("wagon") || text.includes("stagecoach")) {
    return "Carry a fast weapon loadout and clear witnesses quickly before theft objectives lock failure states.";
  }

  return "Restock ammo, tonics, and horse supplies before entering the mission trigger zone.";
};

const inferTacticalStep = (complication) => {
  const text = complication.toLowerCase();

  if (text.includes("law") || text.includes("pinkerton")) {
    return "Break line of sight when wanted pressure spikes, then reposition before re-engaging.";
  }

  if (text.includes("stealth") || text.includes("infiltrate")) {
    return "Use cover and silent takedowns first; only escalate to open combat if the mission forces it.";
  }

  if (text.includes("escort") || text.includes("survivor") || text.includes("wagon")) {
    return "Stay close to the escorted target and clear flank threats before pushing the route forward.";
  }

  if (text.includes("ambush") || text.includes("crossfire")) {
    return "Prioritize elevated shooters first, then collapse remaining enemies from hard cover.";
  }

  return `Handle the pressure point cleanly: ${complication}.`;
};

const inferGoldReplayStep = (objective, complication) => {
  const text = `${objective} ${complication}`.toLowerCase();

  if (text.includes("ride") || text.includes("chase") || text.includes("escape")) {
    return "Gold replay prep: memorize route shortcuts and maintain top horse speed without collisions.";
  }

  if (text.includes("fight") || text.includes("gunfight") || text.includes("assault")) {
    return "Gold replay prep: chain headshots from cover and avoid health item use where possible.";
  }

  if (text.includes("stealth") || text.includes("infiltrate")) {
    return "Gold replay prep: complete stealth segment undetected and reduce time lost to alert resets.";
  }

  return "Gold replay prep: target faster completion time and cleaner objective execution on replay.";
};

const createMission = (id, title, objective, complication, finishStep) => ({
  id,
  title,
  steps: [
    ["Briefing", `Start ${title} and review mission-fail conditions before moving out.`],
    ["Loadout", inferLoadoutStep(objective, complication)],
    ["Approach", "Travel to the mission zone, stay in the objective radius, and avoid unnecessary alerts."],
    ["Primary", `Primary objective: ${objective}.`],
    ["Tactical", inferTacticalStep(complication)],
    ["Stability", "Keep allies and horse alive, loot safely, and stabilize before pushing the next marker."],
    ["Finish", finishStep || "Reach the final objective marker and complete the mission result scene."],
    ["Post-Check", "Save progress, restock resources, and confirm next unlocked mission node."],
    ["Gold Replay", inferGoldReplayStep(objective, complication)],
  ],
});

const createDetailedMission = (id, title, steps) => ({
  id,
  title,
  steps,
});

const missionItemsFromChapter = (chapterId, missions) =>
  missions.flatMap((mission) =>
    mission.steps.map(([phase, step], index) => [
      `${chapterId}-${mission.id}-step-${String(index + 1).padStart(2, "0")}`,
      `${mission.title} - ${phase}`,
      step,
    ])
  );

const STORY_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Chapter 1 Mission Steps",
    missions: [
      createDetailedMission("outlaws-from-the-west", "Outlaws from the West", [
        ["Briefing", "Ride from camp with Dutch after the storm briefing and keep pace to avoid mission reset."],
        ["Approach", "Reach the Adler ranch perimeter, dismount on cue, and sweep the lower rooms first."],
        ["Search", "Clear each interior space carefully and inspect the main bedroom for survivors."],
        ["Contact", "Secure Sadie Adler, then reposition immediately when O'Driscolls attack."],
        ["Combat", "Use cabin cover and prioritize enemies entering windows and door lines."],
        ["Recovery", "Mount up, recover the wagon route, and escort survivors through deep snow."],
        ["Finish", "Return to camp with Sadie and complete the mission debrief scene."],
        ["Post-Check", "Restock ammo and healing before launching the next Colter mission."],
      ]),
      createDetailedMission("enter-pursued-by-a-memory", "Enter, Pursued by a Memory", [
        ["Briefing", "Leave camp with Charles and follow his track line without drifting off the trail."],
        ["Tracking", "Investigate deer sign in sequence and stay within objective radius."],
        ["Hunt", "Land a clean kill and skin the deer to satisfy tutorial requirements."],
        ["Carry", "Stow the carcass properly and avoid dropping it before return trigger."],
        ["Camp Return", "Follow Charles back through snowdrifts and avoid collision stalls."],
        ["Delivery", "Hand over supplies at camp and confirm the provisioning scene resolves."],
        ["Finish", "Complete all on-screen hunting prompts before mission end."],
        ["Post-Check", "Use camp resources and prep for upcoming combat-heavy objectives."],
      ]),
      createDetailedMission("old-friends", "Old Friends", [
        ["Briefing", "Ride with Dutch and Micah to the O'Driscoll camp and stop at scout markers."],
        ["Recon", "Use binocular prompts and hold fire until Dutch gives the attack signal."],
        ["Opening Fight", "Take near-cover at first contact and clear left-side shooters quickly."],
        ["Push", "Advance only after immediate threats drop; watch for flanking riflemen."],
        ["Cleanup", "Sweep the camp for remaining enemies and secure the final hostile."],
        ["Loot", "Collect key supplies and ammunition from bodies/crates before leaving."],
        ["Finish", "Regroup with the gang and ride back to Colter to complete the mission."],
        ["Post-Check", "Top off ammo and weapon condition before the train robbery setup."],
      ]),
      createDetailedMission("aftermath-of-genesis", "The Aftermath of Genesis", [
        ["Briefing", "Start with Pearson and head to the hunting grounds on the marked path."],
        ["Instruction", "Follow bow tutorial prompts exactly to avoid objective stalls."],
        ["Target Selection", "Track deer movement, stay downwind, and draw before entering alert range."],
        ["Execution", "Take a clean shot for quality meat and avoid panic misses."],
        ["Field Prep", "Skin and collect required resources before returning to camp."],
        ["Camp Delivery", "Deliver the kill to Pearson and wait for crafting/provision prompts."],
        ["Finish", "Confirm all hunting tutorial objectives complete before exit."],
        ["Post-Check", "Craft arrows or ammo as available to stabilize early loadout."],
      ]),
      createDetailedMission("leviticus-cornwall", "Who the Hell is Leviticus Cornwall?", [
        ["Briefing", "Board the operation with the gang and hold formation before the train approach."],
        ["Intercept", "Ride to the rail line setup and place charges at the marked point."],
        ["Boarding", "Rush train cars once stopped and clear each compartment methodically."],
        ["Mid-Train Combat", "Use narrow-door cover and prioritize shotgun enemies at close range."],
        ["Objective", "Reach target cargo, secure loot, and maintain forward momentum."],
        ["Escape", "Fight through law response and retreat toward the bridge route."],
        ["Finish", "Return to gang fallback point and complete post-robbery dialogue."],
        ["Post-Check", "Refill ammo/tonics immediately; Chapter 2 opens with broader travel."],
      ]),
      createDetailedMission("eastward-bound", "Eastward Bound", [
        ["Briefing", "Break camp and follow Dutch's convoy path without straying from group speed."],
        ["Transit", "Maintain wagon spacing and avoid riding too far ahead of mission NPCs."],
        ["Tutorial", "Complete horse-control prompts while en route to Horseshoe Overlook."],
        ["Arrival", "Enter the new camp zone and wait for setup interactions to trigger."],
        ["Settlement", "Run required camp orientation beats before mission closure."],
        ["Finish", "Confirm chapter transition cutscene completes without skipped objectives."],
        ["Post-Check", "Open map systems, then prioritize early Chapter 2 unlock missions."],
      ]),
    ],
  },
  {
    id: "chapter-2",
    title: "Chapter 2 Mission Steps",
    missions: [
      createDetailedMission("polite-society", "Polite Society, Valentine Style", [
        ["Briefing", "Ride to Valentine with the women and maintain group proximity."],
        ["Town Phase", "Complete each stop sequence while keeping mission companions in range."],
        ["Interruption", "Respond cleanly to the incident trigger and avoid leaving objective area."],
        ["Recovery", "Regroup quickly after disruption and restore formation before departure."],
        ["Return", "Escort everyone back toward camp without splitting the convoy."],
        ["Finish", "Complete return dialogue to lock mission success."],
      ]),
      createDetailedMission("americans-at-rest", "Americans at Rest", [
        ["Briefing", "Enter the saloon with Javier and Charles and trigger the conversation arc."],
        ["Escalation", "Track escalating NPC interactions until combat state begins."],
        ["Brawl", "Win the fistfight chain and avoid stalling during grab/takedown prompts."],
        ["Street Control", "Clear remaining aggressors and keep Arthur standing without fail-state."],
        ["Exit", "Break contact and regroup outside town with mission allies."],
        ["Finish", "Return flow resolves after de-escalation and departure."],
      ]),
      createDetailedMission("exit-pursued", "Exit Pursued by a Bruised Ego", [
        ["Briefing", "Ride out with Hosea and trigger horse sale/tutorial beats."],
        ["Stable Phase", "Complete horse handling steps and finalize black Shire decision."],
        ["Hunt Setup", "Move into legendary bear territory and follow Hosea's tracking route."],
        ["Contact", "Acquire bear sighting and choose engage or retreat timing safely."],
        ["Survival", "If engaging, maintain distance and cover; if retreating, keep mission flow stable."],
        ["Finish", "Return to camp path and conclude Hosea mission arc."],
      ]),
      createDetailedMission("not-without-sin", "Who Is Not without Sin", [
        ["Briefing", "Travel to Flatneck Station and locate Swanson's table-game trail."],
        ["Search", "Interrogate objective points and lock Swanson's location."],
        ["Rescue", "Intervene before rail danger trigger and secure Swanson."],
        ["Extraction", "Mount up with Swanson and avoid crashes on return route."],
        ["Camp Return", "Deliver Swanson back safely to complete mission."],
        ["Finish", "Confirm all rescue prompts and dialogue have completed."],
      ]),
      createDetailedMission("money-lending-1", "Money Lending and Other Sins I", [
        ["Briefing", "Accept Strauss collection assignment and review debt targets on map."],
        ["Target Contact", "Reach the debtor and trigger repayment confrontation."],
        ["Collection", "Secure debt payment or collateral without breaking mission constraints."],
        ["Ledger", "Log outcome and move to next collection marker."],
        ["Finish", "Report progress back into Strauss chain."],
      ]),
      createDetailedMission("money-lending-2", "Money Lending and Other Sins II", [
        ["Briefing", "Open second debt objective and route efficiently between targets."],
        ["Confrontation", "Pressure repayment and avoid letting the debtor escape."],
        ["Collection", "Take valid repayment item/money and close target objective."],
        ["Transition", "Return to Strauss workflow and unlock next debt task."],
        ["Finish", "Confirm collection entry updates in mission chain."],
      ]),
      createDetailedMission("money-lending-3", "Money Lending and Other Sins III", [
        ["Briefing", "Track final Chapter 2 Strauss debtor marker."],
        ["Approach", "Enter property and trigger confrontation scene."],
        ["Resolution", "Complete debt extraction conditions and avoid mission fail actions."],
        ["Exit", "Leave area safely and clear law/witness pressure if triggered."],
        ["Finish", "Report back and complete this stage of the debt chain."],
      ]),
      createDetailedMission("we-loved-once-1", "We Loved Once and True I", [
        ["Briefing", "Meet Mary in Valentine and trigger story conversation without delay."],
        ["Decision", "Accept the request branch to continue questline."],
        ["Travel", "Head to next marker and preserve route speed for cleaner completion."],
        ["Finish", "Lock chapter-one segment completion of Mary's request arc."],
      ]),
      createDetailedMission("we-loved-once-2", "We Loved Once and True II", [
        ["Briefing", "Locate Jamie and engage mission dialogue chain."],
        ["Pursuit", "Follow/track Jamie sequence without losing objective proximity."],
        ["Disarm", "Resolve confrontation safely and avoid fatal outcomes."],
        ["Escort", "Return with Jamie to close the rescue conversation."],
        ["Finish", "Complete end dialogue to secure mission success."],
      ]),
      createDetailedMission("we-loved-once-3", "We Loved Once and True III", [
        ["Briefing", "Meet Mary for final Chapter 2 follow-up scene."],
        ["Dialogue", "Complete conversation branch and maintain mission zone."],
        ["Outcome", "Lock in chosen response path and close the questline stage."],
        ["Finish", "Confirm mission clear and reward/state updates."],
      ]),
      createDetailedMission("good-honest-snake-oil", "Good, Honest, Snake Oil", [
        ["Briefing", "Take sheriff contract and head toward target search area."],
        ["Track", "Identify target route and close distance before escape starts."],
        ["Capture", "Lasso and hogtie the target while avoiding lethal takedowns."],
        ["Delivery", "Transport prisoner alive to sheriff drop-off point."],
        ["Finish", "Complete turn-in and claim bounty payout."],
      ]),
      createDetailedMission("paying-social-call", "Paying a Social Call", [
        ["Briefing", "Ride with Kieran to O'Driscoll location and trigger ambush entry."],
        ["Assault", "Clear the opening defenders from covered positions."],
        ["Interior Sweep", "Push through hideout sections and neutralize remaining hostiles."],
        ["Objective", "Secure site intel/supplies before retreating."],
        ["Finish", "Exit and regroup to complete mission report."],
      ]),
      createDetailedMission("quiet-time", "A Quiet Time", [
        ["Briefing", "Follow Lenny through Valentine and stay close during scripted beats."],
        ["Saloon Arc", "Complete interaction chain and avoid wandering outside mission flow."],
        ["Escalation", "Handle fight/chase transitions without objective loss."],
        ["Escape", "Break out during law response and find extraction route."],
        ["Finish", "Return route resolves after Arthur regains control and leaves town."],
      ]),
      createDetailedMission("blessed-are-the-meek", "Blessed are the Meek?", [
        ["Briefing", "Enter Strawberry and approach jail objective trigger."],
        ["Breakout", "Free Micah and move immediately when shootout begins."],
        ["Town Combat", "Use hard cover and clear rifle lines to survive high-pressure street fight."],
        ["Escape Route", "Push to mounted escape path and avoid extended exposure."],
        ["Finish", "Create distance from town and complete mission cooldown sequence."],
      ]),
      createDetailedMission("spines-of-america", "The Spines of America", [
        ["Briefing", "Ride with Hosea to Carmody Dell and observe stealth/theft setup."],
        ["Infiltration", "Enter property quietly and avoid unnecessary witness alerts."],
        ["Theft", "Secure stagecoach objective and leave property quickly."],
        ["Transit", "Deliver coach to fence while minimizing law attention."],
        ["Finish", "Complete sale and close mission with Hosea."],
      ]),
      createDetailedMission("pouring-forth-oil-1", "Pouring Forth Oil I", [
        ["Briefing", "Meet John and begin train robbery preparation chain."],
        ["Acquisition", "Steal first required wagon and avoid prolonged witness exposure."],
        ["Storage", "Move wagon to mission stash point and confirm objective completion."],
        ["Finish", "Return for follow-up prep mission unlock."],
      ]),
      createDetailedMission("pouring-forth-oil-2", "Pouring Forth Oil II", [
        ["Briefing", "Collect second prep objective and route toward wagon target."],
        ["Capture", "Secure transport asset and defend against pursuit if triggered."],
        ["Delivery", "Bring objective to designated staging location."],
        ["Finish", "Lock second prep completion for robbery chain progression."],
      ]),
      createDetailedMission("pouring-forth-oil-3", "Pouring Forth Oil III", [
        ["Briefing", "Move to rail setup point with gang and place operation trigger."],
        ["Setup", "Position blockade/charges exactly at marked location."],
        ["Hold", "Maintain combat readiness while waiting for train contact."],
        ["Finish", "Complete setup stage and transition into robbery finale."],
      ]),
      createDetailedMission("pouring-forth-oil-4", "Pouring Forth Oil IV", [
        ["Briefing", "Launch train robbery once stop condition is met."],
        ["Boarding", "Advance through train cars and neutralize armed defenders."],
        ["Loot", "Collect mission valuables and clear resistance pockets."],
        ["Escape", "Break contact and ride out through pursuit phase."],
        ["Finish", "Regroup with gang and complete robbery mission chain."],
      ]),
      createDetailedMission("fisher-of-men", "A Fisher of Men", [
        ["Briefing", "Take Jack to the fishing spot and complete equipment prompts."],
        ["Fishing", "Catch fish on cue and maintain mission interaction order."],
        ["Encounter", "Handle Pinkerton conversation branch without leaving objective zone."],
        ["Return", "Escort Jack safely back to camp."],
        ["Finish", "Close mission after camp handoff scene."],
      ]),
      createDetailedMission("american-pastoral", "An American Pastoral Scene", [
        ["Briefing", "Join Micah for stagecoach robbery route setup."],
        ["Ambush", "Trigger hold-up at correct point and control opening combat."],
        ["Pursuit", "Chase and eliminate pursuers before they overwhelm flank lanes."],
        ["Loot", "Secure objective payout and clear route."],
        ["Finish", "Return and finalize mission handoff."],
      ]),
      createDetailedMission("sheep-and-goats", "The Sheep and the Goats", [
        ["Briefing", "Herd sheep toward Valentine while keeping the flock on path."],
        ["Auction Phase", "Complete sale setup beats and monitor confrontation trigger."],
        ["Cornwall Fight", "Use storefront cover and clear armed threats quickly."],
        ["Town Escape", "Retreat with surviving gang members after firefight."],
        ["Finish", "Reach fallback position to complete mission."],
      ]),
      createDetailedMission("strange-kindness", "A Strange Kindness", [
        ["Briefing", "Meet Dutch and begin relocation after rising pressure in Valentine."],
        ["Transit", "Ride to new region and keep mission companions in range."],
        ["Setup", "Enter new camp area and complete placement triggers."],
        ["Finish", "Lock chapter transition into Clemens Point storyline."],
      ]),
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
