// Copy this file to site-config.js and fill values.
// Do not commit real keys if this repo is public.

export const SITE_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  // Add your production custom domain and local dev URL.
  siteUrl: "https://your-domain.com",
  localUrl: "http://127.0.0.1:4173",
  paymentLinks: {
    // Stripe hosted checkout link for recurring Pro plan ($1.99/month).
    monthlyProCheckoutUrl: "https://buy.stripe.com/YOUR_SUBSCRIPTION_LINK",
    // Stripe hosted checkout link for recurring Pro annual plan ($20/year).
    annualProCheckoutUrl: "https://buy.stripe.com/YOUR_ANNUAL_SUBSCRIPTION_LINK",
    // Stripe hosted one-time payment link with Apple Pay enabled.
    oneTimeApplePayUrl: "https://buy.stripe.com/YOUR_APPLE_PAY_COMPAT_LINK",
    oneTimePayPalUrl: "https://paypal.me/YOUR_HANDLE",
    oneTimeCashAppUrl: "https://cash.app/$YOUR_HANDLE",
    // Stripe hosted one-time payment link for card checkout.
    oneTimeCardCheckoutUrl: "https://buy.stripe.com/YOUR_CARD_CHECKOUT_LINK",
    // Example: "Send via Zelle to yourbusiness@email.com"
    zelleInstructions: "Use your business email in Zelle",
  },
  edgeFunctions: {
    missingReportNotifier: "send-missing-report-email",
  },
};
