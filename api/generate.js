import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { system, messages, max_tokens } = req.body || {};

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel env. Add it in Settings -> Environment Variables" });
  }

  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: system ? system + "\n\nIMPORTANT: Always address the seeker's growth energies, opportunity, and next steps clearly. For each position, name the energy present. End with a short synthesis about growth and opportunity this week." : "You are Ifatarot, a wise divination guide blending Ifa and Tarot. Always address growth energies and opportunity."
    });

    let prompt = "";
    if (messages && messages.length) {
      const last = messages[messages.length - 1];
      prompt = last.content || "";
      if (messages.length > 1) {
        const history = messages.slice(0, -1).map(m => `${m.role}: ${m.content}`).join("\n");
        prompt = `${history}\n\nCurrent reading request:\n${prompt}`;
      }
    }

    if (!prompt.trim()) {
      prompt = "Provide a general Ifa and Tarot reading about growth and opportunity.";
    }

    if (prompt.toLowerCase().includes("growth") || prompt.toLowerCase().includes("opportunity") || prompt.toLowerCase().includes("week")) {
      prompt += "\n\nIMPORTANT: Specifically call out what energies are present for growth and opportunity this week. Name them clearly.";
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { 
        maxOutputTokens: max_tokens || 2000, 
        temperature: 0.9,
        topP: 0.9
      }
    });

    const response = result.response;
    let text = "";
    
    try {
      text = response.text();
    } catch (e) {
      const candidates = response.candidates;
      if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
        text = candidates[0].content.parts.map(p => p.text || "").join("");
      }
    }

    if (!text || !text.trim()) {
      console.error("Empty response from Gemini:", JSON.stringify(response, null, 2));
      return res.status(500).json({ error: "Gemini returned empty response, try again" });
    }

    return res.status(200).json({
      content: [{ text: text.trim() }],
      stop_reason: "stop"
    });

  } catch (e) {
    console.error("Gemini error:", e);
    return res.status(500).json({ error: e.message || "Gemini generation failed" });
  }
}
