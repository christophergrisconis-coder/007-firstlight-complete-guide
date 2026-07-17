import { SITE_CONFIG } from "./site-config.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const hasSupabase = Boolean(SITE_CONFIG.supabaseUrl && SITE_CONFIG.supabaseAnonKey);

const getAppBasePath = () => {
  const path = globalThis.location?.pathname || "";
  const marker = "/gaming-hub/";
  const idx = path.indexOf(marker);
  if (idx >= 0) {
    return "/gaming-hub";
  }
  return "";
};

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
    throw new Error(
      "Supabase is not configured. Add supabaseUrl and supabaseAnonKey in assets/js/site-config.js."
    );
  }
  return supabase;
};

export const getRedirectTo = () => {
  const origin = globalThis.location?.origin || "";
  const appBasePath = getAppBasePath();

  if (origin) {
    return `${origin}${appBasePath}`;
  }

  const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  return isLocal ? SITE_CONFIG.localUrl : SITE_CONFIG.siteUrl;
};

export const getAuthRedirectUrl = () => `${getRedirectTo()}/pages/signin.html`;
