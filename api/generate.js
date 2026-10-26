import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { system, messages, max_tokens } = req.body || {};

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel env" });
  }

  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    let prompt = "";
    if (system) prompt += `System: ${system}\n\n`;
    if (messages && messages.length) {
      for (const m of messages) {
        const role = m.role === "assistant" ? "Assistant" : "User";
        prompt += `${role}: ${m.content}\n`;
      }
    }
    if (!prompt.trim()) prompt = "Hello";

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { 
        maxOutputTokens: max_tokens || 1200, 
        temperature: 0.85 
      }
    });

    const text = result.response.text();

    return res.status(200).json({
      content: [{ text }],
      stop_reason: "stop"
    });

  } catch (e) {
    console.error("Gemini error:", e);
    return res.status(500).json({ error: e.message || "Gemini failed" });
  }
}
