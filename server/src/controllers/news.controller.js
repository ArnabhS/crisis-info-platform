
import getVerifiedNews from "../utils/newsAgent.js";

export const getNews = async (req, res) => {
   try {
    const news = await getVerifiedNews();
    return res.status(200).json(news);
  } catch (err) {
    console.error("News fetch error:", err);
    res.status(500).json({ message: "Failed to fetch verified news." });
  }
};

