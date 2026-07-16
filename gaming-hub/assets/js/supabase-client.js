import { SITE_CONFIG } from "./site-config.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const hasSupabase = Boolean(SITE_CONFIG.supabaseUrl && SITE_CONFIG.supabaseAnonKey);

export const supabase = hasSupabase
  ? createClient(SITE_CONFIG.supabaseUrl, SITE_CONFIG.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export const assertSupabase = () => {
  if (!supabase) {
    throw new Error("Supabase is not configured. Update assets/js/site-config.js first.");
  }
  return supabase;
};

export const getRedirectTo = () => {
  const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  return isLocal ? SITE_CONFIG.localUrl : SITE_CONFIG.siteUrl;
};
