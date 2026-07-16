import { SITE_CONFIG } from "./site-config.js";
import { assertSupabase } from "./supabase-client.js";

const form = document.querySelector("#subscribe-form");
const statusText = document.querySelector("#subscribe-status");
const proCheckout = document.querySelector("#pro-checkout-link");

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

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let supabase;
    try {
      supabase = assertSupabase();
    } catch (error) {
      statusText.textContent = error.message;
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
