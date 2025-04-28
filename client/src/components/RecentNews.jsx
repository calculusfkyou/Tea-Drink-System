import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PostCard } from './PostCard'; // 注意：檔案名稱修正為 PostCard (首字母大寫)

export function RecentNews() {
  const [recentNewsData, setRecentNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 從 API 獲取最新消息
  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await axios.get('/api/news?limit=3');
        setRecentNewsData(response.data);
      } catch (error) {
        console.error('Error fetching recent news:', error);
        // 使用靜態資料作為備用
        setRecentNewsData([
          { id: 1, title: "SGS檢驗報告-吸管", date: "Jan 09, 2025", category: "食品安全", excerpt: "相關檢驗報告內容..." },
          { id: 2, title: "號外！新店開新店啦", date: "Jan 09, 2025", category: "新店開幕", excerpt: "詳細資訊..." },
          { id: 3, title: "SGS檢驗報告-糯米香茶", date: "Dec 23, 2024", category: "食品安全", excerpt: "相關檢驗報告內容..." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentNews();
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      {/* 標題和 READ MORE 按鈕 */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800">RECENTLY NEWS</h2>
          <h3 className="text-2xl md:text-3xl font-medium text-gray-700">最新消息</h3>
        </div>
        <a
          href="/news"
          className="inline-flex items-center px-6 py-2 border border-yellow-600 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-50 transition-colors"
        >
          READ MORE
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* 消息卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 h-64 rounded"></div>
          ))
        ) : (
          recentNewsData.map((news) => (
            <PostCard
              key={news.id}
              title={news.title}
              date={news.date}
              category={news.category}
              excerpt={news.excerpt}
              link={`/news/${news.id}`}
            />
          ))
        )}
      </div>
    </section>
  );
}
