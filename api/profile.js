// api/profile.js - Persists profile across Vercel redeploys
// Optional: Uses Vercel KV if you create it, otherwise uses memory (still helps with localStorage sync)

let memoryStore = globalThis.__ifatarotStore;
if (!memoryStore) {
  memoryStore = new Map();
  globalThis.__ifatarotStore = memoryStore;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Device-Id");
  if (req.method === "OPTIONS") return res.status(200).end();

  const deviceId = req.headers["x-device-id"] || req.query.deviceId || req.body?.deviceId || "default";
  const key = `ifatarot:profile:${deviceId}`;

  // Try Vercel KV if available
  let kv = null;
  try {
    const mod = await import("@vercel/kv");
    kv = mod.kv;
  } catch (e) {
    // KV not configured, use memory
  }

  if (req.method === "GET") {
    try {
      let data = null;
      if (kv) {
        data = await kv.get(key);
      } else {
        data = memoryStore.get(key) || null;
      }
      return res.status(200).json({ profile: data });
    } catch (e) {
      return res.status(200).json({ profile: null });
    }
  }

  if (req.method === "POST") {
    try {
      const { profile } = req.body || {};
      if (!profile) return res.status(400).json({ error: "No profile" });
      
      if (kv) {
        await kv.set(key, profile);
      } else {
        memoryStore.set(key, profile);
      }
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
