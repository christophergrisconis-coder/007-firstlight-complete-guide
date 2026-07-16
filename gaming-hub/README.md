# Arcadia Grid Gaming Hub (Cloudflare + Supabase)

Beginner-friendly premium gaming website scaffold with:
- Real Supabase Auth architecture (Email, Google, Apple)
- Real registration count from backend data
- Search UI and game content cards
- Subscriber flow stored in Supabase
- Cloudflare Pages static deployment compatibility

## 1. Recommended stack and why

- Frontend: Static HTML + CSS + modular JavaScript
  - Easy for beginners in VS Code
  - No Node or build tool required
  - Fast for Cloudflare Pages static hosting
- Backend: Supabase
  - Auth providers (email, Google, Apple)
  - PostgreSQL storage for profiles and subscribers
  - Real registration count via SQL view
- Hosting: Cloudflare Pages
  - Works with static files and custom domains

## 2. Project structure

See folder tree in this README section near the bottom.

## 3. Local run in VS Code

Option A: Python server
1. Open terminal in project root
2. Run:

```bash
cd gaming-hub
python3 -m http.server 4173
```

3. Open: http://127.0.0.1:4173

## 4. Supabase setup

### 4.1 Create project
1. Create a Supabase project at supabase.com
2. Copy:
- Project URL
- Anon public key

### 4.2 Add SQL schema
1. Open SQL Editor in Supabase
2. Run file:
- supabase/schema.sql

This creates:
- public.profiles linked to auth.users
- trigger to auto-create profile on registration
- public.subscribers for newsletter signups
- public.registration_metrics view for safe public count

### 4.3 Configure frontend keys
1. Open:
- assets/js/site-config.js
2. Fill:
- supabaseUrl
- supabaseAnonKey
- siteUrl (your custom domain)
- localUrl (http://127.0.0.1:4173)

### 4.4 Auth provider setup

#### Email
1. Supabase Dashboard -> Authentication -> Providers -> Email
2. Enable Email provider

#### Google OAuth
1. Create OAuth client in Google Cloud Console
2. Add Authorized redirect URI:
- https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
3. Add your production domain and local domain to allowed origins
4. Paste Google client ID and secret in Supabase provider settings

#### Apple OAuth
1. Apple sign in requires Apple Developer account setup
2. Create Service ID and private key in Apple Developer portal
3. Add callback URL:
- https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
4. Paste Apple credentials in Supabase provider settings

Important:
Apple setup is partially manual in external dashboards. The frontend scaffold is ready, but provider setup is required before it works.

## 5. Newsletter and email architecture

Current status:
- Working: subscribe form stores email + consent in public.subscribers
- Not yet wired: actual outbound email sending

Recommended next provider:
- Resend (simple API)

Beginner next step:
1. Create Supabase Edge Function to call Resend
2. Trigger that function for updates/news drops

## 6. Cloudflare Pages deploy

1. Push this folder to a GitHub repo
2. In Cloudflare Dashboard:
- Pages -> Create project -> Connect to GitHub
- Select repo
3. Build settings for static project:
- Framework preset: None
- Build command: leave empty
- Build output directory: /
4. Deploy
5. Add custom domain in Cloudflare Pages project settings
6. After domain is live, update assets/js/site-config.js siteUrl to your domain

## 7. Git commands for GitHub

```bash
cd gaming-hub
git init
git add .
git commit -m "Initial Arcadia Grid scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 8. Folder tree

```text
gaming-hub/
  index.html
  README.md
  .gitignore
  assets/
    css/
      styles.css
    js/
      app.js
      auth.js
      games-data.js
      games-page.js
      home.js
      image-manifest.js
      search.js
      site-config.example.js
      site-config.js
      subscribe.js
      supabase-client.js
    images/
      README.md
  pages/
    contact.html
    donations.html
    games.html
    help.html
    privacy.html
    search.html
    signin.html
    signup.html
    subscribe.html
    terms.html
  supabase/
    schema.sql
```

## 9. Honest status checklist

### Fully working after Supabase keys are set
- Multi-page premium gaming UI
- Rotating hero image system using replaceable manifest
- Game search with loading and empty states
- Email sign-up/sign-in via Supabase
- Google and Apple OAuth button flows in frontend
- Real registration count from backend view
- Subscriber storage in Supabase table
- Mobile nav, footer, terms/privacy placeholders

### Requires your manual dashboard setup
- Supabase project values in site-config.js
- Google provider credentials and callback settings
- Apple provider credentials and callback settings
- Email sending provider integration (Resend/MailerLite)
- Real donation links (Stripe/Ko-fi/BMC)
- Approved gameplay image URLs in image manifest

## 10. Notes about gameplay images

This project does not invent or hotlink random copyrighted images.
Use only approved, licensed, or owned URLs in:
- assets/js/image-manifest.js
