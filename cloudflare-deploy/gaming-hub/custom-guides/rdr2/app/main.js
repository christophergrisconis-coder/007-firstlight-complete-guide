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
      createDetailedMission("new-south", "The New South", [
        ["Briefing", "Patrol with Dutch and Hosea around Rhodes and stay near mission companions."],
        ["Law Contact", "Respond to deputy interactions and complete basic law-assist beats."],
        ["Prisoner Event", "Handle the prisoner incident without leaving objective radius."],
        ["Ride Back", "Return with the group and complete all route dialogue triggers."],
        ["Finish", "Close patrol report and lock chapter progression."],
      ]),
      createDetailedMission("female-suffrage", "Further Questions of Female Suffrage", [
        ["Briefing", "Ride with Sadie and collect campaign material objective."],
        ["Distribution", "Deliver posters/flyers at all designated town points."],
        ["Interruption", "Handle NPC hostility without abandoning mission path."],
        ["Withdrawal", "Regroup and leave town once route objectives are complete."],
        ["Finish", "Complete return flow and close mission state cleanly."],
      ]),
      createDetailedMission("american-distillation", "American Distillation", [
        ["Briefing", "Meet Dutch at the operation point and prepare long-range loadout."],
        ["Infiltration", "Approach moonshine site quietly until attack trigger starts."],
        ["Assault", "Destroy stills and clear armed defenders from cover positions."],
        ["Pressure", "Respond to counterattack waves and keep allies alive."],
        ["Escape", "Leave before law presence stacks into extended chase."],
        ["Finish", "Reach safe exit and conclude mission debrief."],
      ]),
      createDetailedMission("honest-mistake", "An Honest Mistake", [
        ["Briefing", "Join robbery setup and move with gang to interception point."],
        ["Opening", "Secure coach objective and control first firefight quickly."],
        ["Ambush", "Fall back to hard cover when the counter-ambush hits."],
        ["Breakout", "Create an escape lane and extract surviving crew."],
        ["Finish", "Return to camp route and complete recovery dialogue."],
      ]),
      createDetailedMission("horse-flesh", "Horse Flesh for Dinner", [
        ["Briefing", "Meet horse-theft crew and ride to Braithwaite paddock."],
        ["Stealth Entry", "Enter ranch quietly and tag required horse targets."],
        ["Theft", "Mount stolen horses and avoid alerting full estate response."],
        ["Delivery", "Ride horses to buyer marker without losing group coherence."],
        ["Finish", "Complete sale interaction and close mission payout."],
      ]),
      createDetailedMission("fine-joys", "The Fine Joys of Tobacco", [
        ["Briefing", "Travel with Sean and establish sabotage route across Gray fields."],
        ["Ignition", "Burn designated tobacco wagons and crop zones in objective order."],
        ["Crossfire", "Use field structures for cover as enemies converge."],
        ["Retreat", "Escape estate perimeter before being pinned by reinforcements."],
        ["Finish", "Reach extraction point and complete mission cooldown."],
      ]),
      createDetailedMission("magicians", "Magicians for Sport", [
        ["Briefing", "Meet objective contact and ride to Trelawny's last known location."],
        ["Investigation", "Inspect clues and confirm captor site."],
        ["Rescue", "Eliminate captors and free Trelawny under fire."],
        ["Extraction", "Escort Trelawny out and prevent pursuit collapse."],
        ["Finish", "Return route conversation resolves mission completion."],
      ]),
      createDetailedMission("friends-low-places", "Friends in Very Low Places", [
        ["Briefing", "Meet Trelawny in Rhodes and follow con-operation instructions."],
        ["Setup", "Complete carriage and disguise/social beats in correct sequence."],
        ["Execution", "Keep conversation flow stable and avoid early exposure."],
        ["Exit", "Leave objective zone after successful setup phase."],
        ["Finish", "Close mission with post-con debrief."],
      ]),
      createDetailedMission("sodom", "Sodom? Back to Gomorrah", [
        ["Briefing", "Enter Valentine bank job with full gang and assign positions."],
        ["Control", "Secure lobby and maintain civilian control during vault sequence."],
        ["Vault", "Complete safe-crack objective and collect mission cash."],
        ["Shootout", "Fight through law response while rotating between storefront cover."],
        ["Escape", "Break town perimeter and regroup with remaining crew."],
        ["Finish", "Reach extraction route and complete mission."],
      ]),
      createDetailedMission("advertising-1", "Advertising, the New American Art I", [
        ["Briefing", "Meet mission partner and prepare distraction wagon route."],
        ["Placement", "Deliver product payload to designated town targets."],
        ["Interference", "Handle interruptions without losing wagon objective."],
        ["Finish", "Complete first distribution circuit and report back."],
      ]),
      createDetailedMission("advertising-2", "Advertising, the New American Art II", [
        ["Briefing", "Start second distribution run and follow updated marker path."],
        ["Delivery", "Complete remaining placement points in required order."],
        ["Counterattack", "Defend wagon route when ambush pressure begins."],
        ["Finish", "Return to mission giver and close the two-part arc."],
      ]),
      createDetailedMission("preaching", "Preaching Forgiveness as He Went", [
        ["Briefing", "Join gang assault and move to first defensive line."],
        ["Advance", "Clear outer enemies and push compound in stages."],
        ["Interior Fight", "Use close-cover entries and clear room-to-room threats."],
        ["Objective", "Complete target objective and secure exit lane."],
        ["Finish", "Regroup with gang and resolve aftermath dialogue."],
      ]),
      createDetailedMission("blood-feuds", "Blood Feuds, Ancient and Modern", [
        ["Briefing", "Ride with full gang toward Braithwaite Manor assault."],
        ["Front Assault", "Break main defenders and force entry into manor grounds."],
        ["Sweep", "Clear interior and courtyard zones while protecting allies."],
        ["Intel", "Secure Jack lead during post-assault search sequence."],
        ["Exit", "Withdraw from manor and transition to next mission chain."],
        ["Finish", "Complete ride-out and chapter-state update."],
      ]),
      createDetailedMission("battle-of-shady-belle", "The Battle of Shady Belle", [
        ["Briefing", "Travel to Shady Belle and begin camp-capture operation."],
        ["Assault", "Eliminate perimeter defenders and push into the mansion."],
        ["Stabilize", "Clear remaining resistance pockets before setup phase."],
        ["Securing", "Trigger camp relocation interactions and assign positions."],
        ["Finish", "Complete relocation scene and lock new camp state."],
      ]),
    ],
  },
  {
    id: "chapter-4",
    title: "Chapter 4 Mission Steps",
    missions: [
      createDetailedMission("joys-of-civilization", "The Joys of Civilization", [
        ["Briefing", "Enter Saint Denis with Dutch and keep formation through the city gate sequence."],
        ["City Orientation", "Follow the route through streets, plazas, and key landmarks without breaking escort flow."],
        ["Objective", "Collect the required city information and complete the dialogue beats in order."],
        ["Pressure", "Handle any unwanted attention by staying in cover and moving with the gang."],
        ["Finish", "Return with Dutch and trigger the chapter's urban setup state."],
      ]),
      createDetailedMission("angelo-bronte", "Angelo Bronte, a Man of Honor", [
        ["Briefing", "Meet Bronte at his mansion and complete the social introduction cleanly."],
        ["Conversation", "Follow the mansion dialogue path and wait for each prompt to finish before moving."],
        ["Assignment", "Accept Bronte's request and move to the next required city objective."],
        ["Travel", "Leave the mansion without causing unnecessary conflict or route deviation."],
        ["Finish", "Return to Dutch and complete the Bronte introduction chain."],
      ]),
      createDetailedMission("no-no-thrice", "No, No and Thrice, No", [
        ["Briefing", "Take the Tilly rescue lead and move to the abduction location."],
        ["Chase", "Track captors through the city and keep the trail active."],
        ["Contact", "Break into the rescue scene and neutralize the abductors quickly."],
        ["Escort", "Keep Tilly safe while leaving the danger area."],
        ["Finish", "Return her to camp and complete the rescue arc."],
      ]),
      createDetailedMission("gilded-cage", "The Gilded Cage", [
        ["Briefing", "Attend the mayor's party and stay in character during the introduction."],
        ["Gather Intel", "Move through the rooms and collect the social clues the mission requires."],
        ["Maintain Cover", "Avoid suspicious behavior and follow Dutch's cues carefully."],
        ["Exit", "Leave the party once the objective chain is satisfied."],
        ["Finish", "Complete the mission without blowing the gang's cover."],
      ]),
      createDetailedMission("fine-night", "A Fine Night of Debauchery", [
        ["Briefing", "Board the riverboat and move into the high-society operation."],
        ["Card Room", "Complete the casino-floor con steps and stay aligned with Dutch."],
        ["Escalation", "React when the operation turns violent and keep moving with the group."],
        ["Escape", "Fight toward the exit route and leave the boat with the crew."],
        ["Finish", "Complete the getaway and close the riverboat job."],
      ]),
      createDetailedMission("american-fathers-1", "American Fathers I", [
        ["Briefing", "Meet the Wapiti contact and enter the first support sequence."],
        ["Conversation", "Complete dialogue beats without walking away from the mission area."],
        ["Support", "Follow the escort or assist step exactly as instructed by the objective text."],
        ["Finish", "Return from the meeting and confirm the first support task is done."],
      ]),
      createDetailedMission("american-fathers-2", "American Fathers II", [
        ["Briefing", "Continue the Wapiti thread and move to the next conflict zone."],
        ["Combat", "Clear enemy resistance while staying near the intended route."],
        ["Protection", "Keep allies alive and maintain pressure on the objective target."],
        ["Finish", "Close the second support mission and return to the story line."],
      ]),
      createDetailedMission("horsemen-apocalypses", "Horsemen, Apocalypses", [
        ["Briefing", "Defend the streets of Saint Denis and prepare for the retreat sequence."],
        ["Breakout", "Hold off the first wave and keep the escape route open."],
        ["Escort", "Ride out with the gang and protect anyone who falls behind."],
        ["Pressure", "Use hard cover to survive the pursuit phase through the city exits."],
        ["Finish", "Reach the safe point and resolve the chapter's major setback."],
      ]),
      createDetailedMission("urban-pleasures", "Urban Pleasures", [
        ["Briefing", "Enter the trolley robbery setup and follow the urban route plan."],
        ["Approach", "Move with the crew and trigger the robbery at the marked point."],
        ["Crash", "Recover after the derailment and immediately control the combat space."],
        ["Escape", "Push through law pressure and exit the city block."],
        ["Finish", "Complete the robbery aftermath and regroup with the gang."],
      ]),
      createDetailedMission("country-pursuits", "Country Pursuits", [
        ["Briefing", "Track Bronte through the bayou and keep to the mission path."],
        ["Boat Phase", "Operate the boat section and stay on the intended water route."],
        ["Foot Phase", "Continue the pursuit on foot and avoid losing the target trail."],
        ["Capture", "Complete the pursuit's end objective and secure the lead."],
        ["Finish", "Exit the swamp route and close the bayou sequence."],
      ]),
      createDetailedMission("revenge-dish", "Revenge is a Dish Best Eaten", [
        ["Briefing", "Move on Bronte's estate and prepare for the assault."],
        ["Entry", "Force entry through the manor defenses and keep the line moving."],
        ["Search", "Clear the interior and secure Bronte once the objective appears."],
        ["Finish", "Leave the estate and complete the confrontation scene."],
      ]),
      createDetailedMission("banking-old-art", "Banking, the Old American Art", [
        ["Briefing", "Take your assigned role in the Saint Denis bank robbery and hold formation."],
        ["Vault", "Complete the vault objective and keep civilians controlled."],
        ["Pursuit", "Break out of the bank and fight through the street response."],
        ["Escape", "Ride the escape route under extreme law pressure."],
        ["Finish", "Survive the fallout and complete the chapter break point."],
      ]),
    ],
  },
  {
    id: "chapter-5",
    title: "Chapter 5 Mission Steps",
    missions: [
      createDetailedMission("welcome-new-world", "Welcome to the New World", [
        ["Briefing", "Wake up after the shipwreck and move with the survivors to the first safe position."],
        ["Recovery", "Follow the path through the new island area and keep the group together."],
        ["Orientation", "Complete the opening Guarma setup prompts and stay within mission bounds."],
        ["Finish", "Reach the temporary camp state and lock the chapter's new environment."],
      ]),
      createDetailedMission("savagery-unleashed", "Savagery Unleashed", [
        ["Briefing", "Track Javier's captivity lead and prepare for a short-range rescue push."],
        ["Entry", "Break through the guard line and move fast before the situation escalates."],
        ["Rescue", "Free Javier and protect him while moving to the exit route."],
        ["Finish", "Return to cover and complete the escape from the holding area."],
      ]),
      createDetailedMission("kind-benevolent-despot", "A Kind and Benevolent Despot", [
        ["Briefing", "Join the local rebel operation and move to the strike point."],
        ["Objective", "Sabotage the marked enemy targets in the order the mission presents them."],
        ["Defense", "Hold off hostile pressure while rebels finish their side of the operation."],
        ["Finish", "Return to allies once the strike sequence clears."],
      ]),
      createDetailedMission("hell-hath-no-fury", "Hell Hath No Fury", [
        ["Briefing", "Take position for the shoreline assault and prepare artillery support."],
        ["Defense", "Use the cannon or weapon prompts to stop the incoming attack."],
        ["Pressure", "Keep enemies off the shoreline and avoid leaving the objective area."],
        ["Finish", "Finish the defensive push and regroup after the battle."],
      ]),
      createDetailedMission("paradise-departed", "Paradise Mercifully Departed", [
        ["Briefing", "Move to the final Guarma objective and follow the escape route briefing."],
        ["Push", "Advance through hostile territory and keep moving toward extraction."],
        ["Withdrawal", "Break contact once the mission asks for the retreat sequence."],
        ["Finish", "Board the return route to the mainland and complete the chapter exit."],
      ]),
    ],
  },
  {
    id: "chapter-6",
    title: "Chapter 6 Mission Steps",
    missions: [
      createDetailedMission("dear-uncle-tacitus", "Dear Uncle Tacitus", [
        ["Briefing", "Ride through dangerous country and follow the search route toward the new hideout."],
        ["Approach", "Stay with the gang while the map search sequence resolves."],
        ["Arrival", "Trigger the camp reunion scene and stabilize the group."],
        ["Finish", "Complete the new hideout setup and chapter transition."],
      ]),
      createDetailedMission("fleeting-joy", "Fleeting Joy", [
        ["Briefing", "Defend Lakay and hold your assigned position when the attack begins."],
        ["Defense", "Clear the first wave before it overruns the camp entrance."],
        ["Retreat", "Fall back with the gang once the mission calls for evacuation."],
        ["Finish", "Escort survivors out and complete the escape sequence."],
      ]),
      createDetailedMission("murfree-country", "That's Murfree Country", [
        ["Briefing", "Lead survivors through the hostile swamp and avoid splitting the wagon route."],
        ["Ambushes", "Repel Murfree attacks while keeping the wagon alive."],
        ["Escort", "Push through the route with the survivors still protected."],
        ["Finish", "Reach camp and finish the escort chapter beat."],
      ]),
      createDetailedMission("icarus-and-friends", "Icarus and Friends", [
        ["Briefing", "Launch the balloon sequence and climb to recon height."],
        ["Recon", "Track the prison route from above and memorize the target path."],
        ["Landing", "Bring the balloon down without breaking the mission flow."],
        ["Finish", "Report the findings and lock the recon data."],
      ]),
      createDetailedMission("visiting-hours", "Visiting Hours", [
        ["Briefing", "Approach the prison perimeter and stay near the mission boat/route."],
        ["Entry", "Break into the prison objective and move fast through the compound."],
        ["Rescue", "Free John and cover the breakout as alarms escalate."],
        ["Escape", "Get back to water and leave before the search tightens."],
        ["Finish", "Complete the extraction and return flow."],
      ]),
      createDetailedMission("social-call", "Just a Social Call", [
        ["Briefing", "Join Sadie and move to the enemy hideout without wandering off-route."],
        ["Assault", "Clear the compound room by room and keep pressure on hostiles."],
        ["Intel", "Recover the lead or evidence the mission asks for."],
        ["Finish", "Leave the area and finish the cleanup sequence."],
      ]),
      createDetailedMission("rage-unleashed", "A Rage Unleashed", [
        ["Briefing", "Support Rains Fall and Eagle Flies at the start of the route."],
        ["Destroy", "Hit the military targets and keep allies moving forward."],
        ["Pressure", "Stay alive under heavy fire and continue the assault path."],
        ["Finish", "Withdraw once the mission asks for the retreat phase."],
      ]),
      createDetailedMission("delights-van-horn", "The Delights of Van Horn", [
        ["Briefing", "Confront the traitor lead in Van Horn and stay ready for a chase."],
        ["Pursuit", "Track the target through the harbor or town escape route."],
        ["Capture", "Secure the objective once the mission pins the target down."],
        ["Finish", "Return the result to camp and close the hunt."],
      ]),
      createDetailedMission("goodbye-dear-friend", "Goodbye, Dear Friend", [
        ["Briefing", "Support Sadie and move into the prisoner-transfer sequence."],
        ["Ambush", "React to the interruption and protect the convoy."],
        ["Escape", "Keep Sadie alive and continue the route to safety."],
        ["Finish", "Complete the aftermath scene once the danger clears."],
      ]),
      createDetailedMission("favored-sons", "Favored Sons", [
        ["Briefing", "Ride to the mountain defense point with the Wapiti allies."],
        ["Defense", "Hold the ridge line and focus on the nearest threats first."],
        ["Pressure", "Stop the soldiers from breaking the defensive line."],
        ["Finish", "Withdraw with allies after the fight resolves."],
      ]),
      createDetailedMission("kings-son", "The King's Son", [
        ["Briefing", "Approach Fort Wallace and prepare for the rescue run."],
        ["Entry", "Move in carefully and avoid unnecessary alert triggers."],
        ["Rescue", "Free Eagle Flies and start the exit immediately."],
        ["Finish", "Escape the fort and complete the rescue arc."],
      ]),
      createDetailedMission("my-last-boy", "My Last Boy", [
        ["Briefing", "Join Dutch and move into the assault operation."],
        ["Battle", "Advance through the attack and stay with the main force."],
        ["Collapse", "React when the plan falls apart and protect whoever remains."],
        ["Finish", "Regroup and complete the emotional aftermath scene."],
      ]),
      createDetailedMission("our-best-selves", "Our Best Selves", [
        ["Briefing", "Prepare the final train robbery and assign your route role."],
        ["Execution", "Push the robbery plan through Pinkerton pressure."],
        ["Escape", "Ride the extraction route without breaking formation."],
        ["Finish", "Reach temporary safety and close the final setup mission."],
      ]),
      createDetailedMission("red-dead-redemption", "Red Dead Redemption", [
        ["Briefing", "Return for the final camp confrontation and protect the gang's escape."],
        ["Last Stand", "Fight through the final resistance and keep moving forward."],
        ["Exit", "Break out of the final area with enough momentum to finish the arc."],
        ["Finish", "Complete Arthur's ending path and lock the chapter conclusion."],
      ]),
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
