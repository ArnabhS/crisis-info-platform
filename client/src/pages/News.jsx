import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/common/Loader'; 

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/news`)
      .then(res => {
        console.log("Fetched News:", res.data);
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className=" text-white min-h-screen p-6 max-w-[80%] mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📰 Top News</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {news.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg p-5 shadow-lg transition hover:scale-[1.02] hover:shadow-blue-500/30"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-400 hover:underline"
              >
                {item.title}
              </a>

              <p className="text-gray-300 mt-2 text-sm">{item.description}</p>

              {item.summary && (
                <div className="mt-3 text-sm text-gray-200">
                  <strong className="text-gray-400">Summary:</strong> {item.summary}
                </div>
              )}

              {item.publishedAt && (
                <div className="mt-3 text-xs text-gray-400 border-t border-gray-700 pt-3">
                  <span className="font-semibold text-gray-500">Published:</span>{' '}
                  {new Date(item.publishedAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
