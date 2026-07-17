const OFFICIAL = "https://cms.ioi.dk/media";

const missionBackgrounds = {
  m01: `${OFFICIAL}/nr0lnjh0/iceland-web-01.jpg`,
  m02: `${OFFICIAL}/yvofo3kg/malta-1.jpg`,
  m03: `${OFFICIAL}/l0ojppas/chess-tournament-web.jpg`,
  m04: `${OFFICIAL}/szxhuulh/kensington2-web.jpg`,
  m05: `${OFFICIAL}/dlllcyig/aleph_web_01.jpg`,
  m06: `${OFFICIAL}/44onuj3p/vietnam-web-01.jpg`,
  m07: `${OFFICIAL}/ssyjkqyb/antarctica-web-01.jpg`,
  m08: `${OFFICIAL}/m4lprnj4/007fl_gala_screenshot_web.jpg`,
  m09: `${OFFICIAL}/ulefjrtr/bond-screenshot_no-letterbox_v2.jpg`,
  m10: `${OFFICIAL}/gnqdntwe/feature_trailer_image.jpg`,
  m11: `${OFFICIAL}/0aml3en0/007firstlight_alt_newrender_keyart_16x9_1920x1080_web.jpg`,
  m12: `${OFFICIAL}/nqxjdhx5/007fl_titlesequence_keyart_16x9_1920x1080.jpg`,
  m13: `${OFFICIAL}/ffkm2ngt/16x9_v2-1080p.jpg`,
  m14: `${OFFICIAL}/oxdfojs0/007fl_dimitri_vegas_keyvisual_clean_16x9_3840px.jpg`,
  m15: `${OFFICIAL}/sdkdjfzw/007fl_lanadelrey_clean_16x9_web_1920x1080.jpg`,
  m16: `${OFFICIAL}/rnravgag/bond-closeup-web2.jpg`,
  m17: `${OFFICIAL}/1h3j5sad/thumbnail_launch_trailer_16x9_1920x1080.jpg`,
  m18: `${OFFICIAL}/g1dpifwq/thumbnail_iceland_trailer_1x1.jpg`,
};

const pageBackgrounds = {
  summary: `${OFFICIAL}/mhiniewk/key-art-accolades-web-01.jpg`,
  missions: `${OFFICIAL}/trgnchlr/007fl_seo-get-now.jpg`,
  lookup: `${OFFICIAL}/50hbvwsn/game-pillar-2-web.jpg`,
  achievements: `${OFFICIAL}/gnqdntwe/feature_trailer_image.jpg`,
  data: `${OFFICIAL}/vhghmsa1/ep_02-martin-emborg_web.jpg`,
};

export const getBackgroundSet = (missionId) => ({
  mission: missionBackgrounds[missionId] || null,
  summary: pageBackgrounds.summary,
  missions: pageBackgrounds.missions,
  lookup: pageBackgrounds.lookup,
  achievements: pageBackgrounds.achievements,
  data: pageBackgrounds.data,
});
