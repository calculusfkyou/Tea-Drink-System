import React, { useState } from 'react';

export default function PasswordChangeSection({ user }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    // 客戶端驗證
    if (formData.newPassword !== formData.confirmPassword) {
      setError('新密碼與確認密碼不符');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('新密碼長度至少需要8個字元');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '密碼更新失敗');
      }

      setSuccessMessage('密碼已成功更新');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('更新密碼錯誤:', err);
      setError(err.message || '無法更新密碼，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">變更密碼</h2>

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
          {/* 目前密碼 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="currentPassword">目前密碼</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              required
            />
          </div>

          {/* 新密碼 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="newPassword">新密碼</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">密碼長度至少需要8個字元</p>
          </div>

          {/* 確認新密碼 */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">確認新密碼</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4a5332]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-[#4a5332] text-white rounded hover:bg-[#3c4c31] disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? '處理中...' : '更新密碼'}
        </button>
      </form>
    </div>
  );
}
