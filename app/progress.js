import { ACHIEVEMENTS, CHALLENGES, COLLECTIBLES, GAME, MISSIONS, QUESTS } from "./data.js";

const toPercent = (value, total) => (total ? Math.round((value / total) * 1000) / 10 : 0);

export const getCollectibleCountsByType = (state) => {
  const counts = Object.keys(GAME.collectibleTotals).reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  COLLECTIBLES.forEach((item) => {
    if (state.collectibleFound[item.id]) {
      counts[item.type] += 1;
    }
  });

  return counts;
};

export const getMissionProgress = (state, mission) => {
  const checklistTotal = mission.checklist.length;
  const checklistDone = mission.checklist.filter((step) => state.missionChecklist[step.id]).length;

  const missionCollectibles = COLLECTIBLES.filter((item) => item.missionId === mission.id);
  const collectibleTotal = missionCollectibles.length;
  const collectibleDone = missionCollectibles.filter((item) => state.collectibleFound[item.id]).length;

  const challenge = CHALLENGES.find((item) => item.missionId === mission.id);
  const challengeDone = challenge ? Boolean(state.challengeComplete[challenge.id]) : false;

  const missionQuests = QUESTS.filter((item) => item.missionId === mission.id);
  const questTotal = missionQuests.length;
  const questDone = missionQuests.filter((item) => state.questComplete[item.id]).length;

  const totalUnits = checklistTotal + collectibleTotal + (challenge ? 1 : 0) + questTotal;
  const doneUnits = checklistDone + collectibleDone + (challengeDone ? 1 : 0) + questDone;

  return {
    checklistTotal,
    checklistDone,
    collectibleTotal,
    collectibleDone,
    questTotal,
    questDone,
    challengeDone,
    totalUnits,
    doneUnits,
    percent: toPercent(doneUnits, totalUnits),
  };
};

export const getGlobalProgress = (state) => {
  const missionCompletion = MISSIONS.reduce(
    (acc, mission) => {
      const p = getMissionProgress(state, mission);
      return {
        total: acc.total + p.totalUnits,
        done: acc.done + p.doneUnits,
      };
    },
    { total: 0, done: 0 }
  );

  const missionsCompleted = MISSIONS.filter((mission) =>
    mission.checklist.every((step) => state.missionChecklist[step.id])
  ).length;

  const collectibleTotal = COLLECTIBLES.length;
  const collectiblesDone = COLLECTIBLES.filter((item) => state.collectibleFound[item.id]).length;

  const challengesTotal = CHALLENGES.length;
  const challengesDone = CHALLENGES.filter((item) => state.challengeComplete[item.id]).length;

  const questsTotal = QUESTS.length;
  const questsDone = QUESTS.filter((item) => state.questComplete[item.id]).length;

  const collectiblesByType = getCollectibleCountsByType(state);

  return {
    unitsDone: missionCompletion.done,
    unitsTotal: missionCompletion.total,
    overallPercent: toPercent(missionCompletion.done, missionCompletion.total),
    missionsCompleted,
    missionsTotal: MISSIONS.length,
    collectiblesDone,
    collectiblesTotal: collectibleTotal,
    challengesDone,
    challengesTotal,
    questsDone,
    questsTotal,
    collectiblesByType,
  };
};

export const getAchievementProgress = (state, globalProgress) =>
  ACHIEVEMENTS.map((achievement) => {
    let current = 0;

    if (achievement.metricType === "missionsCompleted") {
      current = globalProgress.missionsCompleted;
    }

    if (achievement.metricType === "collectiblesTotal") {
      current = globalProgress.collectiblesDone;
    }

    if (achievement.metricType === "collectiblesByType") {
      current = globalProgress.collectiblesByType[achievement.metricKey] || 0;
    }

    if (achievement.metricType === "challengesCompleted") {
      current = globalProgress.challengesDone;
    }

    if (achievement.metricType === "questsCompleted") {
      current = globalProgress.questsDone;
    }

    return {
      ...achievement,
      current,
      percent: toPercent(current, achievement.target),
      unlocked: current >= achievement.target,
    };
  });

export const getFilteredCollectibles = (state) => {
  const search = state.view.collectibleSearch.trim().toLowerCase();

  return COLLECTIBLES.filter((item) => {
    const matchType =
      state.view.collectibleType === "All" || item.type === state.view.collectibleType;
    const matchMission =
      state.view.collectibleMission === "All" || item.missionId === state.view.collectibleMission;
    const matchSearch = !search || item.name.toLowerCase().includes(search);
    const matchFound = !state.view.collectibleShowFoundOnly || state.collectibleFound[item.id];

    return matchType && matchMission && matchSearch && matchFound;
  });
};
