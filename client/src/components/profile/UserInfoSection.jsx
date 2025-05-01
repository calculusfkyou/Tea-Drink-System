import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
