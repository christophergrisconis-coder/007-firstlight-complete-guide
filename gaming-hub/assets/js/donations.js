import { SITE_CONFIG } from "./site-config.js";

const setLink = (id, href) => {
  const node = document.querySelector(id);
  if (!node) {
    return;
  }

  if (href) {
    node.href = href;
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
  zelle.textContent = SITE_CONFIG.paymentLinks.zelleInstructions || "Add your Zelle instructions in assets/js/site-config.js.";
}
