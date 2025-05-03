import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import UserInfoSection from '../components/profile/UserInfoSection';
import PasswordChangeSection from '../components/profile/PasswordChangeSection';
import OrderHistorySection from '../components/profile/OrderHistorySection';
import AddressSection from '../components/profile/AddressSection';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('personal-info');
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查用戶是否登入
    const userDisplay = localStorage.getItem('userDisplay');
    if (!userDisplay) {
      navigate('/login');
      return;
    }

    // 從後端獲取用戶資料
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            // 未授權，跳轉登入頁面
            localStorage.removeItem('userDisplay');
            navigate('/login');
            return;
          }
          throw new Error('無法獲取用戶資料');
        }

        const userData = await response.json();
        setUser(userData.data);
      } catch (err) {
        console.error('獲取用戶資料錯誤:', err);
        setError('無法載入用戶資料，請重新登入');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // 添加登出功能
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        // 清除本地存儲
        localStorage.removeItem('userDisplay');
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

  // 渲染對應區塊的內容
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal-info':
        return <UserInfoSection user={user} setUser={setUser} />;
      case 'change-password':
        return <PasswordChangeSection user={user} />;
      case 'orders':
        return <OrderHistorySection user={user} />;
      case 'addresses':
        return <AddressSection user={user} />;
      default:
        return <UserInfoSection user={user} setUser={setUser} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-100 p-4 rounded-md text-red-700">
            <p>{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 bg-[#4a5332] text-white rounded hover:bg-[#3c4c31]"
            >
              重新登入
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* 個人資料頁面標題 */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* 用戶頭像 */}
              <div className="h-20 w-20 rounded-full overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="用戶頭像"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[#4a5332] text-white flex items-center justify-center text-xl">
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
              </div>

              {/* 用戶基本信息 */}
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-semibold text-gray-800">{user?.name || '用戶'}</h1>
                <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  {user?.role && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                      {user.role === 'admin' ? '管理員' : user.role === 'manager' ? '經理' : '一般會員'}
                    </span>
                  )}
                  {user?.isVerified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      已驗證
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 側邊欄導航 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium text-gray-700">會員中心</h2>
              </div>
              <nav>
                <button
                  onClick={() => setActiveSection('personal-info')}
                  className={`w-full text-left py-3 px-4 ${activeSection === 'personal-info'
                      ? 'bg-gray-100 border-l-4 border-[#4a5332] text-[#4a5332]'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  個人資料
                </button>
                <button
                  onClick={() => setActiveSection('change-password')}
                  className={`w-full text-left py-3 px-4 ${activeSection === 'change-password'
                      ? 'bg-gray-100 border-l-4 border-[#4a5332] text-[#4a5332]'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  變更密碼
                </button>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`w-full text-left py-3 px-4 ${activeSection === 'orders'
                      ? 'bg-gray-100 border-l-4 border-[#4a5332] text-[#4a5332]'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  訂單記錄
                </button>
                <button
                  onClick={() => setActiveSection('addresses')}
                  className={`w-full text-left py-3 px-4 ${activeSection === 'addresses'
                      ? 'bg-gray-100 border-l-4 border-[#4a5332] text-[#4a5332]'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  配送地址
                </button>

                {/* 添加登出按鈕 */}
                <div className="border-t border-gray-200 mt-2"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  登出
                </button>
              </nav>
            </div>

            {/* 主內容區域 */}
            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
