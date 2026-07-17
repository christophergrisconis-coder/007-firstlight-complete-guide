import { SITE_CONFIG } from "./site-config.js";
import { assertSupabase } from "./supabase-client.js?v=20260716";

const LOCAL_SUBSCRIBER_QUEUE_KEY = "arcadia_local_subscriber_queue_v1";

const queueLocalSubscription = (entry) => {
  const raw = localStorage.getItem(LOCAL_SUBSCRIBER_QUEUE_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const deduped = list.filter((item) => item.email !== entry.email);
  deduped.push(entry);
  localStorage.setItem(LOCAL_SUBSCRIBER_QUEUE_KEY, JSON.stringify(deduped));
};

const form = document.querySelector("#subscribe-form");
const statusText = document.querySelector("#subscribe-status");
const proCheckout = document.querySelector("#pro-checkout-link");
const annualCheckout = document.querySelector("#pro-checkout-annual-link");

if (proCheckout) {
  const url = SITE_CONFIG.paymentLinks.monthlyProCheckoutUrl;
  if (url) {
    proCheckout.href = url;
    proCheckout.target = "_blank";
    proCheckout.rel = "noopener noreferrer";
  } else {
    proCheckout.setAttribute("aria-disabled", "true");
    proCheckout.classList.add("btn-disabled");
  }
}

if (annualCheckout) {
  const annualUrl = SITE_CONFIG.paymentLinks.annualProCheckoutUrl;
  if (annualUrl) {
    annualCheckout.href = annualUrl;
    annualCheckout.target = "_blank";
    annualCheckout.rel = "noopener noreferrer";
  } else {
    annualCheckout.setAttribute("aria-disabled", "true");
    annualCheckout.classList.add("btn-disabled");
  }
}

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let supabase;
    try {
      supabase = assertSupabase();
    } catch (error) {
      const email = document.querySelector("#subscriber-email").value.trim();
      const consent = document.querySelector("#subscriber-consent").value === "true";
      if (email) {
        queueLocalSubscription({
          email,
          consent,
          createdAt: new Date().toISOString(),
          source: "local-fallback",
        });
        statusText.textContent =
          "Supabase is not configured yet. Your request was saved locally on this device.";
        form.reset();
      } else {
        statusText.textContent = error.message;
      }
      return;
    }

    const email = document.querySelector("#subscriber-email").value.trim();
    const consent = document.querySelector("#subscriber-consent").value === "true";

    statusText.textContent = "Saving subscription...";

    const { error } = await supabase.from("subscribers").upsert(
      {
        email,
        consent,
      },
      { onConflict: "email" }
    );

    if (error) {
      statusText.textContent = error.message;
      return;
    }

    statusText.textContent = "Subscription saved. Connect email provider next (Resend or MailerLite).";
    form.reset();
  });
}
