import { SITE_CONFIG } from "./site-config.js";
import { assertSupabase } from "./supabase-client.js";

const form = document.querySelector("#missing-report-form");
const statusText = document.querySelector("#missing-report-status");

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

    const email = document.querySelector("#missing-report-email").value.trim();
    const pageUrl = document.querySelector("#missing-report-page").value.trim();
    const details = document.querySelector("#missing-report-details").value.trim();

    if (!details) {
      statusText.textContent = "Please enter missing information details.";
      return;
    }

    statusText.textContent = "Submitting report...";

    const { error } = await supabase.from("missing_reports").insert({
      reporter_email: email || null,
      page_url: pageUrl || null,
      details,
    });

    if (error) {
      statusText.textContent = error.message;
      return;
    }

    const fn = SITE_CONFIG.edgeFunctions?.missingReportNotifier;
    if (fn) {
      try {
        await supabase.functions.invoke(fn, {
          body: { reporter_email: email || null, page_url: pageUrl || null, details },
        });
      } catch {
        // Optional notifier function may not exist yet.
      }
    }

    statusText.textContent = "Submitted. Thank you for helping improve the guides.";
    form.reset();
  });
}
