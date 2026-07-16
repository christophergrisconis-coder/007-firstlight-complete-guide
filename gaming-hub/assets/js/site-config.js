// Beginner note:
// Replace these placeholder values with your Supabase project settings.
// File path: assets/js/site-config.js

export const SITE_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
  siteUrl: "https://questandguides.com",
  localUrl: "http://127.0.0.1:4173",
  paymentLinks: {
    monthlyProCheckoutUrl: "",
    oneTimeApplePayUrl: "",
    oneTimePayPalUrl: "",
    oneTimeCashAppUrl: "",
    oneTimeCardCheckoutUrl: "",
    zelleInstructions: "",
  },
  edgeFunctions: {
    missingReportNotifier: "send-missing-report-email",
  },
};
