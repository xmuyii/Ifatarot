import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Device-Id");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { system, messages, max_tokens } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });

    let prompt = "";
    if (messages && messages.length) {
      prompt = messages[messages.length-1].content || "";
    }
    if (!prompt.trim()) prompt = "Give a brief Ifa/Tarot reading";

    // Build full prompt with system
    const fullPrompt = system ? `${system}\n\nQuestion/Reading request:\n${prompt}` : prompt;

    // Try models in order - NEW API names as of 2026
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-2.5-pro",
      "gemini-3-flash-preview"
    ];

    let lastError = null;
    let finalText = "";

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            maxOutputTokens: Math.min(max_tokens || 1500, 2000),
            temperature: 0.85
          }
        });
        
        finalText = response.text || "";
        if (finalText && finalText.trim()) {
          console.log(`SUCCESS ${modelName}: ${finalText.length} chars`);
          break;
        }
      } catch (e) {
        console.log(`${modelName} failed: ${e.message}`);
        lastError = e;
        continue;
      }
    }

    if (!finalText || !finalText.trim()) {
      return res.status(500).json({ 
        error: `All Gemini models failed. Last error: ${lastError ? lastError.message : "empty"}. Your key may need new API enabled: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com` 
      });
    }

    return res.status(200).json({
      content: [{ text: finalText.trim() }],
      stop_reason: "stop"
    });

  } catch (e) {
    console.error("Top error:", e);
    return res.status(500).json({ error: e.message });
  }
}
