/**
 * content-gate.js
 * Quest & Guides — 50% free / full subscriber content gate
 *
 * Usage (in-site guide pages):
 *   import { applyInSiteGate } from './content-gate.js';
 *   applyInSiteGate(questsArray, renderFn);
 *
 * Usage (custom standalone HTML guides):
 *   <script type="module" src="/gaming-hub/assets/js/content-gate.js"></script>
 *   Add data-gate="true" to the guide root element.
 */

import { getAccessState } from './access.js';

const HUB_ROOT = '/gaming-hub';
const SUBSCRIBE_URL = `${HUB_ROOT}/pages/subscribe.html`;
const SIGNIN_URL    = `${HUB_ROOT}/pages/signin.html`;

/* ── Paywall wall HTML ──────────────────────────────────────────────────── */
const buildPaywall = (isSignedIn) => {
  const signinBtn = isSignedIn
    ? ''
    : `<a class="qg-gate-btn qg-gate-btn-secondary" href="${SIGNIN_URL}">Sign In</a>`;

  return `
<div class="qg-paywall" id="qg-paywall" role="region" aria-label="Subscriber content">
  <div class="qg-paywall-inner">
    <div class="qg-paywall-icon">⚔</div>
    <h2 class="qg-paywall-title">You've reached the free preview</h2>
    <p class="qg-paywall-desc">
      The first 50% of every guide is free. Subscribe to unlock the full walkthrough —
      every quest, collectible, trophy, and secret.
    </p>
    <ul class="qg-paywall-perks">
      <li>✓ 100% guide access — no locks</li>
      <li>✓ Interactive checklists with cloud save</li>
      <li>✓ Full trophy roadmaps &amp; missable flags</li>
      <li>✓ All collectible trackers, per-region</li>
      <li>✓ Early access to new guides</li>
    </ul>
    <div class="qg-paywall-cta">
      <a class="qg-gate-btn qg-gate-btn-accent" href="${SUBSCRIBE_URL}">
        Unlock Full Guide — $1.99/mo
      </a>
      ${signinBtn}
    </div>
    <p class="qg-paywall-note">Start with a free 3-day trial. Cancel any time.</p>
  </div>
</div>`;
};

/* ── Paywall CSS (injected once) ────────────────────────────────────────── */
const PAYWALL_CSS = `
.qg-paywall-fade {
  position: relative;
  pointer-events: none;
  user-select: none;
}
.qg-paywall-fade::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 220px;
  background: linear-gradient(to bottom, transparent 0%, #08090b 100%);
  pointer-events: none;
}
.qg-paywall {
  background: linear-gradient(135deg, #0f1117 0%, #161820 100%);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 18px;
  margin: 32px 0 0;
  overflow: hidden;
  position: relative;
}
.qg-paywall::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, #c9a84c, transparent);
}
.qg-paywall-inner {
  padding: 48px 32px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.qg-paywall-icon {
  font-size: 2.4rem;
  line-height: 1;
  color: #c9a84c;
  text-shadow: 0 0 24px rgba(201,168,76,0.5);
}
.qg-paywall-title {
  font-family: 'Cinzel', 'Georgia', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #e8e0d0;
  margin: 0;
}
.qg-paywall-desc {
  font-size: 1rem;
  color: #9a9080;
  max-width: 480px;
  line-height: 1.7;
  margin: 0;
}
.qg-paywall-perks {
  list-style: none;
  padding: 0; margin: 0;
  display: grid; gap: 8px;
  text-align: left;
  font-size: 0.9rem;
  color: #c9a84c;
}
.qg-paywall-cta {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
  margin-top: 8px;
}
.qg-gate-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Cinzel', 'Georgia', serif;
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 12px 26px; border-radius: 6px;
  border: 1px solid transparent; cursor: pointer;
  text-decoration: none; white-space: nowrap;
  transition: all 180ms ease;
}
.qg-gate-btn-accent {
  background: #c0392b; color: #fff;
  border-color: #e8392b;
  box-shadow: 0 0 16px rgba(192,57,43,0.35);
}
.qg-gate-btn-accent:hover {
  background: #e8392b; color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(192,57,43,0.5);
}
.qg-gate-btn-secondary {
  background: #161820; color: #9a9080;
  border-color: rgba(255,255,255,0.08);
}
.qg-gate-btn-secondary:hover {
  border-color: #c9a84c; color: #c9a84c;
  background: rgba(201,168,76,0.1);
  transform: translateY(-1px);
}
.qg-paywall-note {
  font-size: 0.78rem; color: #5a5448; margin: 0;
}
@media (max-width: 540px) {
  .qg-paywall-inner { padding: 32px 20px; }
  .qg-paywall-cta { flex-direction: column; align-items: stretch; }
  .qg-gate-btn { justify-content: center; }
}
`;

const injectPaywallCSS = () => {
  if (document.getElementById('qg-paywall-css')) return;
  const style = document.createElement('style');
  style.id = 'qg-paywall-css';
  style.textContent = PAYWALL_CSS;
  document.head.appendChild(style);
};

/* ── In-site guide gate (quest list split) ──────────────────────────────── */
/**
 * applyInSiteGate
 * Call this from guide-page.js after the quest list is built.
 * @param {Array}    quests        Full quests array
 * @param {Function} renderFn      Function that renders the quest list given a (possibly truncated) array
 * @param {Object}   accessState   Result of getAccessState()
 */
export const applyInSiteGate = (quests, renderFn, accessState) => {
  injectPaywallCSS();
  const isLocked = accessState.tier === 'basic';
  if (!isLocked) {
    renderFn(quests);
    return;
  }
  const cutoff = Math.ceil(quests.length / 2);
  const freeQuests = quests.slice(0, cutoff);
  renderFn(freeQuests);

  // Fade the last visible item
  const listEl = document.querySelector('.quest-list');
  if (listEl) {
    listEl.classList.add('qg-paywall-fade');
  }

  // Inject paywall after the quest list panel
  const panel = listEl?.closest('.panel') || listEl?.parentElement;
  if (panel) {
    panel.insertAdjacentHTML('afterend', buildPaywall(accessState.isSignedIn));
  }
};

/* ── Standalone custom guide gate (iframe/embedded HTML) ────────────────── */
/**
 * applyStandaloneGate
 * Finds the guide's scrollable content container, hides everything past 50%,
 * and injects the paywall. Works for single-file HTML guides like AC Shadows.
 * @param {string} containerSelector  CSS selector for the main scrollable content area
 * @param {Object} accessState        Result of getAccessState()
 */
export const applyStandaloneGate = (containerSelector, accessState) => {
  injectPaywallCSS();
  if (accessState.tier !== 'basic') return; // pro/trial = full access

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const children = Array.from(container.children);
  if (children.length < 2) return;

  const cutoff = Math.ceil(children.length / 2);

  // Hide everything past the cutoff
  children.slice(cutoff).forEach(el => {
    el.style.display = 'none';
    el.setAttribute('data-gated', 'true');
  });

  // Fade the last visible child
  const lastVisible = children[cutoff - 1];
  if (lastVisible) lastVisible.classList.add('qg-paywall-fade');

  // Inject paywall after the last visible child
  lastVisible?.insertAdjacentHTML('afterend', buildPaywall(accessState.isSignedIn));
};

/* ── Auto-init for standalone guides ────────────────────────────────────── */
/**
 * If a guide page includes this script and has data-gate="true" on its
 * main content wrapper, the gate is applied automatically.
 */
const autoInit = async () => {
  const gateTarget = document.querySelector('[data-gate="true"]');
  if (!gateTarget) return;

  injectPaywallCSS();
  const accessState = await getAccessState();
  applyStandaloneGate('[data-gate="true"]', accessState);
};

// Run auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}
