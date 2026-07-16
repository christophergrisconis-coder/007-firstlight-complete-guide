// Copy this file to site-config.js and fill values.
// Do not commit real keys if this repo is public.

export const SITE_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  // Add your production custom domain and local dev URL.
  siteUrl: "https://your-domain.com",
  localUrl: "http://127.0.0.1:4173",
  paymentLinks: {
    monthlyProCheckoutUrl: "https://buy.stripe.com/YOUR_SUBSCRIPTION_LINK",
    oneTimeApplePayUrl: "https://buy.stripe.com/YOUR_APPLE_PAY_COMPAT_LINK",
    oneTimePayPalUrl: "https://paypal.me/YOUR_HANDLE",
    oneTimeCashAppUrl: "https://cash.app/$YOUR_HANDLE",
    oneTimeCardCheckoutUrl: "https://buy.stripe.com/YOUR_CARD_CHECKOUT_LINK",
    zelleInstructions: "Use your business email in Zelle",
  },
  edgeFunctions: {
    missingReportNotifier: "send-missing-report-email",
  },
};
