import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { NewsHeader } from '../../components/news/NewsHeader';
import { NewsCategories } from '../../components/news/NewsCategories';
import { NewsCard } from '../../components/news/NewsCard';

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '重要公告', '新店開幕', '新品摸摸'];

  // 獲取新聞資料
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // 使用分類過濾
        const apiUrl = `/api/news${activeCategory !== '全部' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`;
        const response = await axios.get(apiUrl);

        // 格式化日期 (因為資料庫中的日期格式可能與顯示不同)
        const formattedNews = response.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }));

        setNewsData(formattedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        // 備用錯誤處理...
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  // 過濾新聞
  const filteredNews = activeCategory === '全部'
    ? newsData
    : newsData.filter(news => news.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <NewsHeader />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* 分類選擇器 */}
          <NewsCategories
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          {/* 新聞內容 */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-64 rounded animate-pulse"></div>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <NewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  date={news.date}
                  category={news.category}
                  image={news.image}
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
