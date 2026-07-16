import { GAMES } from "./games-data.js";
import { IMPORTED_GUIDES, QUEST_REPO_LINKS } from "./guide-imports.js";
import { supabase } from "./supabase-client.js";

let FULL_IMPORTED_SECTIONS = {};

const titleNode = document.querySelector("#guide-title");
const descriptionNode = document.querySelector("#guide-description");
const metaNode = document.querySelector("#guide-meta");
const accessNote = document.querySelector("#guide-access-note");
const questListNode = document.querySelector("#quest-list");
const questTitleNode = document.querySelector("#quest-title");
const questSummaryNode = document.querySelector("#quest-summary");
const questCustomShell = document.querySelector("#quest-custom-shell");
const questCustomLink = document.querySelector("#quest-custom-link");
const questTextShell = document.querySelector("#quest-text-shell");
const questStepsNode = document.querySelector("#quest-steps");
const questOutcomeNode = document.querySelector("#quest-outcome");
const questMediaNode = document.querySelector("#quest-media");
const questSaveNote = document.querySelector("#quest-save-note");
const questProgressNote = document.querySelector("#quest-progress-note");
const questPrevButton = document.querySelector("#quest-prev");
const questNextButton = document.querySelector("#quest-next");
const stepPrevButton = document.querySelector("#step-prev");
const stepNextButton = document.querySelector("#step-next");
const toggleCompleteButton = document.querySelector("#quest-toggle-complete");
const toggleExpandButton = document.querySelector("#quest-toggle-expand");

const params = new URLSearchParams(location.search);
const gameId = params.get("game") || "";

const state = {
  game: null,
  quests: [],
  selectedQuestIndex: 0,
  progressByQuest: {},
  userId: null,
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const defaultProgress = () => ({
  completed: false,
  currentStep: 0,
  isExpanded: true,
});

const getProgress = (questId) => {
  if (!state.progressByQuest[questId]) {
    state.progressByQuest[questId] = defaultProgress();
  }
  return state.progressByQuest[questId];
};

const parseWalkthroughItem = (item, index) => {
  const value = String(item || "").trim();
  if (!value) {
    return {
      id: `q-${index + 1}`,
      title: `Quest ${index + 1}`,
      summary: "",
      steps: [],
      outcome: "",
      githubRepoUrl: null,
    };
  }

  const parts = value.split(":");
  if (parts.length > 1) {
    const title = parts.shift().trim();
    const summary = parts.join(":").trim();
    return {
      id: `q-${index + 1}-${slugify(title)}`,
      title,
      summary,
      steps: [summary],
      outcome: "",
      githubRepoUrl: null,
    };
  }

  return {
    id: `q-${index + 1}-${slugify(value)}`,
    title: `Quest ${index + 1}`,
    summary: value,
    steps: [value],
    outcome: "",
    githubRepoUrl: null,
  };
};

const getQuestRepoUrl = (gameKey, questTitle) => {
  const gameLinks = QUEST_REPO_LINKS[gameKey] || null;
  if (!gameLinks) {
    return null;
  }
  return gameLinks[questTitle] || gameLinks["*"] || null;
};

const buildQuestModel = (game) => {
  const importedGuide = IMPORTED_GUIDES[game.id] || null;
  const fullSections = FULL_IMPORTED_SECTIONS[game.id] || [];
  const quests = [];

  if (fullSections.length) {
    for (const section of fullSections) {
      if (Array.isArray(section.entries) && section.entries.length) {
        for (const entry of section.entries) {
          const title = entry.title || section.title || "Quest";
          quests.push({
            id: `q-${slugify(title)}-${quests.length + 1}`,
            title,
            summary: entry.summary || "",
            steps: Array.isArray(entry.steps) ? entry.steps : [],
            outcome: entry.outcome || "",
            githubRepoUrl: getQuestRepoUrl(game.id, title),
          });
        }
      } else if (Array.isArray(section.items) && section.items.length) {
        const title = section.title || `Quest ${quests.length + 1}`;
        quests.push({
          id: `q-${slugify(title)}-${quests.length + 1}`,
          title,
          summary: `Detailed checklist for ${title}.`,
          steps: section.items,
          outcome: "",
          githubRepoUrl: getQuestRepoUrl(game.id, title),
        });
      }
    }
  }

  if (!quests.length && importedGuide?.walkthrough?.length) {
    importedGuide.walkthrough.forEach((item, index) => {
      const quest = parseWalkthroughItem(item, index);
      quest.githubRepoUrl = getQuestRepoUrl(game.id, quest.title);
      quests.push(quest);
    });
  }

  if (!quests.length && Array.isArray(game.guideSections)) {
    game.guideSections.forEach((item, index) => {
      const quest = parseWalkthroughItem(item, index);
      quest.githubRepoUrl = getQuestRepoUrl(game.id, quest.title);
      quests.push(quest);
    });
  }

  return {
    quests,
    sources: importedGuide?.githubDataSources || [],
  };
};

const renderNotFound = () => {
  if (titleNode) {
    titleNode.textContent = "Guide not found";
  }
  if (descriptionNode) {
    descriptionNode.textContent = "This guide could not be loaded. Return to Games and try another title.";
  }
  if (metaNode) {
    metaNode.innerHTML = "";
  }
  if (questListNode) {
    questListNode.innerHTML = "";
  }
  if (questTextShell) {
    questTextShell.classList.add("hidden");
  }
  if (questCustomShell) {
    questCustomShell.classList.add("hidden");
  }
};

const renderMeta = (game) => {
  if (!metaNode) {
    return;
  }
  metaNode.innerHTML = `
    <p><strong>Genre:</strong> ${escapeHtml(game.genre.join(", "))}</p>
    <p><strong>Platform:</strong> ${escapeHtml(game.platform.join(", "))}</p>
    <p><strong>Status:</strong> ${escapeHtml(game.releaseWindow)}</p>
  `;
};

const renderQuestList = () => {
  if (!questListNode) {
    return;
  }

  questListNode.innerHTML = state.quests
    .map((quest, index) => {
      const progress = getProgress(quest.id);
      const selected = index === state.selectedQuestIndex;
      const completionBadge = progress.completed ? "Completed" : "In Progress";
      const styleClass = progress.completed ? "quest-item-complete" : "quest-item-open";
      return `
        <button class="quest-item ${styleClass}${selected ? " quest-item-selected" : ""}" data-quest-index="${index}" type="button">
          <span>${escapeHtml(quest.title)}</span>
          <span class="quest-item-badge">${completionBadge}</span>
        </button>
      `;
    })
    .join("");
};

const updateQuestNavigationButtons = () => {
  if (questPrevButton) {
    questPrevButton.disabled = state.selectedQuestIndex <= 0;
  }
  if (questNextButton) {
    questNextButton.disabled = state.selectedQuestIndex >= state.quests.length - 1;
  }
};

const renderQuestDetail = () => {
  const quest = state.quests[state.selectedQuestIndex];
  if (!quest) {
    return;
  }

  const progress = getProgress(quest.id);
  const stepCount = quest.steps.length;
  const currentStep = Math.min(progress.currentStep, Math.max(0, stepCount - 1));
  progress.currentStep = currentStep;

  if (questTitleNode) {
    questTitleNode.textContent = quest.title;
  }
  if (questSummaryNode) {
    questSummaryNode.textContent = quest.summary || "Detailed quest breakdown with full steps and context.";
  }

  if (quest.githubRepoUrl) {
    if (questCustomShell) {
      questCustomShell.classList.remove("hidden");
    }
    if (questCustomLink) {
      questCustomLink.href = quest.githubRepoUrl;
    }
    if (questTextShell) {
      questTextShell.classList.add("hidden");
    }
    if (questProgressNote) {
      questProgressNote.textContent = "";
    }
    return;
  }

  if (questCustomShell) {
    questCustomShell.classList.add("hidden");
  }
  if (questTextShell) {
    questTextShell.classList.remove("hidden");
  }

  if (questStepsNode) {
    if (!progress.isExpanded) {
      questStepsNode.innerHTML = "";
    } else {
      questStepsNode.innerHTML = quest.steps
        .map((step, index) => {
          const isCurrent = index === currentStep;
          return `<li class="${isCurrent ? "quest-step-current" : ""}">${escapeHtml(step)}</li>`;
        })
        .join("");
    }
  }

  if (questOutcomeNode) {
    questOutcomeNode.textContent = quest.outcome ? `Outcome: ${quest.outcome}` : "";
  }

  if (questMediaNode) {
    const importedGuide = IMPORTED_GUIDES[state.game.id] || null;
    const sources = importedGuide?.githubDataSources || [];
    questMediaNode.innerHTML = sources.length
      ? sources.map((source) => `<li><a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a></li>`).join("")
      : "<li>No external source links provided for this quest.</li>";
  }

  if (toggleCompleteButton) {
    toggleCompleteButton.textContent = progress.completed ? "Mark Incomplete" : "Mark Complete";
  }

  if (toggleExpandButton) {
    toggleExpandButton.textContent = progress.isExpanded ? "Collapse Sections" : "Expand Sections";
  }

  if (stepPrevButton) {
    stepPrevButton.disabled = currentStep <= 0;
  }
  if (stepNextButton) {
    stepNextButton.disabled = currentStep >= stepCount - 1;
  }

  if (questProgressNote) {
    const total = Math.max(1, stepCount);
    questProgressNote.textContent = `Step ${currentStep + 1} of ${total}${progress.completed ? " • Quest completed" : ""}`;
  }
};

const saveQuestProgress = async (questId) => {
  if (!supabase || !state.userId || !state.game) {
    return;
  }

  const progress = getProgress(questId);
  const { error } = await supabase.from("quest_progress").upsert(
    {
      user_id: state.userId,
      game_id: state.game.id,
      quest_id: questId,
      completed: progress.completed,
      current_step: progress.currentStep,
      is_expanded: progress.isExpanded,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,game_id,quest_id",
    }
  );

  if (error && questSaveNote) {
    questSaveNote.textContent = `Progress save failed: ${error.message}`;
  }
};

const loadQuestProgress = async () => {
  if (!supabase || !state.userId || !state.game) {
    if (questSaveNote) {
      questSaveNote.textContent = "Sign in to save quest progress to your account across devices.";
    }
    return;
  }

  const { data, error } = await supabase
    .from("quest_progress")
    .select("quest_id,completed,current_step,is_expanded")
    .eq("user_id", state.userId)
    .eq("game_id", state.game.id);

  if (error) {
    if (questSaveNote) {
      questSaveNote.textContent = `Unable to load account progress: ${error.message}`;
    }
    return;
  }

  for (const row of data || []) {
    state.progressByQuest[row.quest_id] = {
      completed: Boolean(row.completed),
      currentStep: Number.isFinite(row.current_step) ? Number(row.current_step) : 0,
      isExpanded: row.is_expanded !== false,
    };
  }

  if (questSaveNote) {
    questSaveNote.textContent = "Quest progress is linked to your signed-in account.";
  }
};

const persistAndRefresh = async (questId) => {
  await saveQuestProgress(questId);
  renderQuestList();
  renderQuestDetail();
};

const wireEvents = () => {
  if (questListNode) {
    questListNode.addEventListener("click", (event) => {
      const target = event.target.closest("[data-quest-index]");
      if (!target) {
        return;
      }
      const nextIndex = Number.parseInt(target.getAttribute("data-quest-index") || "0", 10);
      if (!Number.isFinite(nextIndex)) {
        return;
      }
      state.selectedQuestIndex = Math.max(0, Math.min(nextIndex, state.quests.length - 1));
      updateQuestNavigationButtons();
      renderQuestList();
      renderQuestDetail();
    });
  }

  if (questPrevButton) {
    questPrevButton.addEventListener("click", () => {
      if (state.selectedQuestIndex <= 0) {
        return;
      }
      state.selectedQuestIndex -= 1;
      updateQuestNavigationButtons();
      renderQuestList();
      renderQuestDetail();
    });
  }

  if (questNextButton) {
    questNextButton.addEventListener("click", () => {
      if (state.selectedQuestIndex >= state.quests.length - 1) {
        return;
      }
      state.selectedQuestIndex += 1;
      updateQuestNavigationButtons();
      renderQuestList();
      renderQuestDetail();
    });
  }

  if (stepPrevButton) {
    stepPrevButton.addEventListener("click", async () => {
      const quest = state.quests[state.selectedQuestIndex];
      if (!quest || quest.githubRepoUrl) {
        return;
      }
      const progress = getProgress(quest.id);
      progress.currentStep = Math.max(0, progress.currentStep - 1);
      await persistAndRefresh(quest.id);
    });
  }

  if (stepNextButton) {
    stepNextButton.addEventListener("click", async () => {
      const quest = state.quests[state.selectedQuestIndex];
      if (!quest || quest.githubRepoUrl) {
        return;
      }
      const progress = getProgress(quest.id);
      progress.currentStep = Math.min(Math.max(0, quest.steps.length - 1), progress.currentStep + 1);
      await persistAndRefresh(quest.id);
    });
  }

  if (toggleCompleteButton) {
    toggleCompleteButton.addEventListener("click", async () => {
      const quest = state.quests[state.selectedQuestIndex];
      if (!quest || quest.githubRepoUrl) {
        return;
      }
      const progress = getProgress(quest.id);
      progress.completed = !progress.completed;
      await persistAndRefresh(quest.id);
    });
  }

  if (toggleExpandButton) {
    toggleExpandButton.addEventListener("click", async () => {
      const quest = state.quests[state.selectedQuestIndex];
      if (!quest || quest.githubRepoUrl) {
        return;
      }
      const progress = getProgress(quest.id);
      progress.isExpanded = !progress.isExpanded;
      await persistAndRefresh(quest.id);
    });
  }
};

const init = async () => {
  const game = GAMES.find((item) => item.id === gameId);
  if (!game) {
    renderNotFound();
    return;
  }

  state.game = game;
  const questModel = buildQuestModel(game);
  state.quests = questModel.quests;

  if (!state.quests.length) {
    renderNotFound();
    return;
  }

  if (titleNode) {
    titleNode.textContent = game.title;
  }
  if (descriptionNode) {
    descriptionNode.textContent = game.description;
  }
  if (accessNote) {
    accessNote.textContent = "If a quest has a hosted custom dashboard, this page opens that dedicated experience instead of text fallback.";
  }

  renderMeta(game);

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    state.userId = session?.user?.id || null;
  }

  await loadQuestProgress();
  wireEvents();
  updateQuestNavigationButtons();
  renderQuestList();
  renderQuestDetail();
};

init();
