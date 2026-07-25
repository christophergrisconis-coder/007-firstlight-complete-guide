# questandguides.com Redesign Audit

## Current Brand / Site Name
- Brand name: "Arcadia Grid" (needs to become "Quest & Guides" or similar)
- Domain: questandguides.com
- Redirects: questandguides.com → questandguides.com/gaming-hub/

## File Structure (key files to modify)
- gaming-hub/assets/css/styles.css — main CSS (881 lines), ALL pages use this
- gaming-hub/assets/js/app.js — injects header + footer into every page via JS
- gaming-hub/index.html — homepage (80 lines, uses data-page="home")
- gaming-hub/pages/games.html — games library page (uses data-page="games")
- gaming-hub/guide.html — guide shell page (uses data-page="guide")
- gaming-hub/pages/*.html — all other pages (search, community, help, contact, donations, subscribe, admin, signin, signup)

## Current Design System (to be replaced)
- Colors: --bg: #0a1019, --surface: #0e1622, --accent: #42d6c5 (teal), --text: #d4dce8
- Font: system-ui sans-serif
- Hero: .hero with overlay, rotating background images from manifest
- Cards: .panel with border: 1px solid var(--line), border-radius: 16px
- Buttons: .btn .btn-accent (teal), .btn-secondary (dark)
- Header: .topbar with .brand "Arcadia Grid", nav links, global search bar
- Footer: .footer with 3-column grid

## New Design System (to match AC Shadows guide aesthetic, broadened for multi-game)
- Palette: near-black lacquer (#0a0b0d), deep charcoal (#111318), crimson accent (#c0392b → #e8392b), antique gold (#c9a84c), off-white text (#e8e0d0)
- Fonts: Cinzel or Playfair Display for headings (serif/display), system-ui for body
- Hero: full-viewport layered background with gameplay imagery + dark gradient overlay + ink texture
- Game cards: dark glass panels with hover glow, genre tags, "Open Guide" CTA
- Header: dark sticky bar with logo mark + "Quest & Guides" wordmark, crimson active states
- Footer: dark with gold accent text
- Textures: subtle noise/grain overlay, brush-stroke decorative elements on section headings
- Section banners: each major section gets a cinematic background image strip

## JS-Injected Elements (must update in app.js)
- Brand name: "Arcadia Grid" → "Quest & Guides"
- Header HTML: topbar class, brand class, nav links
- Footer HTML: footer-grid, brand name, legal links

## Nav Items (keep all, just restyle)
Home, Games, Search, Community, Help, Contact, Donations, Subscribe, Admin, Sign In, Sign Up

## Games Currently Registered (games-data.js)
1. assassins-creed-shadows (featured) — /gaming-hub/custom-guides/ac-shadows/
2. 007-first-light (featured) — /gaming-hub/custom-guides/007/
3. ghost-of-yotei (featured) — /gaming-hub/custom-guides/ghost-of-yotei/
4. red-dead-redemption (featured) — no custom guide yet
5. red-dead-redemption-2 (featured) — /gaming-hub/custom-guides/rdr2/
6. elden-ring-nightreign (featured) — no custom guide yet
7. black-myth-wukong (featured) — no custom guide yet
8. monster-hunter-wilds, helldivers-2, metaphor-refantazio, final-fantasy-vii-rebirth, dragon-age-the-veilguard, call-of-duty-black-ops-6, marvel-rivals, balatro (not featured)

## Key Placeholder Text to Remove
- "Background images rotate from a managed manifest file. Replace URLs with your approved licensed sources." — visible to visitors on homepage hero, must be removed
- "Arcadia Grid" brand name throughout

## Pages That Need Full Restyle
1. gaming-hub/index.html (homepage)
2. gaming-hub/pages/games.html (game library)
3. gaming-hub/guide.html (guide shell)
4. gaming-hub/assets/css/styles.css (entire CSS)
5. gaming-hub/assets/js/app.js (header/footer injection)

## Pages That Need Minor Updates (brand name only)
- All pages/**.html — title tags say "Arcadia Grid", need to say "Quest & Guides"
- gaming-hub/pages/help.html, search.html, community.html, contact.html, donations.html, subscribe.html, admin.html, signin.html, signup.html
