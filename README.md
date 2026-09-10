# Ifatarot — deploy guide (Railway)

Same app as the Claude preview, restructured with a real backend so your
Anthropic API key stays private, a rolling credit system that enforces
itself server-side, and a PWA manifest so it installs like an app with no
app store.

## 1. Get an API key

https://console.anthropic.com -> API Keys. Add a payment method — this is
pay-per-use (see the cost estimates earlier in this conversation).

## 2. Push this to GitHub

```
git init
git add .
git commit -m "Ifatarot"
```

Create a repo on GitHub and push.

## 3. Deploy on Railway

1. https://railway.app -> New Project -> Deploy from GitHub repo -> pick this repo.
2. Railway auto-detects Node and will run `npm install`, then `npm run build`
   (builds the frontend into `dist/`), then `npm start` (runs `server.js`,
   which serves `dist/` and handles `/api/generate`).
3. Add a variable: Settings -> Variables -> `ANTHROPIC_API_KEY` = your real key.
4. Railway gives you a live URL immediately — no separate frontend/backend
   deploys, it's one service.
5. Optional: add a custom domain under Settings -> Networking.

If Railway doesn't auto-detect the build/start commands, set them explicitly
in Settings -> Deploy: build command `npm run build`, start command `npm start`.

## 4. Install it — PC, Android, iOS, no app store

This is one web app. "Installing" it anywhere just means opening the URL and
adding it to the screen:

- **Windows/Mac (Chrome or Edge):** address bar -> install icon (or menu ->
  "Install Ifatarot…"). Gives it a real window and a taskbar/dock icon —
  this is your "PC version," no separate build needed.
- **Android (Chrome):** menu (⋮) -> "Add to Home screen" / "Install app."
- **iPhone/iPad (must be Safari, not Chrome):** Share button -> "Add to Home
  Screen." iOS only allows PWA installs through Safari.

All three open full-screen with a real icon, no browser bar, no Play Store
or App Store review. One codebase, one deploy, every device.

One iOS-specific quirk worth knowing: Safari can clear site storage after 7
days of not opening the *browser tab* version of a site — but that clock
doesn't apply once it's added to the home screen, which is exactly what
you're doing, so saved profiles/notes are safe.

## What's server-enforced now, not just cosmetic

`server.js` tracks a rolling credit count per device (8 max, refills 1 every
3 hours — never a hard "come back tomorrow" reset) and rejects requests with
a friendly wait-time message once someone's out. This lives in memory, so it
resets if the Railway service restarts — fine for testing, but move it to
Postgres or Redis before this matters for real (i.e. before someone could
restart your service to reset their own limit).

"Internal" calls — the quiet classification that guesses which reading depth
fits a question, and the background check for Vessel insights — are flagged
and don't cost the seeker a consultation. Only their own questions and
readings do.

## Everything else that still applies

- **Storage is per-device** (localStorage) — profiles, notes, Vessel
  insights, and stats don't sync across a seeker's own devices yet. That
  needs real accounts + a database, a bigger step for later.
- **Card art is still placeholder.** Host real files anywhere public and
  swap them into `TarotArt`/`OduArt` in `src/App.jsx`.
- **No payment flow yet** — credits are a usage cap, not a paywall. Adding
  "buy more" is a Stripe integration away when you're ready.
