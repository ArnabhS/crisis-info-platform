import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function extractCoordinates(text) {
  const regex = /([+-]?\d{1,3}(?:\.\d+)?),\s*([+-]?\d{1,3}(?:\.\d+)?)/g;
  const matches = [...text.matchAll(regex)];
  return matches.map(match => ({
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  }));
}

async function getRedZoneCoordinates() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a geospatial analyst AI. Based on recent India-Pakistan border tensions, provide 5 real-world red zone/conflict zone coordinates.

- Format each as: latitude, longitude
- Keep it strictly to real known zones (e.g. LOC, Siachen, Poonch, etc.)
- Do not explain, only output like:

1. 34.1708, 74.8297
2. ...

Just return the list of coordinates.
`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    const coords = extractCoordinates(rawText);
    console.log("Extracted Coordinates:", coords);

    return coords;
  } catch (error) {
    console.error("Gemini Red Zone Error:", error.message);
    return [];
  }
}

export default getRedZoneCoordinates;
