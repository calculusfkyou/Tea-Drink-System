import React, { useState, useEffect } from 'react';

export default function ProfileHeader({ user: propUser }) {
  const [user, setUser] = useState(null);

  // 修復頭像URL的函數
  const fixAvatarUrl = (userData) => {
    if (!userData) return userData;

    const fixedUser = {...userData};
    if (fixedUser.avatar) {
      // 移除可能存在的服務器前綴
      if (fixedUser.avatar.includes('localhost:5000data:')) {
        console.log("修復頭像URL - 移除服務器前綴");
        fixedUser.avatar = fixedUser.avatar.replace('http://localhost:5000', '');
        fixedUser.avatar = fixedUser.avatar.replace('https://localhost:5000', '');
      }

      // 確保URL以data:開頭
      if (!fixedUser.avatar.startsWith('data:') && fixedUser.avatar.includes('data:')) {
        console.log("修復頭像URL - 修正格式");
        fixedUser.avatar = 'data:' + fixedUser.avatar.split('data:')[1];
      }
    }
    return fixedUser;
  };

  useEffect(() => {
    // 頁面載入時檢查登入狀態
    const updateUserData = () => {
      try {
        // 從 localStorage 獲取用戶資訊
        const userJSON = localStorage.getItem('userDisplay');
        if (userJSON) {
          let userData = JSON.parse(userJSON);
          userData = fixAvatarUrl(userData);
          console.log("ProfileHeader: 從localStorage讀取用戶資料");
          setUser(userData);
        } else if (propUser) {
          const fixedPropUser = fixAvatarUrl(propUser);
          console.log("ProfileHeader: 使用props中的用戶資料");
          setUser(fixedPropUser);
        }
      } catch (error) {
        console.error('獲取用戶資訊失敗:', error);
        if (propUser) {
          setUser(fixAvatarUrl(propUser));
        }
      }
    };

    updateUserData();

    // 監聽自定義的頭像更新事件
    window.addEventListener('avatarUpdated', updateUserData);
    // 監聽 storage 事件
    window.addEventListener('storage', updateUserData);

    return () => {
      window.removeEventListener('avatarUpdated', updateUserData);
      window.removeEventListener('storage', updateUserData);
    };
  }, [propUser]);

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* 用戶頭像 */}
        <div className="h-20 w-20 rounded-full overflow-hidden">
          {user?.avatar ? (
            <img
              key={Date.now()} // 使用時間戳作為key強制重新渲染
              src={
                // 強制移除URL前綴
                user.avatar?.includes('localhost:5000data:')
                  ? user.avatar.replace('http://localhost:5000', '').replace('https://localhost:5000', '')
                  : !user.avatar?.startsWith('data:') && user.avatar?.includes('data:')
                    ? 'data:' + user.avatar.split('data:')[1]
                    : user.avatar
              }
              alt="用戶頭像"
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error('頭像載入失敗', user.avatar?.substring(0, 30));
                e.target.onerror = null;
                e.target.style.display = 'none'; // 隱藏圖片元素
              }}
            />
          ) : (
            <div className="h-full w-full bg-[#4a5332] text-white flex items-center justify-center text-xl">
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>

        {/* 用戶信息 */}
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
  );
}
