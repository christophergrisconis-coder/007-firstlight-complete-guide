import { assertSupabase } from "./supabase-client.js";

const form = document.querySelector("#subscribe-form");
const statusText = document.querySelector("#subscribe-status");

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
