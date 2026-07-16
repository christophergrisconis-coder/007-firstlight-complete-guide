import { CHALLENGES, COLLECTIBLES, GAME, MISSIONS, QUESTS } from "./data.js";
import { getMissionProgress } from "./progress.js";

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const progressBar = (percent) => `
  <div class="meter" role="img" aria-label="${percent}% complete">
    <span style="width:${percent}%"></span>
  </div>
`;

const missionSidebar = (state) => {
  const rows = MISSIONS.map((mission) => {
    const p = getMissionProgress(state, mission);
    const isSelected = mission.id === state.view.selectedMissionId;
    return `
      <button class="mission-chip ${isSelected ? "is-selected" : ""}" data-action="select-mission" data-id="${mission.id}">
        <strong>${mission.order}. ${esc(mission.name)}</strong>
        <small>${p.percent}% • ${p.doneUnits}/${p.totalUnits}</small>
      </button>
    `;
  }).join("");

  return `
    <aside class="panel mission-sidebar">
      <h2>Missions</h2>
      <p>Canonical 18-mission list loaded from guide data, including segmented chapter missions where applicable.</p>
      <div class="mission-chip-list">${rows}</div>
    </aside>
  `;
};

const missionDetail = (state) => {
  const mission = MISSIONS.find((item) => item.id === state.view.selectedMissionId) || MISSIONS[0];
  const p = getMissionProgress(state, mission);
  const challenge = CHALLENGES.find((item) => item.missionId === mission.id);
  const missionQuests = QUESTS.filter((item) => item.missionId === mission.id);
  const missionCollectibles = COLLECTIBLES.filter((item) => item.missionId === mission.id);

  const walkthroughRows = mission.walkthrough
    .map(
      (step) => `
      <li>
        <strong>${esc(step.label)}</strong>
        <span>${esc(step.detail)}</span>
      </li>
    `
    )
    .join("");

  const checklistRows = mission.checklist
    .map(
      (step) => `
      <label>
        <input type="checkbox" data-action="toggle-checklist" data-id="${step.id}" ${
          state.missionChecklist[step.id] ? "checked" : ""
        }>
        <span>${esc(step.label)}</span>
      </label>
    `
    )
    .join("");

  const missionCollectibleRows = missionCollectibles
    .map(
      (item) => `
      <label class="collectible-inline">
        <input type="checkbox" data-action="toggle-collectible" data-id="${item.id}" ${
          state.collectibleFound[item.id] ? "checked" : ""
        }>
        <span>${esc(item.name)} <em>${esc(item.type)} - ${esc(item.checkpoint || "Checkpoint pending")}</em></span>
      </label>
    `
    )
    .join("");

  const questRows = missionQuests
    .map(
      (quest) => `
      <label>
        <input type="checkbox" data-action="toggle-quest" data-id="${quest.id}" ${
          state.questComplete[quest.id] ? "checked" : ""
        }>
        <span>${esc(quest.title)} <em>${esc(quest.type)}${
          quest.isPlaceholder ? " - placeholder" : ""
        }</em></span>
      </label>
    `
    )
    .join("");

  return `
    <section class="panel mission-detail">
      <div class="title-row">
        <h2>${mission.order}. ${esc(mission.name)}</h2>
        <div class="title-actions">
          <span class="pill">${p.percent}% complete</span>
          <button class="ghost-btn" data-action="copy-mission-plan" data-id="${mission.id}">Copy Mission Run Plan</button>
        </div>
      </div>
      ${progressBar(p.percent)}
      <div class="mission-meta">
        <span>Checklist: ${p.checklistDone}/${p.checklistTotal}</span>
        <span>Collectibles: ${p.collectibleDone}/${p.collectibleTotal}</span>
        <span>Quests: ${p.questDone}/${p.questTotal}</span>
        <span>Challenge: ${p.challengeDone ? "Done" : "Open"}</span>
      </div>

      <h3>Walkthrough Structure</h3>
      <ul class="walkthrough-list">${walkthroughRows}</ul>

      <h3>Mission Completion Checklist</h3>
      <div class="checklist-grid">${checklistRows}</div>

      <h3>Quest Checklist</h3>
      <div class="checklist-grid">${questRows}</div>

      <h3>Mission-linked Collectibles</h3>
      <div class="checklist-grid">${missionCollectibleRows || "<p>No linked collectibles in current seed.</p>"}</div>

      <h3>Challenge Support</h3>
      <label class="challenge-row">
        <input type="checkbox" data-action="toggle-challenge" data-id="${challenge?.id || ""}" ${
          challenge && state.challengeComplete[challenge.id] ? "checked" : ""
        } ${challenge ? "" : "disabled"}>
        <span>
          <strong>${esc(challenge?.title || "Challenge set pending")}</strong>
          <small>${esc(challenge?.description || "No challenge record.")}</small>
        </span>
      </label>
    </section>
  `;
};

const summaryBoard = (globalProgress) => {
  const typeRows = Object.entries(GAME.collectibleTotals)
    .map(([type, total]) => {
      const current = globalProgress.collectiblesByType[type] || 0;
      const percent = total ? Math.round((current / total) * 100) : 0;
      return `
        <article class="stat-card">
          <h4>${esc(type)}</h4>
          <p>${current}/${total}</p>
          ${progressBar(percent)}
        </article>
      `;
    })
    .join("");

  return `
    <section class="panel summary-board">
      <h2>Global 100% Tracker</h2>
      <div class="summary-top">
        <article class="hero-progress">
          <h3>${globalProgress.overallPercent}%</h3>
          <p>${globalProgress.unitsDone}/${globalProgress.unitsTotal} total completion units</p>
          ${progressBar(globalProgress.overallPercent)}
        </article>
        <article class="quick-facts">
          <p><strong>Missions:</strong> ${globalProgress.missionsCompleted}/${globalProgress.missionsTotal}</p>
          <p><strong>Quests:</strong> ${globalProgress.questsDone}/${globalProgress.questsTotal}</p>
          <p><strong>Collectibles:</strong> ${globalProgress.collectiblesDone}/${globalProgress.collectiblesTotal}</p>
          <p><strong>Challenges:</strong> ${globalProgress.challengesDone}/${globalProgress.challengesTotal}</p>
          <button data-action="reset-progress" class="ghost-btn">Reset Local Progress</button>
        </article>
      </div>
      <div class="type-grid">${typeRows}</div>
    </section>
  `;
};

const userAnalyticsPanel = (userTracker) => {
  const newUsers =
    typeof userTracker.newUsersTotal === "number"
      ? userTracker.newUsersTotal.toLocaleString()
      : "--";
  const pageViews =
    typeof userTracker.pageViewsTotal === "number"
      ? userTracker.pageViewsTotal.toLocaleString()
      : "--";
  const statusLabel = userTracker.loading
    ? "Loading"
    : userTracker.available
    ? "Live"
    : "Cached";

  return `
    <section class="panel analytics-panel">
      <div class="title-row">
        <h2>Website User Tracker</h2>
        <span class="pill">${esc(statusLabel)}</span>
      </div>
      <div class="analytics-grid">
        <article class="stat-card analytics-stat">
          <h4>New Users</h4>
          <p>${newUsers}</p>
        </article>
        <article class="stat-card analytics-stat">
          <h4>Total Visits</h4>
          <p>${pageViews}</p>
        </article>
      </div>
      <p class="analytics-note">${esc(userTracker.message || "")}</p>
      <p class="analytics-note">Visitor ID: ${esc(userTracker.visitorIdShort || "--")}</p>
    </section>
  `;
};

const collectiblesLookup = (state, filteredCollectibles) => {
  const typeOptions = ["All", ...Object.keys(GAME.collectibleTotals)]
    .map(
      (type) =>
        `<option value="${esc(type)}" ${state.view.collectibleType === type ? "selected" : ""}>${esc(type)}</option>`
    )
    .join("");

  const missionOptions = [
    '<option value="All">All Missions</option>',
    ...MISSIONS.map(
      (mission) =>
        `<option value="${mission.id}" ${
          mission.id === state.view.collectibleMission ? "selected" : ""
        }>${mission.order}. ${esc(mission.name)}</option>`
    ),
  ].join("");

  const rows = filteredCollectibles
    .map(
      (item) => `
      <tr>
        <td>
          <label>
            <input type="checkbox" data-action="toggle-collectible" data-id="${item.id}" ${
              state.collectibleFound[item.id] ? "checked" : ""
            }>
            <span>${esc(item.name)}</span>
          </label>
        </td>
        <td>${esc(item.type)}</td>
        <td>${esc(MISSIONS.find((m) => m.id === item.missionId)?.name || "Unknown")}</td>
        <td>${esc(item.checkpoint || "Pending")}</td>
        <td>${esc(item.locationHint)}</td>
        <td>${esc(item.routeNote || "Route note pending")}</td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="panel lookup-panel">
      <div class="title-row">
        <h2>Collectible Lookup</h2>
        <span class="pill">${filteredCollectibles.length} visible</span>
      </div>
      <div class="filters">
        <label>Type
          <select data-action="filter-type">${typeOptions}</select>
        </label>
        <label>Mission
          <select data-action="filter-mission">${missionOptions}</select>
        </label>
        <label>Search
          <input data-action="filter-search" type="search" placeholder="Search collectibles" value="${esc(
            state.view.collectibleSearch
          )}">
        </label>
        <label class="toggle-only">Found only
          <input data-action="filter-found-only" type="checkbox" ${
            state.view.collectibleShowFoundOnly ? "checked" : ""
          }>
        </label>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Mission</th>
              <th>Checkpoint</th>
              <th>Location Hint</th>
              <th>Route Note</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
};

const achievementsPanel = (achievementProgress) => {
  const rows = achievementProgress
    .map(
      (item) => `
      <article class="achievement ${item.unlocked ? "unlocked" : ""}">
        <header>
          <h4>${esc(item.title)}</h4>
          <span>${item.current}/${item.target}</span>
        </header>
        <p>${esc(item.description)}</p>
        ${progressBar(item.percent)}
      </article>
    `
    )
    .join("");

  return `
    <section class="panel achievement-panel">
      <h2>Achievements / Trophy Support</h2>
      <div class="achievement-grid">${rows}</div>
    </section>
  `;
};

const namedCollectibleIndex = () => {
  const groups = Object.keys(GAME.collectibleTotals)
    .map((type) => {
      const items = COLLECTIBLES.filter((item) => item.type === type)
        .map((item) => `<li>${esc(item.name)}</li>`)
        .join("");
      return `
        <article class="named-index-card">
          <h4>${esc(type)} (${COLLECTIBLES.filter((item) => item.type === type).length})</h4>
          <ul>${items}</ul>
        </article>
      `;
    })
    .join("");

  return `
    <section class="panel named-index-panel">
      <h2>Complete Named Collectible Index</h2>
      <p>This section renders all collectible records directly from data to confirm no item/intel entries are omitted.</p>
      <div class="named-index-grid">${groups}</div>
    </section>
  `;
};

const infoPanel = () => {
  const rules = GAME.completionRules.map((rule) => `<li>${esc(rule)}</li>`).join("");
  return `
    <section class="panel info-panel">
      <h2>Completion Logic Rules</h2>
      <ul>${rules}</ul>
      <p>All counters are generated from structured records in the data layer. Placeholder details are flagged in item records and mission walkthrough steps for future expansion.</p>
    </section>
  `;
};

const validationPanel = (validationIssues) => {
  if (!validationIssues.length) {
    return `
      <section class="panel info-panel">
        <h2>Data Integrity</h2>
        <p>Validation passed: mission and collectible totals match configured baseline records.</p>
      </section>
    `;
  }

  const issueRows = validationIssues.map((issue) => `<li>${esc(issue)}</li>`).join("");
  return `
    <section class="panel info-panel">
      <h2>Data Integrity</h2>
      <p>Validation issues detected:</p>
      <ul>${issueRows}</ul>
    </section>
  `;
};

export const renderApp = ({
  state,
  globalProgress,
  filteredCollectibles,
  achievementProgress,
  validationIssues,
  userTracker,
}) => {
  return `
    <header class="hero">
      <div>
        <p class="kicker">Data-Driven Companion</p>
        <h1>${esc(GAME.title)}</h1>
        <p>${esc(GAME.subtitle)}</p>
      </div>
      <div class="hero-badge">100% Ready</div>
    </header>

    ${summaryBoard(globalProgress)}
    ${userAnalyticsPanel(userTracker)}

    <section class="mission-layout">
      ${missionSidebar(state)}
      ${missionDetail(state)}
    </section>

    ${collectiblesLookup(state, filteredCollectibles)}
    ${namedCollectibleIndex()}
    ${achievementsPanel(achievementProgress)}
    ${infoPanel()}
    ${validationPanel(validationIssues)}
  `;
};
