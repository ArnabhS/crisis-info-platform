import Parser from "rss-parser";
import { GoogleGenerativeAI } from "@google/generative-ai"

const parser = new Parser();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function fetchNewsRSS() {
  const feed = await parser.parseURL(
    "https://news.google.com/rss/search?q=India+Pakistan+conflict&hl=en-IN&gl=IN&ceid=IN:en"
  );
  
  return feed.items.slice(0, 10); 
}


async function analyzeWithGemini(newsItem) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an expert news analyst AI. Analyze the following news article:

Title: ${newsItem.title}
Snippet: ${newsItem.contentSnippet}

### Instructions


1.Current Events: Present real-time updates on military movements, diplomatic talks, and significant incidents related to the conflict.Ensure the information is sourced from credible news outlets and official statements.
2.Analysis: Offer insightful analysis on the implications of current events for regional stability, international relations, and potential future developments.
3.Humanitarian Impact: Highlight the effects of the conflict on civilians, including displacement, casualties, and humanitarian efforts.
4.Diverse Perspectives: Include viewpoints from various stakeholders, such as government officials, military analysts, local communities, and international observers.
5.Fact-Checking: Verify all claims and statistics provided in your articles.Include citations and links to original sources.
6.Tone and Style: Maintain a neutral and informative tone.Avoid sensationalism and ensure language is accessible to a wide audience

Questions:
1. Is this article credible and relevant to the India-Pakistan conflict? (Answer: "yes" or "no")
2. Provide a 2-sentence summary if it's relevant.

Respond in the following JSON format:
{
  "credible": "yes" or "no",
  "summary": "..."
}
`;

  const result = await model.generateContent(prompt);
  
  let response = await result.response.text();

  response = response
  .replace(/```json|```/g, '')  // remove markdown code fences
  .replace(/,\s*}/g, '}')       // remove trailing commas
  .trim();  
  try {
    const parsed = JSON.parse(response);
    console.log(parsed);
    return parsed;
  } catch (err) {
    console.warn("Failed to parse response:", response);
    return null;
  }
}

async function getVerifiedNews() {
  const newsItems = await fetchNewsRSS();
  const verifiedNews = [];

  for (const item of newsItems) {
    const result = await analyzeWithGemini(item);
    console.log(result)
    if (result?.credible === "yes") {

      verifiedNews.push({
        title: item.title,
        url: item.link,
        publishedAt: item.pubDate,
        summary: result.summary,
        source: item.creator || null,
      });
    }
  }

  return verifiedNews;
}

export default getVerifiedNews;