import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCartIcon() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // 檢查用戶登入狀態
    const checkLoginStatus = () => {
      const userDisplay = localStorage.getItem('userDisplay');
      setIsLoggedIn(!!userDisplay);

      // 獲取購物車項目數量
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setItemCount(count);
    };

    checkLoginStatus();

    // 監聽 storage 事件
    window.addEventListener('storage', checkLoginStatus);

    // 添加自定義事件監聽器，用於其他組件更新購物車時通知
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setItemCount(count);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // 立即檢查一次
    handleCartUpdate();

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <Link to={isLoggedIn ? "/cart" : "/login"} className="relative p-1">
      <svg
        className="w-6 h-6 text-gray-600 hover:text-[#4a5332]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
      </svg>

      {/* 顯示購物車數量 */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
