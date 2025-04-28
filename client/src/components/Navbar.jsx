import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarUserMenu } from './NavbarUserMenu';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 手機選單狀態

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/assets/Logo2.png" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* 桌面版導航 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="/" className="text-gray-600 hover:text-[#4a5332]">HOME</a>
          <a href="/about" className="text-gray-600 hover:text-[#4a5332]">關於摸摸茶</a>
          <a href="/news" className="text-gray-600 hover:text-[#4a5332]">最新消息</a>
          {/* 飲品介紹下拉選單 */}
          <div className="relative group">
            <a href="/products#recommended" className="text-gray-600 hover:text-[#4a5332] flex items-center">
              飲品介紹
              {/* 可選：加入向下箭頭圖標 */}
              <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
              <a href="/products#classic" className="block px-4 py-2 text-sm text-gray-700 hover:text-[#4a5332]">經典茶品</a>
              <a href="/products#special" className="block px-4 py-2 text-sm text-gray-700 hover:text-[#4a5332]">SPECIAL</a>
              <a href="/products#mix" className="block px-4 py-2 text-sm text-gray-700 hover:text-[#4a5332]">特調系列</a>
            </div>
          </div>
          <a href="/locations" className="text-gray-600 hover:text-[#4a5332]">門市資訊</a>
          <a href="/contact" className="text-[#4a5332] hover:text-[#3c4c31]">聯絡我們</a>
        </nav>

        {/* 桌面版 用戶選單或註冊/登入 */}
        <div className="hidden md:flex items-center space-x-4">
          <NavbarUserMenu />
        </div>

        {/* 手機版選單按鈕 */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 手機版彈出選單 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <a href="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">HOME</a>
            <a href="/news" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">最新消息</a>
            <a href="/products" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">飲品介紹</a>
            <a href="/locations" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">門市資訊</a>
            <a href="/contact" className="text-[#4a5332] hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">聯絡我們</a>
            <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-2">
              {/* 手機版用戶選單 */}
              <MobileUserMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// 手機版用戶選單組件
function MobileUserMenu() {
  // 獲取用戶資訊
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userJSON = localStorage.getItem('userDisplay');
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error('獲取用戶資訊失敗:', error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('userDisplay');
        setUser(null);
        navigate('/');
      }
    } catch (error) {
      console.error('登出請求失敗:', error);
    }
  };

  if (!user) {
    return (
      <>
        <a href="/register" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">註冊</a>
        <a href="/login" className="bg-[#4a5332] text-white text-center block px-3 py-2 rounded-md text-base font-medium hover:bg-[#3f4830]">登入</a>
      </>
    );
  }

  return (
    <>
      <div className="px-3 py-2 text-base font-medium flex items-center">
        <div className="h-8 w-8 rounded-full bg-[#4a5332] text-white flex items-center justify-center mr-2">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-700">{user.name}</span>
      </div>
      <a href="/profile" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">個人資料</a>
      <a href="/orders" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">訂單記錄</a>
      <button
        onClick={handleLogout}
        className="text-red-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
      >
        登出
      </button>
    </>
  );
}
