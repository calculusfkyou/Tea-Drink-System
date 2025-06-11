import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiImage } from 'react-icons/fi';
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

export default function AdminNewsEditPage() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isNewNews = newsId === 'new';

  const [loading, setLoading] = useState(!isNewNews);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: '',
    excerpt: '',
    image: '',
    detailImage: '',
    content: '',
    isHidden: false,
    details: {},
    images: []
  });

  // 預設分類選項
  const categoryOptions = [
    '新店開幕',
    '新品摸摸',
    '重要公告',
    '活動消息',
    '其他'
  ];

  // 載入新聞資料（編輯模式）
  useEffect(() => {
    if (!isNewNews) {
      fetchNewsData();
    }
  }, [newsId, isNewNews]);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://tea-system.sdpmlab.org/api/news/${newsId}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('獲取新聞資料失敗');
      }

      const newsData = await response.json();
      setFormData({
        title: newsData.title || '',
        date: newsData.date || '',
        category: newsData.category || '',
        excerpt: newsData.excerpt || '',
        image: newsData.image || '',
        detailImage: newsData.detailImage || '',
        content: newsData.content || '',
        isHidden: newsData.isHidden || false,
        details: newsData.details || {},
        images: newsData.images || []
      });
    } catch (error) {
      console.error('獲取新聞資料失敗:', error);
      showToast('獲取新聞資料失敗，請稍後再試', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 處理表單輸入變更
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 表單驗證
    if (!formData.title || !formData.date || !formData.category || !formData.content) {
      showToast('請填寫所有必填欄位', 'error');
      return;
    }

    try {
      setSaving(true);

      const url = isNewNews
        ? 'https://tea-system.sdpmlab.org/api/news/admin'
        : `https://tea-system.sdpmlab.org/api/news/admin/${newsId}`;

      const method = isNewNews ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '操作失敗');
      }

      showToast(
        isNewNews ? '新聞創建成功' : '新聞更新成功',
        'success'
      );

      // 延遲跳轉，讓用戶看到成功訊息
      setTimeout(() => {
        navigate('/admin/news');
      }, 1000);

    } catch (error) {
      console.error('儲存新聞失敗:', error);
      showToast(error.message || '儲存失敗，請稍後再試', 'error');
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
          <Link to="/admin/news" className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
            <FiArrowLeft className="mr-1" /> 返回新聞列表
          </Link>
          <h1 className="text-2xl font-bold">{isNewNews ? '新增新聞' : '編輯新聞'}</h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#47512f] transition-colors flex items-center"
        >
          <FiSave className="mr-2" />
          {saving ? '儲存中...' : '儲存'}
        </button>
      </div>

      {/* 表單內容 */}
      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 基本資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                新聞標題 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                發布日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                分類 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                required
              >
                <option value="">請選擇分類</option>
                {categoryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isHidden"
                name="isHidden"
                checked={formData.isHidden}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
              />
              <label htmlFor="isHidden" className="ml-2 block text-sm text-gray-700">
                隱藏此新聞
              </label>
            </div>
          </div>

          {/* 摘要 */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              新聞摘要
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
              placeholder="簡短描述這篇新聞的重點..."
            ></textarea>
          </div>

          {/* 圖片設定 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                列表圖片 URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="列表圖片預覽"
                    className="h-20 w-20 object-cover rounded-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="detailImage" className="block text-sm font-medium text-gray-700 mb-2">
                詳情圖片 URL
              </label>
              <input
                type="url"
                id="detailImage"
                name="detailImage"
                value={formData.detailImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                placeholder="https://example.com/detail-image.jpg"
              />
              {formData.detailImage && (
                <div className="mt-2">
                  <img
                    src={formData.detailImage}
                    alt="詳情圖片預覽"
                    className="h-20 w-20 object-cover rounded-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 新聞內容 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              新聞內容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
              placeholder="輸入完整的新聞內容..."
              required
            ></textarea>
          </div>

          {/* 提交按鈕 */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              to="/admin/news"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#47512f] transition-colors flex items-center"
            >
              <FiSave className="mr-2" />
              {saving ? '儲存中...' : '儲存'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
