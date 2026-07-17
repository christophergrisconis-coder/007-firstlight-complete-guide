import { SITE_CONFIG } from "./site-config.js";

const setLink = (id, href) => {
  const node = document.querySelector(id);
  if (!node) {
    return;
  }

  const existingHref = node.getAttribute("href");
  const fallbackHref = existingHref && existingHref !== "#" ? existingHref : "";
  const resolvedHref = href || fallbackHref;

  if (resolvedHref) {
    node.href = resolvedHref;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  } else {
    node.setAttribute("aria-disabled", "true");
    node.classList.add("btn-disabled");
  }
};

setLink("#apple-pay-link", SITE_CONFIG.paymentLinks.oneTimeApplePayUrl);
setLink("#paypal-link", SITE_CONFIG.paymentLinks.oneTimePayPalUrl);
setLink("#cashapp-link", SITE_CONFIG.paymentLinks.oneTimeCashAppUrl);
setLink("#card-link", SITE_CONFIG.paymentLinks.oneTimeCardCheckoutUrl);

const zelle = document.querySelector("#zelle-instructions");
if (zelle) {
  const fallbackZelle = zelle.textContent?.trim();
  zelle.textContent = SITE_CONFIG.paymentLinks.zelleInstructions || fallbackZelle || "Add your Zelle instructions in assets/js/site-config.js.";
}
