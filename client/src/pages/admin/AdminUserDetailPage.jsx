import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiUser, FiLock, FiCheckCircle, FiX, FiUpload } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-md shadow-md z-50 ${
      type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' :
      'bg-red-50 text-red-700 border-l-4 border-red-500'
    }`}>
      <div className="flex justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-4">×</button>
      </div>
    </div>
  );
}

export default function AdminUserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNewUser = userId === 'new';

  const [loading, setLoading] = useState(!isNewUser);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isVerified: false,
    password: '',
    confirmPassword: '',
    avatar: null
  });

  // 載入用戶資料
  useEffect(() => {
    if (isNewUser) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('獲取會員資料失敗');
        }

        const result = await response.json();
        setFormData({
          ...result.data,
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('獲取會員資料失敗:', error);
        showToast('獲取會員資料失敗，請稍後再試', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, isNewUser]);

  // 處理表單輸入變更
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 處理頭像上傳
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setFormData({
          ...formData,
          avatar: event.target.result
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // 表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 表單驗證
    if (!formData.name || !formData.email) {
      showToast('請填寫必填欄位', 'error');
      return;
    }

    if (isNewUser && !formData.password) {
      showToast('新會員需要設定密碼', 'error');
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      showToast('兩次輸入的密碼不一致', 'error');
      return;
    }

    if (formData.password && formData.password.length < 8) {
      showToast('密碼長度至少需要8個字元', 'error');
      return;
    }

    try {
      setSaving(true);

      // 準備請求資料
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        role: formData.role,
        isVerified: formData.isVerified
      };

      // 僅在密碼有值時包含密碼欄位
      if (formData.password) {
        dataToSend.password = formData.password;
      }

      // 僅在修改頭像時包含頭像
      if (formData.avatar && formData.avatar !== null && formData.avatar.startsWith('data:')) {
        dataToSend.avatar = formData.avatar;
      }

      const url = isNewUser
        ? 'http://localhost:5000/api/auth/users'
        : `http://localhost:5000/api/auth/users/${userId}`;

      const method = isNewUser ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '保存會員資料失敗');
      }

      showToast(`會員資料已成功${isNewUser ? '創建' : '更新'}`, 'success');

      // 稍後導向會員列表
      setTimeout(() => {
        navigate('/admin/users');
      }, 1500);
    } catch (error) {
      console.error('保存會員資料失敗:', error);
      showToast(error.message || '操作失敗，請稍後再試', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 顯示通知
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 關閉通知
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // 發送重設密碼信
  const handleSendResetEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email })
      });

      if (!response.ok) {
        throw new Error('發送重設密碼郵件失敗');
      }

      showToast('已發送重設密碼郵件至會員信箱', 'success');
    } catch (error) {
      console.error('發送重設密碼郵件失敗:', error);
      showToast('發送重設密碼郵件失敗', 'error');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a6440]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Toast 通知 */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* 頁面頭部 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/admin/users" className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
            <FiArrowLeft className="mr-1" /> 返回會員列表
          </Link>
          <h1 className="text-2xl font-bold">{isNewUser ? '新增會員' : '編輯會員資料'}</h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#47512f] transition-colors flex items-center"
        >
          <FiSave className="mr-1" /> {saving ? '儲存中...' : '儲存會員'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 個人資訊 */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold border-b pb-2 flex items-center">
                <FiUser className="mr-2" /> 個人資訊
              </h2>

              {/* 頭像上傳 */}
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="頭像預覽"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-[#5a6440] text-white text-3xl font-semibold">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer border border-gray-300 hover:bg-gray-50">
                    <FiUpload className="text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>

              {/* 姓名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required
                />
              </div>

              {/* 電子郵件 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  電子郵件 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required
                />
              </div>

              {/* 電話 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  電話
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                />
              </div>

              {/* 角色 */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  會員角色
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                >
                  <option value="user">一般會員</option>
                  <option value="manager">店鋪經理</option>
                  <option value="admin">系統管理員</option>
                </select>
              </div>

              {/* 驗證狀態 */}
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isVerified"
                    name="isVerified"
                    checked={formData.isVerified}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
                  />
                  <label htmlFor="isVerified" className="ml-2 text-sm text-gray-700">
                    已驗證帳號
                  </label>
                </div>
              </div>
            </div>

            {/* 密碼設定 */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold border-b pb-2 flex items-center">
                <FiLock className="mr-2" /> 密碼設定
              </h2>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-4">
                  {isNewUser
                    ? '為新會員創建一個密碼，會員可以在登入後自行更改。'
                    : '如果需要重置密碼，請在下方輸入新密碼。若留空，現有密碼將保持不變。'}
                </p>
              </div>

              {/* 密碼 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {isNewUser ? '密碼' : '新密碼'} {isNewUser && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required={isNewUser}
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">密碼長度至少需要8個字元</p>
              </div>

              {/* 確認密碼 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  確認{isNewUser ? '密碼' : '新密碼'} {isNewUser && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required={isNewUser}
                />
              </div>

              {/* 如果是編輯現有會員，顯示重設密碼選項 */}
              {!isNewUser && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                  <div className="flex items-start">
                    <FiCheckCircle className="mt-0.5 mr-2 text-yellow-600" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">
                        其他選項
                      </h3>
                      <div className="mt-1 text-sm text-yellow-700">
                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                          onClick={handleSendResetEmail}
                        >
                          發送重設密碼電子郵件
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
