import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiMapPin } from 'react-icons/fi';
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

export default function AdminStoreEditPage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const isNewStore = storeId === 'new';

  const [loading, setLoading] = useState(!isNewStore);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    region: '',
    address: '',
    phone: '',
    weekday_hours: '',
    weekend_hours: '',
    default_hours: '',
    note: '',
    image: '',
    detail_image: '',
    latitude: '',
    longitude: '',
    map_link: '',
    is_new: false,
    online_order: true,
    isHidden: false
  });

  // 預設地區選項
  const regionOptions = [
    '台北',
    '新北',
    '桃園',
    '台中',
    '彰化',
    '台南',
    '高雄',
    '其他'
  ];

  // 載入門市資料（編輯模式）
  useEffect(() => {
    if (!isNewStore) {
      fetchStoreData();
    }
  }, [storeId, isNewStore]);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://tea-system.sdpmlab.org/api/stores/${storeId}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('獲取門市資料失敗');
      }

      const storeData = await response.json();
      setFormData({
        name: storeData.name || '',
        region: storeData.region || '',
        address: storeData.address || '',
        phone: storeData.phone || '',
        weekday_hours: storeData.weekday_hours || '',
        weekend_hours: storeData.weekend_hours || '',
        default_hours: storeData.default_hours || '',
        note: storeData.note || '',
        image: storeData.image || '',
        detail_image: storeData.detail_image || '',
        latitude: storeData.latitude || '',
        longitude: storeData.longitude || '',
        map_link: storeData.map_link || '',
        is_new: storeData.is_new || false,
        online_order: storeData.online_order !== undefined ? storeData.online_order : true,
        isHidden: storeData.isHidden || false
      });
    } catch (error) {
      console.error('獲取門市資料失敗:', error);
      showToast('獲取門市資料失敗，請稍後再試', 'error');
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
    if (!formData.name || !formData.region || !formData.address || !formData.phone) {
      showToast('請填寫所有必填欄位', 'error');
      return;
    }

    try {
      setSaving(true);

      const url = isNewStore
        ? 'https://tea-system.sdpmlab.org/api/stores/admin'
        : `https://tea-system.sdpmlab.org/api/stores/admin/${storeId}`;

      const method = isNewStore ? 'POST' : 'PUT';

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
        isNewStore ? '門市創建成功' : '門市更新成功',
        'success'
      );

      // 延遲跳轉，讓用戶看到成功訊息
      setTimeout(() => {
        navigate('/admin/stores');
      }, 1000);

    } catch (error) {
      console.error('儲存門市失敗:', error);
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
          <Link to="/admin/stores" className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
            <FiArrowLeft className="mr-1" /> 返回門市列表
          </Link>
          <h1 className="text-2xl font-bold">{isNewStore ? '新增門市' : '編輯門市'}</h1>
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
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">基本資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  門市名稱 <span className="text-red-500">*</span>
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

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  地區 <span className="text-red-500">*</span>
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required
                >
                  <option value="">請選擇地區</option>
                  {regionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  門市地址 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  聯絡電話 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  required
                />
              </div>
            </div>
          </div>

          {/* 營業時間 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">營業時間</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="default_hours" className="block text-sm font-medium text-gray-700 mb-2">
                  統一營業時間
                </label>
                <input
                  type="text"
                  id="default_hours"
                  name="default_hours"
                  value={formData.default_hours}
                  onChange={handleInputChange}
                  placeholder="例：10:30-22:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                />
              </div>

              <div>
                <label htmlFor="weekday_hours" className="block text-sm font-medium text-gray-700 mb-2">
                  平日營業時間
                </label>
                <input
                  type="text"
                  id="weekday_hours"
                  name="weekday_hours"
                  value={formData.weekday_hours}
                  onChange={handleInputChange}
                  placeholder="例：(一)~(五) 10:30-22:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                />
              </div>

              <div>
                <label htmlFor="weekend_hours" className="block text-sm font-medium text-gray-700 mb-2">
                  週末營業時間
                </label>
                <input
                  type="text"
                  id="weekend_hours"
                  name="weekend_hours"
                  value={formData.weekend_hours}
                  onChange={handleInputChange}
                  placeholder="例：(六)~(日) 10:30-24:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                營業備註
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                placeholder="特殊節日營業時間或其他備註..."
              ></textarea>
            </div>
          </div>

          {/* 圖片設定 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">圖片設定</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  門市外觀圖片 URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  placeholder="https://example.com/store-image.jpg"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="門市外觀預覽"
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="detail_image" className="block text-sm font-medium text-gray-700 mb-2">
                  門市詳細圖片 URL
                </label>
                <input
                  type="url"
                  id="detail_image"
                  name="detail_image"
                  value={formData.detail_image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  placeholder="https://example.com/store-detail.jpg"
                />
                {formData.detail_image && (
                  <div className="mt-2">
                    <img
                      src={formData.detail_image}
                      alt="門市詳細預覽"
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 位置資訊 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">位置資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                  緯度
                </label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  placeholder="24.863671"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                  經度
                </label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  placeholder="121.211828"
                />
              </div>

              <div>
                <label htmlFor="map_link" className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps 連結
                </label>
                <input
                  type="url"
                  id="map_link"
                  name="map_link"
                  value={formData.map_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a6440]"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
            </div>
          </div>

          {/* 門市設定 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">門市設定</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_new"
                  name="is_new"
                  checked={formData.is_new}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
                />
                <label htmlFor="is_new" className="ml-2 block text-sm text-gray-700">
                  標記為新門市
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="online_order"
                  name="online_order"
                  checked={formData.online_order}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#5a6440] focus:ring-[#5a6440] border-gray-300 rounded"
                />
                <label htmlFor="online_order" className="ml-2 block text-sm text-gray-700">
                  支援線上訂餐
                </label>
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
                  隱藏此門市
                </label>
              </div>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              to="/admin/stores"
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
