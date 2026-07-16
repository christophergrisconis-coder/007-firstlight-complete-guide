const STORAGE_KEY = "first-light-guide-state-v1";

const defaultState = {
  missionChecklist: {},
  questComplete: {},
  collectibleFound: {},
  challengeComplete: {},
  view: {
    selectedMissionId: "m01",
    collectibleType: "All",
    collectibleSearch: "",
    collectibleMission: "All",
    collectibleShowFoundOnly: false,
  },
};

const mergeState = (saved) => ({
  ...defaultState,
  ...saved,
  missionChecklist: { ...defaultState.missionChecklist, ...(saved?.missionChecklist || {}) },
  questComplete: { ...defaultState.questComplete, ...(saved?.questComplete || {}) },
  collectibleFound: { ...defaultState.collectibleFound, ...(saved?.collectibleFound || {}) },
  challengeComplete: { ...defaultState.challengeComplete, ...(saved?.challengeComplete || {}) },
  view: { ...defaultState.view, ...(saved?.view || {}) },
});

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(defaultState);
    }
    return mergeState(JSON.parse(raw));
  } catch {
    return structuredClone(defaultState);
  }
};

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetState = () => {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(defaultState);
};
