// Vercel serverless function.
// Deployed at /api/generate — the frontend calls this instead of Anthropic directly,
// so your ANTHROPIC_API_KEY never reaches the browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not set on the server." });
    return;
  }

  const { system, messages, max_tokens } = req.body || {};
  if (!messages) {
    res.status(400).json({ error: "Missing messages." });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // Check https://docs.claude.com/en/docs/about-claude/models for the current
        // model string if this ever stops working.
        model: "claude-sonnet-5",
        max_tokens: max_tokens || 1200,
        system,
        messages,
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data.error?.message || "Anthropic API error" });
      return;
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to reach Claude." });
  }
}
