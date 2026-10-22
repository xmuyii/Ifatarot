
# Ifa 3.0 Meta - PUSH READY

This zip is wired so you just push to GitHub.

## What's wired:

1. **Odu Meta 4096 logic:**
   - Birth Meji (16 Meji only, 8 marks) + Principal (16 Meji, 4 marks) = 12 marks
   - Naming: Oyeku Meji + Oyeku = Oyeku Meta, Oyeku Meji + Ose = Oyeku Meji Ose, Okanran Ose + Okanran = Okanran Ose Okanran
   - Drop simultaneous like babalawo beads

2. **Real Rider Tarot mapped to your folder:**
   - Your screenshot: Coins01.jpg = Ace of Pentacles (photo proof)
   - Code uses your filenames AS-IS: Coins01-14, Cups01-14, Wands01-14, Swords01-14, Major00-21
   - No renaming needed
   - Files served from public/tarot/ -> /tarot/Coins01.jpg on Railway

3. **Server.js wired:**
   - /api/generate receives birth, principal, metaName, marks12, tarotFile, tarotName
   - Builds Ifa 3.0 prompt: Spiritual root 12 marks + Physical mirror Rider card
   - Calls Anthropic or DeepSeek if keys set, else fallback text
   - Returns reading + tarot path /tarot/Coins01.jpg etc.

4. **Frontend wired:**
   - Ifa3Landing.jsx: 12 Ikin visual, demo drop shows real tarot card
   - AppMain.jsx: Drop Beads button -> generates Meta + random Rider card -> calls /api/generate -> displays real card image
   - TarotCard.jsx: shows /tarot/Coins01.jpg etc. with fallback

## Install:

```bash
# In your Ifatarot folder
# Backup old files if needed
rm -rf src/data src/components/Ifa3Landing.jsx

# Unzip this into project root (overwrite)
# Then copy your 78 Rider jpgs:
# Extract your "Images from the Rider Tarot deck.zip" -> copy all jpgs (except ETC1.jpg) into public/tarot/

npm install
npm run build
# push to GitHub, Railway auto-deploys and serves /tarot/Coins01.jpg etc.
```

## Folder after install:
public/tarot/Coins01.jpg (Ace of Pentacles)
public/tarot/Coins02.jpg
...
public/tarot/Major00.jpg (Fool)
...
public/tarot/Wands14.jpg

src/data/oduData.js
src/data/tarotData.js
src/components/TarotCard.jsx
src/components/Ifa3Landing.jsx
src/App.jsx
src/AppMain.jsx
server.js

Push now.
