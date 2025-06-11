import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSidebar({ activeSection, setActiveSection, user }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'personal-info', label: '個人資料' },
    { id: 'change-password', label: '變更密碼' },
    { id: 'orders', label: '訂單記錄' },
    { id: 'addresses', label: '配送地址' }
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('https://tea-system.sdpmlab.org/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        // 清除用戶資訊
        localStorage.removeItem('userDisplay');

        // 清除購物車資料
        localStorage.removeItem('cart');
        localStorage.removeItem('checkoutItems');

        // 觸發購物車更新事件
        window.dispatchEvent(new Event('cartUpdated'));

        // 導航到首頁
        navigate('/');
      } else {
        console.error('登出失敗');
        setError('登出失敗，請稍後再試');
      }
    } catch (error) {
      console.error('登出請求錯誤:', error);
      setError('登出時發生錯誤，請稍後再試');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-700">會員中心</h2>
      </div>
      <nav>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left py-3 px-4 ${activeSection === item.id
                ? 'bg-gray-100 border-l-4 border-[#4a5332] text-[#4a5332]'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50"
        >
          登出
        </button>
      </nav>
    </div>
  );
}
