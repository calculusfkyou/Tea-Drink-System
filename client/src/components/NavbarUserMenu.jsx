import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function NavbarUserMenu() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // 頁面載入時檢查登入狀態
    const checkLoginStatus = () => {
      try {
        // 從 localStorage 獲取用戶資訊
        const userJSON = localStorage.getItem('userDisplay');
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUser(userData);
        }
      } catch (error) {
        console.error('獲取用戶資訊失敗:', error);
      }
    };

    checkLoginStatus();

    // 監聽 storage 事件，當其他頁面登入/登出時更新狀態
    window.addEventListener('storage', checkLoginStatus);

    // 監聽自定義的頭像更新事件
    window.addEventListener('avatarUpdated', checkLoginStatus);

    // 點擊外部關閉下拉選單
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('avatarUpdated', checkLoginStatus);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 處理登出
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        // 清除 localStorage
        localStorage.removeItem('userDisplay');
        // 重置用戶狀態
        setUser(null);
        setDropdownOpen(false);
        // 導航到首頁
        navigate('/');
      } else {
        console.error('登出失敗');
      }
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  // 切換下拉選單
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 如果用戶未登入，顯示註冊/登入按鈕
  if (!user) {
    return (
      <>
        <a href="/register" className="text-sm text-gray-600 hover:text-[#4a5332]">註冊</a>
        <a href="/login" className="text-sm bg-[#4a5332] text-white px-4 py-2 rounded transition-colors hover:bg-[#3c4c31] hover:text-white">登入</a>
      </>
    );
  }

  // 用戶已登入，顯示用戶頭像和下拉選單
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors duration-200"
      >
        <span className="text-sm text-gray-700">{user.name}</span>
        <div className="h-8 w-8 rounded-full overflow-hidden">
          {user.avatar ? (
            <img
              key={Date.now()} // 使用時間戳作為key強制重新渲染
              src={user.avatar} // 直接使用頭像數據，不需要處理路徑
              alt="用戶頭像"
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error('頭像載入失敗');
                e.target.onerror = null;
                e.target.src = ''; // 清空來顯示預設圖標
              }}
            />
          ) : (
            <div className="h-full w-full bg-[#4a5332] text-white flex items-center justify-center text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉選單 */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setDropdownOpen(false)}
            >
              個人檔案
            </Link>

            {/* 管理員選項 - 只有管理員才顯示 */}
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setDropdownOpen(false)}
              >
                管理員儀表板
              </Link>
            )}

            <hr className="my-1" />

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              登出
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
