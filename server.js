import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// ---- rolling credits, per device, in memory ----
// Not a hard daily reset — credits trickle back over time, so someone who runs
// out can return in a few hours rather than waiting for a calendar day.
// In-memory means this resets if the Railway service restarts; swap in Redis
// or Postgres once this needs to survive restarts / scale past one instance.
const CREDIT_MAX = 8;
const CREDIT_REFILL_HOURS = 3;
const deviceState = new Map();

function getState(deviceId) {
  const now = Date.now();
  let s = deviceState.get(deviceId);
  if (!s) { s = { credits: CREDIT_MAX, lastRefillAt: now }; deviceState.set(deviceId, s); }
  const elapsedHours = (now - s.lastRefillAt) / 3600000;
  const toAdd = Math.floor(elapsedHours / CREDIT_REFILL_HOURS);
  if (toAdd > 0) {
    s.credits = Math.min(CREDIT_MAX, s.credits + toAdd);
    s.lastRefillAt = s.lastRefillAt + toAdd * CREDIT_REFILL_HOURS * 3600000;
  }
  return s;
}
function formatWait(hours) {
  const totalMin = Math.max(1, Math.round(hours * 60));
  const h = Math.floor(totalMin / 60), m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

app.post("/api/generate", async (req, res) => {
  const deviceId = req.headers["x-device-id"] || req.ip || "anon";
  const { system, messages, max_tokens, internal } = req.body || {};
  if (!messages) { res.status(400).json({ error: "Missing messages." }); return; }

  const state = getState(deviceId);
  // "internal" calls (dimension classification, quiet vessel-insight extraction)
  // don't cost the seeker a consultation — only their own questions and readings do.
  if (!internal && state.credits < 1) {
    const hoursUntilNext = CREDIT_REFILL_HOURS - (Date.now() - state.lastRefillAt) / 3600000;
    res.status(429).json({ error: `You're out of consultations for now — the next one unlocks in about ${formatWait(Math.max(0, hoursUntilNext))}.` });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.status(500).json({ error: "ANTHROPIC_API_KEY is not set on the server." }); return; }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        // Check https://docs.claude.com/en/docs/about-claude/models if this ever stops working.
        model: "claude-sonnet-5",
        max_tokens: max_tokens || 1200,
        system,
        messages,
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) { res.status(upstream.status).json({ error: data.error?.message || "Anthropic API error" }); return; }
    // Only spend a credit on genuinely meaningful content — an empty or failed
    // response should never cost the seeker a consultation.
    const hasText = (data.content || []).some((b) => b.text && b.text.trim());
    if (!internal && hasText) state.credits -= 1;
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to reach Claude." });
  }
});

// serve the built frontend
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ifatarot server listening on port ${PORT}`));
