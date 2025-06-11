import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiFilter, FiUser, FiUsers, FiCheck, FiX } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

// Toast 提示組件
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

// 刪除確認對話框組件
function DeleteConfirmModal({ user, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">確認刪除會員</h3>
        <p className="text-gray-600 mb-6">
          您確定要刪除會員 <span className="font-semibold">{user.name}</span> ({user.email})？此操作無法恢復。
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterVerified, setFilterVerified] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 獲取所有會員數據
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://tea-system.sdpmlab.org/api/auth/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('獲取會員數據失敗');
      }

      const result = await response.json();
      setUsers(result.data || []);
    } catch (error) {
      console.error('獲取會員列表失敗:', error);
      setError('無法載入會員資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 處理刪除會員
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://tea-system.sdpmlab.org/api/auth/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('刪除會員失敗');
      }

      // 更新本地會員列表
      setUsers(users.filter(user => user.id !== userId));
      showToast('會員已成功刪除', 'success');
    } catch (error) {
      console.error('刪除會員失敗:', error);
      showToast(error.message || '刪除會員失敗，請稍後再試', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  // 顯示刪除確認對話框
  const openDeleteConfirm = (user) => {
    setConfirmDelete(user);
  };

  // 顯示通知
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 關閉通知
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // 根據角色、驗證狀態和搜索詞過濾會員
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || user.role === filterRole;

    const matchesVerification =
      filterVerified === 'all' ||
      (filterVerified === 'verified' && user.isVerified) ||
      (filterVerified === 'unverified' && !user.isVerified);

    return matchesSearch && matchesRole && matchesVerification;
  });

  // 獲取角色名稱
  const getRoleName = (role) => {
    switch (role) {
      case 'admin': return '系統管理員';
      case 'manager': return '店鋪經理';
      case 'user': return '一般會員';
      default: return role;
    }
  };

  // 獲取角色標籤顏色
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };

  return (
    <AdminLayout>
      {/* Toast 通知 */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* 刪除確認對話框 */}
      {confirmDelete && (
        <DeleteConfirmModal
          user={confirmDelete}
          onConfirm={() => handleDeleteUser(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* 頁面頭部 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">會員管理</h1>
          <p className="text-gray-600">管理系統會員帳戶和權限</p>
        </div>
        <Link
          to="/admin/users/new"
          className="bg-[#5a6440] text-white px-4 py-2 rounded-md hover:bg-[#47512f] transition-colors flex items-center"
        >
          <FiPlus className="mr-2" /> 新增會員
        </Link>
      </div>

      {/* 搜尋和篩選工具列 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜尋欄位 */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="搜尋會員名稱或電子郵件..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* 篩選按鈕 */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <FiFilter className="mr-2" /> 篩選
            </button>

            {/* 篩選選單 */}
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 p-4">
                <h3 className="font-semibold mb-2">會員角色</h3>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      checked={filterRole === 'all'}
                      onChange={() => setFilterRole('all')}
                      className="mr-2"
                    />
                    <span>所有角色</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      checked={filterRole === 'admin'}
                      onChange={() => setFilterRole('admin')}
                      className="mr-2"
                    />
                    <span>系統管理員</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      checked={filterRole === 'manager'}
                      onChange={() => setFilterRole('manager')}
                      className="mr-2"
                    />
                    <span>店鋪經理</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      checked={filterRole === 'user'}
                      onChange={() => setFilterRole('user')}
                      className="mr-2"
                    />
                    <span>一般會員</span>
                  </label>
                </div>

                <h3 className="font-semibold mb-2">驗證狀態</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="verification"
                      checked={filterVerified === 'all'}
                      onChange={() => setFilterVerified('all')}
                      className="mr-2"
                    />
                    <span>所有狀態</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="verification"
                      checked={filterVerified === 'verified'}
                      onChange={() => setFilterVerified('verified')}
                      className="mr-2"
                    />
                    <span>已驗證</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="verification"
                      checked={filterVerified === 'unverified'}
                      onChange={() => setFilterVerified('unverified')}
                      className="mr-2"
                    />
                    <span>未驗證</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 會員列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a6440]"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    會員資訊
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    註冊日期
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={`${user.name}的頭像`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-[#5a6440] flex items-center justify-center text-white">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            {user.phone && <div className="text-xs text-gray-400">{user.phone}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {getRoleName(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`flex-shrink-0 h-4 w-4 rounded-full mr-1.5 ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                          <span className="text-sm text-gray-500">
                            {user.isVerified ? '已驗證' : '未驗證'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit className="inline mr-1" />
                          編輯
                        </Link>
                        <button
                          onClick={() => openDeleteConfirm(user)}
                          className={`text-red-600 hover:text-red-900 ${
                            user.role === 'admin' && user.email === 'admin@example.com'
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                          disabled={user.role === 'admin' && user.email === 'admin@example.com'}
                        >
                          <FiTrash2 className="inline mr-1" />
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      沒有符合條件的會員
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
