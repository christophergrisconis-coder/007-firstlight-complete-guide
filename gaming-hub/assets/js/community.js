import { supabase } from "./supabase-client.js";

const form = document.querySelector("#community-form");
const statusNode = document.querySelector("#community-status");
const list = document.querySelector("#community-list");
const empty = document.querySelector("#community-empty");

const STORAGE_KEY = "arcadia-community-posts";
const MAX_ITEMS = 100;

const blockedPatterns = [
  /(https?:\/\/|www\.)/i,
  /discord\.gg|t\.me|bit\.ly|tinyurl|linktr\.ee/i,
  /buy now|promo code|discount|sale|limited offer|shop now/i,
  /merch|merchandise|store|etsy|amazon|ebay/i,
  /guide\s*website|other\s*guide|competitor/i,
];

const sanitize = (value) => String(value || "").trim();

const isBlocked = (text) => blockedPatterns.some((re) => re.test(text));

const readLocal = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocal = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
};

const card = (item) => `
  <article class="panel community-item">
    <header>
      <strong>${item.name}</strong>
      <span class="form-note">${new Date(item.createdAt).toLocaleString()}</span>
    </header>
    <p>${item.message}</p>
  </article>
`;

const render = (items) => {
  if (!list || !empty) {
    return;
  }

  if (!items.length) {
    list.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  list.innerHTML = items.map(card).join("");
};

const loadPosts = async () => {
  if (supabase) {
    const { data } = await supabase
      .from("community_posts")
      .select("display_name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (Array.isArray(data) && data.length) {
      render(
        data.map((row) => ({
          name: row.display_name,
          message: row.message,
          createdAt: row.created_at,
        }))
      );
      return;
    }
  }

  render(readLocal());
};

const setStatus = (text) => {
  if (statusNode) {
    statusNode.textContent = text;
  }
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = sanitize(document.querySelector("#community-name")?.value);
  const message = sanitize(document.querySelector("#community-message")?.value);

  if (!name || !message) {
    setStatus("Name and message are required.");
    return;
  }

  if (isBlocked(message)) {
    setStatus("Post blocked: no ads, promo links, external guide links, or merchandise promotions allowed.");
    return;
  }

  const item = {
    name: name.slice(0, 40),
    message: message.slice(0, 500),
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    const { error } = await supabase.from("community_posts").insert({
      display_name: item.name,
      message: item.message,
    });

    if (!error) {
      setStatus("Posted.");
      form.reset();
      await loadPosts();
      return;
    }
  }

  const current = readLocal();
  current.unshift(item);
  writeLocal(current);
  render(current);
  setStatus("Posted.");
  form.reset();
});

loadPosts();
