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
        // 如果將來實作真正的 API，可以在這裡添加分類過濾邏輯
        const response = await axios.get('/api/news');
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
        // 備用靜態資料
        setNewsData([
          {
            id: 1,
            title: "SGS檢驗報告-吸管",
            date: "Jan 09, 2025",
            category: "食品安全",
            image: "/assets/news/news-1.jpg",
            content: "本報告詳細記錄了我們吸管的食品安全檢測結果，確保顧客使用時的安全..."
          },
          {
            id: 2,
            title: "號外！新店開新店啦",
            date: "Jan 09, 2025",
            category: "新店開幕",
            image: "/assets/news/news-2.jpg",
            content: "我們很高興宣布，拾玖茶屋即將於台北市信義區開設新門市..."
          },
          {
            id: 3,
            title: "SGS檢驗報告-糯米香茶",
            date: "Dec 23, 2024",
            category: "食品安全",
            image: "/assets/news/news-3.jpg",
            content: "本次檢驗重點在於我們招牌的糯米香茶，檢測結果顯示無任何農藥殘留..."
          },
          {
            id: 4,
            title: "【新店開張】土城學府店 3.4 試營運",
            date: "March 02, 2024",
            category: "新店開幕",
            image: "/assets/news/news-4.jpg",
            content: "拾玖茶屋土城學府店將於 3 月 4 日開始試營運！試營運期間，全品項飲品享有優惠..."
          },
          {
            id: 5,
            title: "【新品上市】初夏限定 - 繽紛水果茶系列",
            date: "May 15, 2024",
            category: "新品發售",
            image: "/assets/news/news-5.jpg",
            content: "初夏限定，繽紛水果茶系列驚喜登場！選用時令水果，搭配特調茶基底，打造出清爽解膩的獨特風味..."
          },
          {
            id: 6,
            title: "【重要公告】食品安全檢驗報告公開",
            date: "April 20, 2024",
            category: "重要公告",
            image: "/assets/news/news-6.jpg",
            content: "拾玖茶屋一直致力於提供安全健康的飲品。我們很高興地宣布，最新一季的SGS食品安全檢驗報告已公布..."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

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
