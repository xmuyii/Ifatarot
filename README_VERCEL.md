
# Ifatarot - VERCEL READY - PUSH THIS

## Why Vercel fixes your blank GitHub Pages + Railway down:

- GitHub Pages blank: because vite base was /Ifatarot/ and /api/generate needs Node. Vercel runs both frontend + serverless API.
- Railway down: Vercel serverless replaces Railway.

## Files in this zip:

- vite.config.js -> base: '/' (fixes blank page)
- api/generate.js -> Vercel serverless function, replaces server.js, uses your real filenames Coins01.jpg etc.
- src/data/oduData.js -> 4096 logic: Birth Meji (8 marks) + Principal 16 Meji (4 marks) = 12 marks, naming: Oyeku Meji + Oyeku = Oyeku Meta
- src/data/tarotData.js -> maps Coins01.jpg = Ace of Pentacles, no renaming needed, uses import.meta.env.BASE_URL
- src/components/TarotCard.jsx -> displays /tarot/Coins01.jpg etc.
- vercel.json -> ensures SPA routing

## Push steps:

1. In your local Ifatarot folder:
   - Delete old server.js (or keep but Vercel uses api/generate.js)
   - Copy all files from this zip into your project root, overwrite.

2. Add your Rider deck:
   - Extract your Rider zip -> copy 78 jpgs (Coins01-14, Cups01-14, Wands01-14, Swords01-14, Major00-21) into public/tarot/
   - Keep original names - Coins01.jpg stays Coins01.jpg

3. Push to GitHub:
   git add .
   git commit -m "Vercel ready - 4096 Meta + real Rider deck"
   git push origin main

4. Vercel:
   - Go to vercel.com -> Add New Project -> Import xmuyii/Ifatarot
   - Framework: Vite
   - Add Environment Variables: ANTHROPIC_API_KEY and/or DEEPSEEK_API_KEY
   - Deploy

You get https://ifatarot.vercel.app with:
- Landing with 12 Ikin visual
- Temple with Drop Beads -> real card image Coins01.jpg etc.
- /api/generate working (no more blank)

GitHub Pages https://xmuyii.github.io/Ifatarot/ will still be blank if you keep deploying there - use Vercel URL instead. If you must use GitHub Pages, you need to deploy dist and use Vercel API URL as backend, but Vercel alone is enough.

Done.
