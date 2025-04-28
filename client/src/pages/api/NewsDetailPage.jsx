import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

// 引入拆分後的元件
import { NewsDetailHeader } from '../../components/newsdetails/NewsDetailHeader';
import { NewsDetailContent } from '../../components/newsdetails/NewsDetailContent';
import { NewsDetailSkeleton } from '../../components/newsdetails/NewsDetailSkeleton';
import { NewsNotFound } from '../../components/newsdetails/NewsNotFound';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/news/${id}`);
        setNews(response.data);

        // 獲取相關新聞（同一類別的其他新聞）
        if (response.data?.category) {
          try {
            const relatedRes = await axios.get(`/api/news?category=${response.data.category}&limit=2`);
            // 過濾掉當前的新聞
            const filtered = relatedRes.data.filter(item => item.id !== parseInt(id));
            setRelatedNews(filtered.slice(0, 2)); // 只取兩則相關新聞
          } catch (error) {
            console.error('Error fetching related news:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setNews(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  // 返回按鈕處理
  const handleBack = () => {
    navigate('/news');
  };

  // 分享功能
  const shareUrl = window.location.href;
  const shareTitle = news?.title || '摸摸茶坊 - 最新消息';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          {isLoading ? (
            <NewsDetailSkeleton />
          ) : news ? (
            <>
              {/* 使用拆分後的標題區域元件 */}
              <NewsDetailHeader
                title={news.title}
                date={news.date}
                category={news.category}
                onBack={handleBack}
              />

              {/* 使用拆分後的內容區域元件 */}
              <NewsDetailContent
                image={news.image}
                detailImage={news.detailImage}
                images={news.images}
                content={news.content}
                title={news.title}
                details={news.details}
              />

              {/* 分享區塊 */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">分享這則消息</h3>
                <div className="flex space-x-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="分享到 Facebook"
                    className="p-2 bg-[#1877f2] text-white rounded-full"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://line.me/R/msg/text/?${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="分享到 LINE"
                    className="p-2 bg-[#00c300] text-white rounded-full"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* 相關新聞區塊 */}
              {relatedNews.length > 0 && (
                <div className="mt-12 border-t pt-8">
                  <h2 className="text-2xl font-bold mb-6">相關消息</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedNews.map(item => (
                      <div
                        key={item.id}
                        className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(`/news/${item.id}`)}
                      >
                        <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <NewsNotFound onBack={handleBack} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
