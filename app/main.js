import { CHALLENGES, COLLECTIBLES, DATA_VALIDATION, GAME, MISSIONS, QUESTS } from "./data.js";
import {
  getAchievementProgress,
  getFilteredCollectibles,
  getGlobalProgress,
} from "./progress.js";
import { fetchUserTracker, getInitialUserTracker } from "./analytics.js";
import { getBackgroundSet } from "./backgrounds.js";
import { loadState, resetState, saveState } from "./store.js";
import { renderApp } from "./ui.js";

const root = document.querySelector("#app");

if (!root) {
  throw new Error("App root #app was not found.");
}

const getValidationIssues = () => {
  const issues = [];

  if (DATA_VALIDATION.missionCount !== GAME.missionTotal) {
    issues.push(
      `Mission count mismatch: expected ${GAME.missionTotal}, got ${DATA_VALIDATION.missionCount}`
    );
  }

  if (DATA_VALIDATION.questCount !== QUESTS.length) {
    issues.push(`Quest count mismatch: expected ${QUESTS.length}, got ${DATA_VALIDATION.questCount}`);
  }

  const expectedCollectibleTotal = Object.values(GAME.collectibleTotals).reduce(
    (sum, value) => sum + value,
    0
  );

  if (DATA_VALIDATION.collectibleCount !== expectedCollectibleTotal) {
    issues.push(
      `Collectible count mismatch: expected ${expectedCollectibleTotal}, got ${DATA_VALIDATION.collectibleCount}`
    );
  }

  Object.entries(GAME.collectibleTotals).forEach(([type, expected]) => {
    const actual = DATA_VALIDATION.collectibleByType[type] || 0;
    if (actual !== expected) {
      issues.push(`${type} mismatch: expected ${expected}, got ${actual}`);
    }
  });

  return issues;
};

const validationIssues = getValidationIssues();

let state = loadState();
let userTracker = getInitialUserTracker();

if (!MISSIONS.some((mission) => mission.id === state.view.selectedMissionId)) {
  state.view.selectedMissionId = MISSIONS[0].id;
}

const render = () => {
  const globalProgress = getGlobalProgress(state);
  const filteredCollectibles = getFilteredCollectibles(state);
  const achievementProgress = getAchievementProgress(state, globalProgress);
  const backgroundSet = getBackgroundSet(state.view.selectedMissionId);

  document.documentElement.style.setProperty(
    "--mission-bg-image",
    backgroundSet.mission ? `url('${backgroundSet.mission}')` : "none"
  );
  document.documentElement.style.setProperty(
    "--summary-bg-image",
    backgroundSet.summary ? `url('${backgroundSet.summary}')` : "none"
  );
  document.documentElement.style.setProperty(
    "--missions-bg-image",
    backgroundSet.missions ? `url('${backgroundSet.missions}')` : "none"
  );
  document.documentElement.style.setProperty(
    "--lookup-bg-image",
    backgroundSet.lookup ? `url('${backgroundSet.lookup}')` : "none"
  );
  document.documentElement.style.setProperty(
    "--achievements-bg-image",
    backgroundSet.achievements ? `url('${backgroundSet.achievements}')` : "none"
  );
  document.documentElement.style.setProperty(
    "--data-bg-image",
    backgroundSet.data ? `url('${backgroundSet.data}')` : "none"
  );

  root.innerHTML = renderApp({
    state,
    globalProgress,
    filteredCollectibles,
    achievementProgress,
    validationIssues,
    userTracker,
  });
};

const refreshUserTracker = async () => {
  userTracker = await fetchUserTracker();
  render();
};

const checkbox = (done) => (done ? "[x]" : "[ ]");

const buildMissionRunPlan = (missionId) => {
  const mission = MISSIONS.find((item) => item.id === missionId);
  if (!mission) {
    return "Mission not found.";
  }

  const missionQuests = QUESTS.filter((item) => item.missionId === mission.id);
  const missionCollectibles = COLLECTIBLES.filter((item) => item.missionId === mission.id);
  const challenge = CHALLENGES.find((item) => item.missionId === mission.id);

  const lines = [];
  lines.push(`007 First Light - Mission Run Plan`);
  lines.push(`${mission.order}. ${mission.name}`);
  lines.push("");
  lines.push("Mission Checklist");
  mission.checklist.forEach((step) => {
    lines.push(`${checkbox(Boolean(state.missionChecklist[step.id]))} ${step.label}`);
  });

  lines.push("");
  lines.push("Quest Checklist");
  missionQuests.forEach((quest) => {
    lines.push(`${checkbox(Boolean(state.questComplete[quest.id]))} ${quest.title} (${quest.type})`);
  });

  lines.push("");
  lines.push("Collectibles");
  missionCollectibles.forEach((item) => {
    lines.push(
      `${checkbox(Boolean(state.collectibleFound[item.id]))} ${item.name} [${item.type}] - ${
        item.checkpoint || "Checkpoint pending"
      }`
    );
    lines.push(`  Route: ${item.routeNote || "Route note pending"}`);
  });

  lines.push("");
  lines.push("Challenge");
  if (challenge) {
    lines.push(`${checkbox(Boolean(state.challengeComplete[challenge.id]))} ${challenge.title}`);
    lines.push(`  ${challenge.description}`);
  } else {
    lines.push("[ ] Challenge record pending");
  }

  return lines.join("\n");
};

const copyText = async (text) => {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const fallback = document.createElement("textarea");
  fallback.value = text;
  fallback.setAttribute("readonly", "true");
  fallback.style.position = "absolute";
  fallback.style.left = "-9999px";
  document.body.appendChild(fallback);
  fallback.select();
  document.execCommand("copy");
  document.body.removeChild(fallback);
};

const update = (mutator) => {
  mutator();
  saveState(state);
  render();
};

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.getAttribute("data-action");

  if (action === "toggle-checklist") {
    const id = target.getAttribute("data-id");
    update(() => {
      state.missionChecklist[id] = target.checked;
    });
  }

  if (action === "toggle-collectible") {
    const id = target.getAttribute("data-id");
    update(() => {
      state.collectibleFound[id] = target.checked;
    });
  }

  if (action === "toggle-quest") {
    const id = target.getAttribute("data-id");
    update(() => {
      state.questComplete[id] = target.checked;
    });
  }

  if (action === "toggle-challenge") {
    const id = target.getAttribute("data-id");
    if (!id) {
      return;
    }
    update(() => {
      state.challengeComplete[id] = target.checked;
    });
  }

  if (action === "filter-type") {
    update(() => {
      state.view.collectibleType = target.value;
    });
  }

  if (action === "filter-mission") {
    update(() => {
      state.view.collectibleMission = target.value;
    });
  }

  if (action === "filter-search") {
    update(() => {
      state.view.collectibleSearch = target.value;
    });
  }

  if (action === "filter-found-only") {
    update(() => {
      state.view.collectibleShowFoundOnly = target.checked;
    });
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  if (target.getAttribute("data-action") !== "filter-search") {
    return;
  }

  update(() => {
    state.view.collectibleSearch = target.value;
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest("[data-action]");
  if (!(button instanceof HTMLElement)) {
    return;
  }

  const action = button.getAttribute("data-action");

  if (action === "select-mission") {
    const id = button.getAttribute("data-id");
    if (!id) {
      return;
    }
    update(() => {
      state.view.selectedMissionId = id;
    });
  }

  if (action === "reset-progress") {
    state = resetState();
    state.view.selectedMissionId = MISSIONS[0].id;
    saveState(state);
    render();
  }

  if (action === "copy-mission-plan") {
    const id = button.getAttribute("data-id") || state.view.selectedMissionId;
    const planText = buildMissionRunPlan(id);
    const originalLabel = button.textContent;

    copyText(planText)
      .then(() => {
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = originalLabel;
        }, 1200);
      })
      .catch(() => {
        button.textContent = "Copy failed";
        setTimeout(() => {
          button.textContent = originalLabel;
        }, 1400);
      });
  }
});

render();
refreshUserTracker();
