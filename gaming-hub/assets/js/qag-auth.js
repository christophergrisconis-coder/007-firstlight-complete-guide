// Quest & Guides — Auth Client
// Communicates with the Cloudflare Worker API at api.questandguides.com

const API = 'https://api.questandguides.com';

const QAGAuth = (() => {
  const TOKEN_KEY = 'qag_token';
  const USER_KEY  = 'qag_user';

  function getToken() { return localStorage.getItem(TOKEN_KEY); }
  function getUser()  { try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; } }

  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  async function apiFetch(path, opts = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const res = await fetch(API + path, { ...opts, headers });
    return res.json();
  }

  async function signUp(email, password, displayName) {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name: displayName }),
    });
    if (data.success) setSession(data.token, data.user);
    return data;
  }

  async function signIn(email, password) {
    const data = await apiFetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.success) setSession(data.token, data.user);
    return data;
  }

  async function signInWithGoogle(idToken) {
    const data = await apiFetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
    if (data.success) setSession(data.token, data.user);
    return data;
  }

  async function signInWithApple(identityToken, appleUser) {
    const data = await apiFetch('/api/auth/apple', {
      method: 'POST',
      body: JSON.stringify({ identity_token: identityToken, user: appleUser }),
    });
    if (data.success) setSession(data.token, data.user);
    return data;
  }

  async function signOut() {
    await apiFetch('/api/auth/signout', { method: 'POST' });
    clearSession();
    window.location.href = '/gaming-hub/';
  }

  async function getMe() {
    const data = await apiFetch('/api/auth/me');
    if (data.success) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data.user;
    }
    return null;
  }

  function isSignedIn() { return !!getToken() && !!getUser(); }
  function isPro() { const u = getUser(); return u && (u.tier === 'pro' || u.tier === 'trial' || u.role === 'admin'); }
  function isAdmin() { const u = getUser(); return u && u.role === 'admin'; }

  // Progress sync
  async function syncProgress(guideId, progressObj) {
    if (!isSignedIn()) return;
    return apiFetch(`/api/progress/${guideId}/bulk`, {
      method: 'PUT',
      body: JSON.stringify({ progress: progressObj }),
    });
  }

  async function loadProgress(guideId) {
    if (!isSignedIn()) return null;
    const data = await apiFetch(`/api/progress/${guideId}`);
    return data.success ? data.progress : null;
  }

  async function saveProgressItem(guideId, itemKey, checked) {
    if (!isSignedIn()) return;
    return apiFetch(`/api/progress/${guideId}`, {
      method: 'POST',
      body: JSON.stringify({ item_key: itemKey, checked }),
    });
  }

  // Page tracking
  function trackPage(path) {
    const p = path || window.location.pathname;
    fetch(API + '/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(getToken() ? { 'Authorization': 'Bearer ' + getToken() } : {}) },
      body: JSON.stringify({ page_path: p }),
    }).catch(() => {});
  }

  // Update nav UI based on auth state
  function updateNav() {
    const user = getUser();
    const navAuth = document.getElementById('nav-auth');
    const navUser = document.getElementById('nav-user');
    if (!navAuth && !navUser) return;
    if (user) {
      if (navAuth) navAuth.style.display = 'none';
      if (navUser) {
        navUser.style.display = 'flex';
        const nameEl = navUser.querySelector('.nav-user-name');
        if (nameEl) nameEl.textContent = user.display_name || user.email;
        if (user.role === 'admin') {
          const adminLink = navUser.querySelector('.nav-admin-link');
          if (adminLink) adminLink.style.display = 'inline-flex';
        }
      }
    } else {
      if (navAuth) navAuth.style.display = 'flex';
      if (navUser) navUser.style.display = 'none';
    }
  }

  return { signUp, signIn, signInWithGoogle, signInWithApple, signOut, getMe, getUser, getToken, isSignedIn, isPro, isAdmin, syncProgress, loadProgress, saveProgressItem, trackPage, updateNav, clearSession };
})();

window.QAGAuth = QAGAuth;

// Auto-update nav on load
document.addEventListener('DOMContentLoaded', () => {
  QAGAuth.updateNav();
  QAGAuth.trackPage();
});
