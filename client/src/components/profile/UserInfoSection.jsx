import React, { useState, useRef } from 'react';

export default function UserInfoSection({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  // 處理表單輸入變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理點擊頭像
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // 處理文件選擇
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 驗證文件類型
    if (!file.type.startsWith('image/')) {
      setError('請選擇圖片文件');
      return;
    }

    // 驗證文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('圖片大小不能超過 5MB');
      return;
    }

    try {
      // 顯示本地預覽
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // 上傳到伺服器
      setUploadingAvatar(true);
      setError('');
      setSuccessMessage('');

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('http://localhost:5000/api/auth/avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '更新頭像失敗');
      }

      const data = await response.json();
      setUser(data.data);

      // 更新本地儲存
      const userDisplay = JSON.parse(localStorage.getItem('userDisplay') || '{}');
      const newUserDisplay = {
        ...userDisplay,
        avatar: data.data.avatar
      };
      localStorage.setItem('userDisplay', JSON.stringify(newUserDisplay));

      // 分派事件通知導航列更新
      window.dispatchEvent(new Event('avatarUpdated'));

      setSuccessMessage('頭像更新成功');

      // 延遲500毫秒後再次觸發更新事件，確保其他元件能接收到變化
      setTimeout(() => {
        window.dispatchEvent(new Event('avatarUpdated'));
      }, 500);

    } catch (err) {
      console.error('上傳頭像錯誤:', err);
      setError(err.message || '無法上傳頭像，請稍後再試');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // 原有的提交表單功能
  const handleSubmit = async (e) => {
    // 保留現有邏輯
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '更新失敗');
      }

      const data = await response.json();
      setUser(data.data);

      // 更新本地存儲的用戶顯示資訊
      const userDisplay = JSON.parse(localStorage.getItem('userDisplay') || '{}');
      localStorage.setItem('userDisplay', JSON.stringify({
        ...userDisplay,
        name: formData.name,
        email: formData.email
      }));

      setSuccessMessage('個人資料已更新成功');
      setIsEditing(false);
    } catch (err) {
      console.error('更新個人資料錯誤:', err);
      setError(err.message || '無法更新個人資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const serverUrl = 'http://localhost:5000';
  const defaultAvatarUrl = user?.avatar || null;
  const avatarDisplay = avatarPreview || defaultAvatarUrl;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">個人資料</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            編輯資料
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* 頭像上傳區域 */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="relative h-24 w-24 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
          onClick={handleAvatarClick}
        >
          {avatarDisplay ? (
            <img
              src={avatarDisplay.startsWith('http') || avatarDisplay.startsWith('data:') ?
                avatarDisplay : `${serverUrl}${avatarDisplay}`}
              alt="頭像"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#4a5332] text-white flex items-center justify-center text-3xl">
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </div>
          )}

          {/* 上傳中的覆蓋層 */}
          {uploadingAvatar && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white"></div>
            </div>
          )}

          {/* 提示覆蓋層 */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all">
            <span className="text-white opacity-0 hover:opacity-100">更換頭像</span>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <p className="text-sm text-gray-500 mt-2">點擊頭像更換</p>
      </div>

      {/* 保留原有的表單部分 */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* 姓名 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">姓名</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              required
              disabled={!isEditing}
            />
          </div>

          {/* 電子信箱 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">電子信箱</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              required
              disabled={!isEditing}
            />
          </div>

          {/* 電話 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="phone">電話</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* 編輯模式下的按鈕 */}
        {isEditing && (
          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#4a5332] text-white rounded hover:bg-[#3c4c31] disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? '儲存中...' : '儲存變更'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || ''
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={loading}
            >
              取消
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
