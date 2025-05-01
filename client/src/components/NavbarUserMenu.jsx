import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function NavbarUserMenu() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // 發送登出請求
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        // 清除本地存儲
        localStorage.removeItem('userDisplay');

        // 重置用戶狀態
        setUser(null);

        // 關閉下拉選單
        setIsDropdownOpen(false);

        // 導航到首頁
        navigate('/');
      } else {
        console.error('登出失敗');
      }
    } catch (error) {
      console.error('登出請求失敗:', error);
    }
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

  // 用戶已登入，顯示用戶選單
  return (
    <Link to="/profile" className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">{user.name}</span>
      <div className="h-8 w-8 rounded-full bg-[#4a5332] text-white flex items-center justify-center text-sm">
        {user.name.charAt(0).toUpperCase()}
      </div>
    </Link>
  );
}
