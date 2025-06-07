import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiPackage, FiGrid, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiHome, FiFileText, FiMapPin } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 執行登出操作
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      if (response.ok) {
        // 清除用戶資訊
        localStorage.removeItem('userDisplay');

        // 清除購物車資料
        localStorage.removeItem('cart');
        localStorage.removeItem('checkoutItems');

        // 觸發購物車更新事件
        window.dispatchEvent(new Event('cartUpdated'));

        // 重定向到登入頁面
        navigate('/login');
      }
    }).catch(error => {
      console.error('登出請求失敗:', error);
    });
  };

  const navigationItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: '儀表板' },
    { path: '/admin/orders', icon: <FiPackage />, label: '訂單管理' },
    { path: '/admin/products', icon: <FiGrid />, label: '產品管理' },
    { path: '/admin/users', icon: <FiUsers />, label: '會員管理' },
    { path: '/admin/news', icon: <FiFileText />, label: '新聞管理' },
    { path: '/admin/stores', icon: <FiMapPin />, label: '門市管理' },
    { path: '/admin/settings', icon: <FiSettings />, label: '網站設定' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 手機選單按鈕 */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* 側邊欄 */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-[#5a6440] text-white transition-transform transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold">茶飲系統</h1>
          <p className="text-sm opacity-75">管理後台</p>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm hover:bg-[#47512f] ${
                location.pathname === item.path ? 'bg-[#47512f]' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}        </nav>
        <div className="absolute bottom-0 w-full p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#47512f] rounded transition-colors"
          >
            <FiHome className="mr-2" />
            回到使用者頁面
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#47512f] rounded transition-colors"
          >
            <FiLogOut className="mr-2" />
            登出
          </button>
        </div>
      </div>

      {/* 主內容區 */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {navigationItems.find((item) => item.path === location.pathname)?.label || '管理後台'}
            </h1>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
