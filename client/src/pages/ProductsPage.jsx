import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductSidebar } from '../components/products/ProductSidebar';
import { DrinkDetailModal } from '../components/products/DrinkDetailModal';

// 引入拆分後的元件
import { RecommendedSection } from '../components/products/RecommendedSection';
import { ClassicSection } from '../components/products/ClassicSection';
import { SpecialSection } from '../components/products/SpecialSection';
import { MixSection } from '../components/products/MixSection';
import { MenuSection } from '../components/products/MenuSection';

export default function ProductsPage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState({
    recommended: [],
    classic: [],
    special: [],
    mix: []
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 檢查用戶是否已登入
  useEffect(() => {
    const userJSON = localStorage.getItem('userDisplay');
    setIsLoggedIn(!!userJSON);
  }, []);

  // 從API獲取產品數據
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/products/categories');
        const result = await response.json();

        if (result.status === 'success') {
          setProducts({
            recommended: result.data.recommended || [],
            classic: result.data.classic || [],
            special: result.data.special || [],
            mix: result.data.mix || []
          });
        } else {
          console.error('獲取產品數據失敗:', result.message);
        }
      } catch (error) {
        console.error('獲取產品數據時發生錯誤:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 處理錨點滾動
  useEffect(() => {
    if (location.hash) {
      // 延遲一下以確保頁面完全渲染
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // 處理產品點擊
  const handleProductClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const result = await response.json();

      if (result.status === 'success') {
        setSelectedProduct(result.data);
        setShowModal(true);
      } else {
        console.error('獲取產品詳情失敗:', result.message);
      }
    } catch (error) {
      console.error('獲取產品詳情時發生錯誤:', error);
    }
  };

  // 處理關閉彈窗
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5a6440] mx-auto mb-4"></div>
            <p className="text-gray-600">載入產品資料中...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* 主體內容區 */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex">
        {/* 左側邊欄 - 調整成附圖樣式 */}
        <ProductSidebar />

        {/* 右側主要內容區 */}
        <main className="flex-grow md:ml-64 pl-6">
          {/* 推薦飲品區塊 */}
          <RecommendedSection
            recommendedDrinksData={products.recommended}
            onProductClick={handleProductClick}
          />

          <hr className="my-12 border-gray-300" />

          {/* 經典茶品區塊 */}
          <ClassicSection
            classicDrinksData={products.classic}
            onProductClick={handleProductClick}
          />

          <hr className="my-12 border-gray-300" />

          {/* SPECIAL 區塊 */}
          <SpecialSection
            specialDrinksData={products.special}
            onProductClick={handleProductClick}
          />

          <hr className="my-12 border-gray-300" />

          {/* 特調系列區塊 */}
          <MixSection
            mixDrinksData={products.mix}
            onProductClick={handleProductClick}
          />

          <hr className="my-12 border-gray-300" />

          {/* 菜單區塊 */}
          <MenuSection />
        </main>
      </div> {/* End container */}

      {/* 飲品詳情彈窗 */}
      {showModal && (
        <DrinkDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          isLoggedIn={isLoggedIn}
        />
      )}

      <Footer />
    </div>
  );
}
