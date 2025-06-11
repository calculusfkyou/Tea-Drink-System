import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiFilter } from 'react-icons/fi';
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
function DeleteConfirmModal({ news, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">確認刪除新聞</h3>
        <p className="text-gray-600 mb-6">
          您確定要刪除新聞 <span className="font-semibold">"{news.title}"</span>？此操作無法恢復。
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

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 獲取所有新聞數據
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://tea-system.sdpmlab.org/api/news/admin/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('獲取新聞數據失敗');
      }

      const result = await response.json();
      setNews(result.data || []);
    } catch (error) {
      console.error('獲取新聞列表失敗:', error);
      setError('無法載入新聞資料，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 處理刪除新聞
  const handleDeleteNews = async (newsId) => {
    try {
      const response = await fetch(`https://tea-system.sdpmlab.org/api/news/admin/${newsId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('刪除新聞失敗');
      }

      // 更新本地新聞列表
      setNews(news.filter(item => item.id !== newsId));
      showToast('新聞已成功刪除', 'success');
    } catch (error) {
      console.error('刪除新聞失敗:', error);
      showToast(error.message || '刪除新聞失敗，請稍後再試', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  // 處理切換顯示狀態
  const handleToggleVisibility = async (newsId) => {
    try {
      const response = await fetch(`https://tea-system.sdpmlab.org/api/news/admin/${newsId}/toggle`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('切換顯示狀態失敗');
      }

      const result = await response.json();

      // 更新本地狀態
      setNews(news.map(item =>
        item.id === newsId ? { ...item, isHidden: result.data.isHidden } : item
      ));

      showToast(result.message, 'success');
    } catch (error) {
      console.error('切換顯示狀態失敗:', error);
      showToast('操作失敗，請稍後再試', 'error');
    }
  };

  // 顯示刪除確認對話框
  const openDeleteConfirm = (newsItem) => {
    setConfirmDelete(newsItem);
  };

  // 顯示通知
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 關閉通知
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // 過濾新聞
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'visible' && !item.isHidden) ||
                         (filterStatus === 'hidden' && item.isHidden);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 獲取所有分類
  const categories = [...new Set(news.map(item => item.category))];

  // 格式化日期
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW');
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

      {/* 刪除確認對話框 */}
      {confirmDelete && (
        <DeleteConfirmModal
          news={confirmDelete}
          onConfirm={() => handleDeleteNews(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* 頁面頭部 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">新聞管理</h1>
          <p className="text-gray-600">管理網站新聞和公告</p>
        </div>
        <Link
          to="/admin/news/new"
          className="bg-[#5a6440] text-white px-4 py-2 rounded-md hover:bg-[#47512f] transition-colors flex items-center"
        >
          <FiPlus className="mr-2" /> 新增新聞
        </Link>
      </div>

      {/* 搜尋和篩選工具列 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜尋欄位 */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="搜尋新聞標題或分類..."
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
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FiFilter className="mr-2" />
              篩選
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">分類</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                    >
                      <option value="all">所有分類</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">狀態</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#5a6440] focus:border-transparent"
                    >
                      <option value="all">所有狀態</option>
                      <option value="visible">已顯示</option>
                      <option value="hidden">已隱藏</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setFilterCategory('all');
                      setFilterStatus('all');
                      setShowFilterMenu(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    清除篩選
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 新聞列表 */}
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
                    新聞資訊
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分類
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.length > 0 ? (
                  filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-12 w-12 rounded-md object-cover mr-4"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {item.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isHidden ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.isHidden ? '已隱藏' : '已顯示'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleVisibility(item.id)}
                            className={`p-2 rounded-md transition-colors ${
                              item.isHidden
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-yellow-600 hover:bg-yellow-50'
                            }`}
                            title={item.isHidden ? '顯示新聞' : '隱藏新聞'}
                          >
                            {item.isHidden ? <FiEye /> : <FiEyeOff />}
                          </button>
                          <Link
                            to={`/admin/news/edit/${item.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="編輯新聞"
                          >
                            <FiEdit />
                          </Link>
                          <button
                            onClick={() => openDeleteConfirm(item)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="刪除新聞"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      沒有找到符合條件的新聞
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 統計資訊 */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">{news.length}</div>
            <div className="text-sm text-gray-500">總新聞數</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {news.filter(item => !item.isHidden).length}
            </div>
            <div className="text-sm text-gray-500">已顯示</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {news.filter(item => item.isHidden).length}
            </div>
            <div className="text-sm text-gray-500">已隱藏</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
