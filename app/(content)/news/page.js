"use client";

import NewsList from '@/components/news-list';
import { useState, useEffect } from 'react';


export default function NewsPage() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const response = await fetch('http://localhost:8080/news');

      if (!response.ok) {
        setLoading(false);
        setError('Faild to fetch news.')
      } else {
        error && setError(undefined);
        setLoading(false);
        const news = await response.json();
        setNews(news);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const newsContent = news ? <NewsList news={news} /> : null;

  return (
    <div id="news">
      <h1>News Page</h1>
      {newsContent}
    </div>
  );
}
