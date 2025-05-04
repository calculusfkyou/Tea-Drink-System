import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DrinkDetailModal } from '../products/DrinkDetailModal';

export function RecommendedProducts({ cart }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 添加控制模態窗口的狀態
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 檢查用戶是否登入
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 檢查登入狀態
  useEffect(() => {
    const userJSON = localStorage.getItem('userDisplay');
    setIsLoggedIn(!!userJSON);
  }, []);

  // 根據購物車內容獲取推薦商品
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!cart || cart.length === 0) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        // 從購物車中提取類別
        const categories = [...new Set(cart.map(item => item.category).filter(Boolean))];
        console.log('購物車中的商品類別:', categories);

        // 從API獲取所有產品
        const response = await axios.get('/api/products');
        const allProducts = response.data.data || [];

        // 過濾掉已在購物車中的產品，並找出相關類別產品
        const cartProductIds = cart.map(item => item.productId.toString());
        let recommendedProducts = allProducts
          .filter(product =>
            !cartProductIds.includes(product.id.toString()) &&
            categories.includes(product.category)
          )
          .sort(() => 0.5 - Math.random()) // 隨機排序
          .slice(0, 4); // 最多取4個推薦

        // 如果推薦數量不足，添加一些其他類別的產品
        if (recommendedProducts.length < 4) {
          const otherProducts = allProducts
            .filter(product =>
              !cartProductIds.includes(product.id.toString()) &&
              !recommendedProducts.some(rec => rec.id === product.id)
            )
            .sort(() => 0.5 - Math.random())
            .slice(0, 4 - recommendedProducts.length);

          recommendedProducts = [...recommendedProducts, ...otherProducts];
        }

        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error('獲取推薦產品失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [cart]);

  // 處理產品點擊，打開模態窗口
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // 關閉模態窗口
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // 模態窗口關閉後顯示可選的成功通知
  const handleModalClose = () => {
    setShowModal(false);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">猜你喜歡</h2>
        <div className="flex justify-center">
          <div className="animate-pulse">載入中...</div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 relative">
      {/* 通知提示 */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 p-3 rounded shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* 飲品選購模態窗口 */}
      {showModal && selectedProduct && (
        <DrinkDetailModal
          product={selectedProduct}
          onClose={handleModalClose}
          isLoggedIn={isLoggedIn}
        />
      )}

      <h2 className="text-xl font-semibold mb-4 text-gray-800">猜你喜歡</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col border transition-transform hover:shadow-md cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="h-40 overflow-hidden rounded-md mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 flex-grow">{product.description?.substring(0, 50) || ' '}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#5a6440] font-medium">
                NT$ {product.priceL || product.priceM}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 防止觸發卡片點擊
                  handleProductClick(product);
                }}
                className="px-3 py-1 bg-[#5a6440] hover:bg-[#4a5332] text-white text-sm rounded-full"
              >
                選擇規格
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
