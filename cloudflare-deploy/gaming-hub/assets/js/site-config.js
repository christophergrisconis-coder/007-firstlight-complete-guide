// Beginner note:
// Replace these placeholder values with your Supabase project settings.
// File path: assets/js/site-config.js

export const SITE_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
  siteUrl: "https://questandguides.com",
  localUrl: "http://127.0.0.1:4173",
  paymentLinks: {
    // Stripe recurring checkout URL for Pro ($1.99/month)
    monthlyProCheckoutUrl: "https://buy.stripe.com/cNi8wH13feaz23t5Vcffy00",
    // Stripe recurring checkout URL for Pro annual plan ($20/year)
    annualProCheckoutUrl: "https://buy.stripe.com/3cIeV513f4zZ6jJ6Zgffy01",
    // Stripe one-time checkout URL with Apple Pay enabled
    oneTimeApplePayUrl: "https://buy.stripe.com/cNi8wH13feaz23t5Vcffy00",
    // PayPal.Me or PayPal hosted checkout URL
    oneTimePayPalUrl: "https://paypal.me/ChristopherGrisconis",
    // Cash App payment URL, for example https://cash.app/$yourhandle
    oneTimeCashAppUrl: "",
    // Stripe one-time card checkout URL
    oneTimeCardCheckoutUrl: "https://buy.stripe.com/cNi8wH13feaz23t5Vcffy00",
    // Plain text shown in the Zelle panel
    zelleInstructions: "Zelle is available. Send payment to your configured Zelle contact and include your email in the memo so access can be verified.",
  },
  edgeFunctions: {
    missingReportNotifier: "send-missing-report-email",
  },
};
