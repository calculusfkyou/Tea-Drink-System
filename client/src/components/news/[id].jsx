import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/news/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        if (error.response?.status === 404) {
          // 如果新聞不存在，可以添加處理邏輯
        }
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="w-10 h-10 border-4 border-[#5a6440] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : news ? (
            <>
              {/* 返回按鈕 */}
              <button
                onClick={handleBack}
                className="flex items-center text-[#5a6440] mb-6 hover:underline"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回最新消息
              </button>

              {/* 標題與日期 */}
              <h1 className="text-3xl font-semibold text-gray-800 mb-3">{news.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>{news.date}</span>
                <span className="mx-2">|</span>
                <span className="text-[#5a6440]">{news.category}</span>
              </div>

              {/* 主圖 */}
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto"
                />
              </div>

              {/* 內容 */}
              <div className="prose prose-lg max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">找不到此消息</p>
              <button
                onClick={handleBack}
                className="mt-4 text-[#5a6440] hover:underline"
              >
                返回最新消息列表
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
