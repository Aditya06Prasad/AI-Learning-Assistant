import { GoogleGenAI } from "@google/genai";

try {
  const ai = new GoogleGenAI({ apiKey: "dummy" });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Test",
  });
  console.log(response);
} catch(e) {
  console.error("ERROR CAUGHT", e);
}
