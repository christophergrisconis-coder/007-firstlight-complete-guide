import { HERO_IMAGE_MANIFEST } from "./image-manifest.js";
import { assertSupabase } from "./supabase-client.js";

const hero = document.querySelector("#home-hero");

const renderRegistrationPanel = async () => {
  if (!hero) {
    return;
  }

  const panel = document.createElement("section");
  panel.className = "hero-stats";
  panel.innerHTML = `
    <p class="eyebrow">Community</p>
    <h2>Registered Players</h2>
    <p id="registration-count">Loading...</p>
    <p class="hero-note">Live count from Supabase profiles table.</p>
  `;

  hero.querySelector(".hero-content")?.appendChild(panel);

  try {
    const supabase = assertSupabase();
    const { data, error } = await supabase
      .from("registration_metrics")
      .select("registration_count")
      .single();

    if (error) {
      throw error;
    }

    const value = Number(data?.registration_count || 0);
    panel.querySelector("#registration-count").textContent = String(value);
  } catch (error) {
    panel.querySelector("#registration-count").textContent = "Configure Supabase";
    console.info(error.message);
  }
};

const getHeroFrames = () => {
  const approved = HERO_IMAGE_MANIFEST.filter((item) => item.approvedUrl);
  if (!approved.length) {
    return [
      { approvedUrl: "", title: "Fallback Frame 1" },
      { approvedUrl: "", title: "Fallback Frame 2" },
      { approvedUrl: "", title: "Fallback Frame 3" },
    ];
  }
  return approved;
};

const startHeroRotation = () => {
  if (!hero) {
    return;
  }

  const frames = getHeroFrames();
  let idx = 0;

  const applyFrame = () => {
    const frame = frames[idx];
    if (frame.approvedUrl) {
      hero.style.backgroundImage = `linear-gradient(rgba(8, 12, 16, 0.58), rgba(8, 12, 16, 0.76)), url('${frame.approvedUrl}')`;
    } else {
      hero.style.backgroundImage = "linear-gradient(125deg, #0f171e 0%, #1a2731 56%, #263746 100%)";
    }
  };

  applyFrame();
  setInterval(() => {
    idx = (idx + 1) % frames.length;
    hero.classList.add("fade-out");
    setTimeout(() => {
      applyFrame();
      hero.classList.remove("fade-out");
    }, 260);
  }, 4500);
};

startHeroRotation();
renderRegistrationPanel();
