const missionBackgrounds = {
  m01: "./assets/backgrounds/missions/m01.jpg",
  m02: "./assets/backgrounds/missions/m02.jpg",
  m03: "./assets/backgrounds/missions/m03.jpg",
  m04: "./assets/backgrounds/missions/m04.jpg",
  m05: "./assets/backgrounds/missions/m05.jpg",
  m06: "./assets/backgrounds/missions/m06.jpg",
  m07: "./assets/backgrounds/missions/m07.jpg",
  m08: "./assets/backgrounds/missions/m08.jpg",
  m09: "./assets/backgrounds/missions/m09.jpg",
  m10: "./assets/backgrounds/missions/m10.jpg",
  m11: "./assets/backgrounds/missions/m11.jpg",
  m12: "./assets/backgrounds/missions/m12.jpg",
  m13: "./assets/backgrounds/missions/m13.jpg",
  m14: "./assets/backgrounds/missions/m14.jpg",
  m15: "./assets/backgrounds/missions/m15.jpg",
  m16: "./assets/backgrounds/missions/m16.jpg",
  m17: "./assets/backgrounds/missions/m17.jpg",
  m18: "./assets/backgrounds/missions/m18.jpg",
};

const pageBackgrounds = {
  summary: "./assets/backgrounds/pages/summary.jpg",
  missions: "./assets/backgrounds/pages/missions.jpg",
  lookup: "./assets/backgrounds/pages/lookup.jpg",
  achievements: "./assets/backgrounds/pages/achievements.jpg",
  data: "./assets/backgrounds/pages/data.jpg",
};

export const getBackgroundSet = (missionId) => ({
  mission: missionBackgrounds[missionId] || null,
  summary: pageBackgrounds.summary,
  missions: pageBackgrounds.missions,
  lookup: pageBackgrounds.lookup,
  achievements: pageBackgrounds.achievements,
  data: pageBackgrounds.data,
});
