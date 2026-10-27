import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Device-Id");
  if (req.method === "OPTIONS") return res.status(200).end();
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { system, messages, max_tokens } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";

  console.log("Generate called, has key:", !!apiKey, "key length:", apiKey.length);

  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel. Go to Settings -> Environment Variables and add it" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const modelsToTry = [
      process.env.GEMINI_MODEL,
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-pro"
    ].filter(Boolean);

    let prompt = "";
    if (messages && messages.length) {
      const last = messages[messages.length - 1];
      prompt = last.content || "";
    }
    if (!prompt.trim()) prompt = "Provide Ifa and Tarot reading";

    console.log("Prompt length:", prompt.length);

    let lastError = null;
    let finalText = "";

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: system ? { role: "system", parts: [{ text: system.substring(0, 8000) }] } : undefined
        });

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt.substring(0, 15000) }] }],
          generationConfig: { 
            maxOutputTokens: Math.min(max_tokens || 1500, 2000), 
            temperature: 0.85
          }
        });

        const response = result.response;
        finalText = response.text();
        
        if (finalText && finalText.trim()) {
          console.log(`SUCCESS with ${modelName}, text length: ${finalText.length}`);
          break;
        }
      } catch (e) {
        console.error(`Model ${modelName} failed:`, e.message);
        lastError = e;
        continue;
      }
    }

    if (!finalText || !finalText.trim()) {
      const errMsg = lastError ? lastError.message : "All models returned empty";
      console.error("All models failed:", errMsg);
      
      // Return a helpful error that frontend will display
      if (errMsg.includes("API key") || errMsg.includes("fetching") || errMsg.includes("models") || errMsg.includes("400")) {
        return res.status(500).json({ 
          error: `Gemini error: ${errMsg}. FIX: 1) Enable API at https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com 2) Create new key at https://aistudio.google.com/app/apikey in NEW project 3) Add to Vercel env` 
        });
      }
      
      return res.status(500).json({ error: `Gemini failed after trying ${modelsToTry.join(", ")}: ${errMsg}` });
    }

    console.log("Returning text, length:", finalText.length);
    return res.status(200).json({
      content: [{ text: finalText.trim() }],
      stop_reason: "stop"
    });

  } catch (e) {
    console.error("Top-level error:", e);
    return res.status(500).json({ error: e.message || "Gemini generation failed", stack: e.stack });
  }
}
