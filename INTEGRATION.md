# Ifatarot - Sync Landing to your Railway app

You asked for a zip. This zip contains everything to drop into xmuyii/Ifatarot.

## Files in this zip:
- src/components/LandingPage.jsx -> the new front page (Ifa + Tarot as new tradition)
- src/App.jsx.example -> wrapper that shows Landing first, then your existing app

## Quick Install (2 mins):

1. Unzip into your repo root (it will create src/components/LandingPage.jsx)
   - Windows: right-click zip -> Extract All -> copy into your Ifatarot folder
   - Mac: double click zip, copy

2. In your repo:
   ```bash
   # backup your current App.jsx
   mv src/App.jsx src/AppMain.jsx
   
   # copy the example wrapper to become the new App.jsx
   cp src/App.jsx.example src/App.jsx
   ```

3. Test locally:
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:5173 - you should see the temple landing first.

4. Push to GitHub -> Railway auto-deploys:
   ```bash
   git add .
   git commit -m "Add Ifatarot temple front door - new tradition landing"
   git push
   ```

Railway will run `npm run build` then `npm start` (server.js). Your ANTHROPIC_API_KEY stays in Railway Variables.

## How ENTER TEMPLE connects:
- Button calls `onEnter` prop which sets `localStorage ifa_entered=1` and shows your reading app
- Your credit system (8 credits, 1 per 3h) in server.js still enforced at /api/generate
- PWA manifest still works - users can Install from browser

## Want to remove landing later?
Just restore: mv src/AppMain.jsx src/App.jsx

Need help? Ping me with any error log.
