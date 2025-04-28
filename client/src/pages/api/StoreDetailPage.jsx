import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StoreDetailHeader } from '../../components/storedetails/StoreDetailHeader';
import { StoreLocation } from '../../components/storedetails/StoreLocation';

export default function StoreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoreDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/stores/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error('Error fetching store detail:', error);
        setStore(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreDetail();
  }, [id]);

  // 返回按鈕處理
  const handleBack = () => {
    navigate('/locations');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : store ? (
            <>
              {/* 門市標題和圖片 */}
              <StoreDetailHeader
                name={store.name}
                image={store.detailImage || store.image}
                onBack={handleBack}
              />

              {/* 門市資訊 */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
                <div className="space-y-3">
                  {/* 門市地址 */}
                  <div className="flex items-start">
                    <span className="font-medium w-24 shrink-0">門市地址：</span>
                    <div>
                      <span className="text-gray-700">{store.address}</span>
                      <a
                        href={store.mapLink || `https://www.google.com/maps?q=${encodeURIComponent(store.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-block text-[#5a6440] font-medium hover:underline"
                      >
                        (MAP)
                      </a>
                    </div>
                  </div>

                  {/* 門市電話 */}
                  <div className="flex items-start">
                    <span className="font-medium w-24 shrink-0">聯絡電話：</span>
                    <span className="text-gray-700">{store.phone}</span>
                  </div>

                  {/* 營業時間 */}
                  <div className="flex items-start">
                    <span className="font-medium w-24 shrink-0">營業時間：</span>
                    <div className="text-gray-700">
                      {store.hours.weekday && <div>{store.hours.weekday}</div>}
                      {store.hours.weekend && <div>{store.hours.weekend}</div>}
                      {store.hours.default && <div>{store.hours.default}</div>}
                      {store.note && (
                        <div className="text-xs text-gray-500 mt-1">{store.note}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 線上點餐按鈕 */}
              {store.onlineOrder && (
                <div className="text-center mb-8">
                  <button
                    className="bg-[#5a6440] text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={() => navigate('/order', { state: { storeId: store.id } })}
                  >
                    線上點餐
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">找不到此門市資料</p>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-[#5a6440] text-white rounded hover:bg-opacity-90"
              >
                返回門市列表
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
