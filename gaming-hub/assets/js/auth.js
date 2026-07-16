import { assertSupabase, getRedirectTo } from "./supabase-client.js";

const page = document.body.dataset.page;
const supabase = (() => {
  try {
    return assertSupabase();
  } catch (error) {
    const target = document.querySelector("#signin-status") || document.querySelector("#signup-status");
    if (target) {
      target.textContent = error.message;
    }
    return null;
  }
})();

const setText = (selector, text) => {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = text;
  }
};

const oauthSignIn = async (provider) => {
  if (!supabase) {
    return;
  }
  const redirectTo = `${getRedirectTo()}/pages/signin.html`;
  const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  if (error) {
    throw error;
  }
};

const wireSignIn = () => {
  const form = document.querySelector("#signin-form");
  const google = document.querySelector("#signin-google");
  const apple = document.querySelector("#signin-apple");
  if (!form || !google || !apple || !supabase) {
    return;
  }

  google.addEventListener("click", async () => {
    try {
      await oauthSignIn("google");
    } catch (error) {
      setText("#signin-status", error.message);
    }
  });

  apple.addEventListener("click", async () => {
    try {
      await oauthSignIn("apple");
    } catch (error) {
      setText("#signin-status", error.message);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#signin-email").value;
    const password = document.querySelector("#signin-password").value;

    setText("#signin-status", "Signing in...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setText("#signin-status", error.message);
      return;
    }

    setText("#signin-status", "Signed in. Redirecting...");
    setTimeout(() => {
      location.href = "../index.html";
    }, 600);
  });
};

const wireSignUp = () => {
  const form = document.querySelector("#signup-form");
  const google = document.querySelector("#signup-google");
  const apple = document.querySelector("#signup-apple");
  if (!form || !google || !apple || !supabase) {
    return;
  }

  google.addEventListener("click", async () => {
    try {
      await oauthSignIn("google");
    } catch (error) {
      setText("#signup-status", error.message);
    }
  });

  apple.addEventListener("click", async () => {
    try {
      await oauthSignIn("apple");
    } catch (error) {
      setText("#signup-status", error.message);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#signup-name").value.trim();
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    setText("#signup-status", "Creating account...");

    const redirectTo = `${getRedirectTo()}/pages/signin.html`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: { display_name: name },
      },
    });

    if (error) {
      setText("#signup-status", error.message);
      return;
    }

    if (data.user && !data.session) {
      setText("#signup-status", "Check your email to confirm your account. Your 3-day trial starts after activation.");
      return;
    }

    setText("#signup-status", "Account created. Your 3-day trial is active. Redirecting...");
    setTimeout(() => {
      location.href = "../index.html";
    }, 700);
  });
};

if (page === "signin") {
  wireSignIn();
}
if (page === "signup") {
  wireSignUp();
}
