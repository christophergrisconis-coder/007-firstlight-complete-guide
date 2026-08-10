import { GAMES } from "./games-data.js";
import { IMPORTED_GUIDES } from "./guide-imports.js";
import { supabase } from "./supabase-client.js";
import { getAccessState } from "./access.js";
import { applyInSiteGate } from "./content-gate.js";

const params = new URLSearchParams(location.search);
const gameId = params.get("game") || "";

const state = {
  game: null,
  quests: [],
  userId: null,
};

const escapeHtml = (val) =>
  String(val ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildQuests = (game) => {
  const imported = IMPORTED_GUIDES[game.id] || null;
  const list = [];

  if (imported?.walkthrough?.length) {
    imported.walkthrough.forEach((item, idx) => {
      const parts = String(item).split(":");
      const title = parts.length > 1 ? parts.shift().trim() : `Quest ${idx + 1}`;
      const summary = parts.join(":").trim() || String(item);
      list.push({
        id: `${game.id}-q-${idx + 1}`,
        title,
        summary,
        steps: summary ? [summary] : ["Complete quest objectives and advance main story."],
      });
    });
  }

  if (!list.length && Array.isArray(game.guideSections)) {
    game.guideSections.forEach((section, idx) => {
      const parts = String(section).split(":");
      const title = parts.length > 1 ? parts.shift().trim() : `Section ${idx + 1}`;
      const summary = parts.join(":").trim() || String(section);
      list.push({
        id: `${game.id}-sec-${idx + 1}`,
        title,
        summary,
        steps: [summary],
      });
    });
  }

  return list;
};

const updateProgressMetrics = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-guide-ck]');
  let count = 0;
  checkboxes.forEach((ck) => {
    if (localStorage.getItem(ck.id) === "true") {
      ck.checked = true;
      count++;
    }
  });

  const total = checkboxes.length;
  const pct = total ? Math.round((count / total) * 100) : 0;

  const totalPctNode = document.getElementById("totalPct");
  const totalCountNode = document.getElementById("totalCount");
  const totalBarNode = document.getElementById("totalBar");
  const overviewPctNode = document.getElementById("overview-pct");
  const questsPctNode = document.getElementById("quests-pct");

  if (totalPctNode) totalPctNode.textContent = `${pct}%`;
  if (totalCountNode) totalCountNode.textContent = `${count} / ${total}`;
  if (totalBarNode) totalBarNode.style.width = `${pct}%`;
  if (overviewPctNode) overviewPctNode.textContent = `${pct}%`;
  if (questsPctNode) questsPctNode.textContent = `${pct}%`;

  // Per card percentage calculation
  document.querySelectorAll("[data-card]").forEach((card) => {
    const cardCks = card.querySelectorAll('input[type="checkbox"]');
    let cardChecked = 0;
    cardCks.forEach((c) => {
      if (c.checked) cardChecked++;
    });
    const cardTotal = cardCks.length;
    const cardPct = cardTotal ? Math.round((cardChecked / cardTotal) * 100) : 0;

    const cpctNode = card.querySelector(".cpct");
    const cbarNode = card.querySelector("[data-cbar]");

    if (cpctNode) {
      cpctNode.textContent = `${cardChecked}/${cardTotal} (${cardPct}%)`;
      if (cardPct === 100 && cardTotal > 0) cpctNode.classList.add("done");
      else cpctNode.classList.remove("done");
    }
    if (cbarNode) {
      cbarNode.style.width = `${cardPct}%`;
      if (cardPct === 100) cbarNode.classList.add("full");
      else cbarNode.classList.remove("full");
    }
  });
};

window._ck = async (ck) => {
  localStorage.setItem(ck.id, ck.checked);
  updateProgressMetrics();

  if (supabase && state.userId && state.game) {
    await supabase.from("quest_progress").upsert(
      {
        user_id: state.userId,
        game_id: state.game.id,
        quest_id: ck.id,
        completed: ck.checked,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,game_id,quest_id" }
    );
  }
};

window.toggleSteps = (id, btn) => {
  const stepsEl = document.getElementById(id);
  if (!stepsEl) return;
  stepsEl.classList.toggle("open");
  const isOpen = stepsEl.classList.contains("open");
  btn.textContent = isOpen ? "▲ Hide Steps" : "▼ How to complete";
};

window.filterGuideRows = (term) => {
  const q = String(term || "").toLowerCase().trim();
  document.querySelectorAll(".row").forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? "" : "none";
  });
};

const renderCards = () => {
  const container = document.getElementById("dynamic-cards-container");
  if (!container) return;

  if (!state.quests.length) {
    container.innerHTML = `<div class="sec-note">No detailed walkthrough steps found for this guide.</div>`;
    return;
  }

  container.innerHTML = state.quests
    .map((quest, index) => {
      const stepItems = quest.steps
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join("");

      return `
        <div class="card open" data-card>
          <div class="card-hd" onclick="this.closest('[data-card]').classList.toggle('open');updateProgressMetrics()">
            <span class="chev">▶</span>
            <h3>${escapeHtml(quest.title)}</h3>
            <span class="cpct">0/1 (0%)</span>
          </div>
          <div class="mini-bar"><i data-cbar></i></div>
          <div class="card-bd">
            <div class="row">
              <input type="checkbox" id="${quest.id}" data-guide-ck onchange="_ck(this)">
              <div class="row-top">
                <label for="${quest.id}">
                  <b>${escapeHtml(quest.title)}</b>
                  <span class="tag trophy">Walkthrough</span>
                  <small>${escapeHtml(quest.summary)}</small>
                </label>
                <button class="steps-toggle" onclick="toggleSteps('st-${quest.id}',this)">▼ How to complete</button>
              </div>
              <div class="quest-steps" id="st-${quest.id}">
                <ol class="steps-list">${stepItems}</ol>
                <div class="step-reward">🏆 Checklist Step Completed</div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
};

const setupControls = () => {
  const expandBtn = document.getElementById("btnExpand");
  const collapseBtn = document.getElementById("btnCollapse");
  const resetBtn = document.getElementById("btnReset");

  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll("[data-card]").forEach((c) => c.classList.add("open"));
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll("[data-card]").forEach((c) => c.classList.remove("open"));
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all progress for this guide?")) {
        document.querySelectorAll('input[type="checkbox"][data-guide-ck]').forEach((ck) => {
          ck.checked = false;
          localStorage.removeItem(ck.id);
        });
        updateProgressMetrics();
      }
    });
  }
};

const init = async () => {
  const game = GAMES.find((g) => g.id === gameId);
  if (!game) {
    document.getElementById("guide-main-title").textContent = "Guide Not Found";
    return;
  }

  state.game = game;
  state.quests = buildQuests(game);

  // Set header & title nodes
  const titleNode = document.getElementById("guide-main-title");
  const subtitleNode = document.getElementById("guide-main-subtitle");
  const footerTitleNode = document.getElementById("footer-game-title");

  if (titleNode) titleNode.textContent = game.title;
  if (subtitleNode) subtitleNode.textContent = `${game.genre.join(" • ")} • ${game.releaseWindow}`;
  if (footerTitleNode) footerTitleNode.textContent = `${game.title} — 100% Completion Guide`;

  // Apply content gate
  const accessState = await getAccessState();
  applyInSiteGate(state.quests, (visibleQuests) => {
    state.quests = visibleQuests;
    renderCards();
    setupControls();
    updateProgressMetrics();
  }, accessState);

  // Load account progress if signed in
  if (supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      state.userId = session.user.id;
      const { data } = await supabase
        .from("quest_progress")
        .select("quest_id,completed")
        .eq("user_id", state.userId)
        .eq("game_id", state.game.id);

      for (const row of data || []) {
        if (row.completed) {
          localStorage.setItem(row.quest_id, "true");
        }
      }
      updateProgressMetrics();
    }
  }
};

init();
