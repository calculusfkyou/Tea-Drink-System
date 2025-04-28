import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { NewsHeader } from '../../components/news/NewsHeader';
import { NewsCategories } from '../../components/news/NewsCategories';
import { NewsCard } from '../../components/news/NewsCard';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '重要公告', '新品發售', '新店開張'];

  // 加載新聞資料
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // 如果在本地開發環境，需確保代理設置正確
        const apiUrl = `/api/news${activeCategory !== '全部' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`;
        const response = await axios.get(apiUrl);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  // 處理分類變更
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* 頁面標頭 */}
        <NewsHeader />

        {/* 主要內容區 */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* 分類選單 */}
          <NewsCategories
            categories={categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />

          {/* 新聞卡片網格 */}
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="w-10 h-10 border-4 border-[#5a6440] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">此分類目前沒有消息</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
