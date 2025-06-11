import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiPlus, FiX, FiUpload } from 'react-icons/fi';
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

export default function AdminProductEditPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isNewProduct = productId === 'new';

  const [loading, setLoading] = useState(!isNewProduct);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 臨時狀態用於增加選項
  const [tempSugar, setTempSugar] = useState('');
  const [tempIce, setTempIce] = useState('');
  const [tempTopping, setTempTopping] = useState('');

  // 表單數據
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'classic',
    priceM: '',
    priceL: '',
    image: '',
    isAvailable: true,
    sugarOptions: ['無糖', '微糖', '半糖', '正常糖'],
    iceOptions: ['去冰', '微冰', '少冰', '正常冰'],
    toppings: [],
    notes: '',
    hotAvailable: false
  });

  // 類別選項
  const categoryOptions = [
    { value: 'recommended', label: '推薦飲品' },
    { value: 'classic', label: '經典茶品' },
    { value: 'special', label: '特殊系列' },
    { value: 'mix', label: '特調系列' }
  ];

  // 獲取產品數據
  useEffect(() => {
    if (isNewProduct) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://tea-system.sdpmlab.org/api/products/${productId}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('獲取產品資料失敗');
        }

        const result = await response.json();
        setFormData(result.data);
      } catch (error) {
        console.error('載入產品時發生錯誤:', error);
        showToast('載入產品資料失敗', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, isNewProduct]);

  // 處理輸入變更
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked :
             (name === 'priceM' || name === 'priceL') ? (value === '' ? null : Number(value)) : value
    });
  };

  // 處理圖片上傳
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // 添加糖度選項
  const handleAddSugar = () => {
    if (tempSugar.trim() && !formData.sugarOptions.includes(tempSugar.trim())) {
      setFormData({
        ...formData,
        sugarOptions: [...formData.sugarOptions, tempSugar.trim()]
      });
      setTempSugar('');
    }
  };

  // 添加冰量選項
  const handleAddIce = () => {
    if (tempIce.trim() && !formData.iceOptions.includes(tempIce.trim())) {
      setFormData({
        ...formData,
        iceOptions: [...formData.iceOptions, tempIce.trim()]
      });
      setTempIce('');
    }
  };

  // 添加加料選項
  const handleAddTopping = () => {
    if (tempTopping.trim() && !formData.toppings.includes(tempTopping.trim())) {
      setFormData({
        ...formData,
        toppings: [...formData.toppings, tempTopping.trim()]
      });
      setTempTopping('');
    }
  };

  // 刪除選項
  const handleRemoveOption = (type, index) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index)
    });
  };

  // 顯示通知
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 關閉通知
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // 儲存產品
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 表單驗證
    if (!formData.name) {
      showToast('請輸入產品名稱', 'error');
      return;
    }

    if (formData.priceM === null && formData.priceL === null) {
      showToast('至少需要設定中杯或大杯價格', 'error');
      return;
    }

    try {
      setSaving(true);

      const url = isNewProduct
        ? 'https://tea-system.sdpmlab.org/api/products'
        : `https://tea-system.sdpmlab.org/api/products/${productId}`;

      const method = isNewProduct ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '儲存產品失敗');
      }

      const result = await response.json();

      showToast(`產品已成功${isNewProduct ? '創建' : '更新'}`, 'success');

      // 若是新建產品，導向編輯頁
      if (isNewProduct) {
        navigate(`/admin/products/edit/${result.data.id}`);
      }
    } catch (error) {
      console.error('儲存產品失敗:', error);
      showToast(error.message || '儲存產品失敗', 'error');
    } finally {
      setSaving(false);
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
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/admin/products" className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
            <FiArrowLeft className="mr-1" /> 返回產品列表
          </Link>
          <h1 className="text-2xl font-bold">{isNewProduct ? '新增產品' : '編輯產品'}</h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-[#5a6440] text-white rounded-md hover:bg-[#47512f] transition-colors flex items-center"
        >
          <FiSave className="mr-1" /> {saving ? '儲存中...' : '儲存產品'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左側欄 - 基本資訊 */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">基本資訊</h2>

            {/* 產品名稱 */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                產品名稱 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* 產品描述 */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                產品描述
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>

            {/* 產品圖片 */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                產品圖片
              </label>
              <div className="flex items-center">
                {formData.image && (
                  <div className="mr-4">
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </div>
                )}
                <label className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center">
                  <FiUpload className="mr-1" /> 上傳圖片
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">建議尺寸: 500x500px</p>
            </div>

            {/* 產品類別 */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                產品類別 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 價格設定 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="priceM" className="block text-sm font-medium text-gray-700 mb-1">
                  中杯價格 (元)
                </label>
                <input
                  type="number"
                  id="priceM"
                  name="priceM"
                  value={formData.priceM === null ? '' : formData.priceM}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="無則留空"
                />
              </div>
              <div>
                <label htmlFor="priceL" className="block text-sm font-medium text-gray-700 mb-1">
                  大杯價格 (元)
                </label>
                <input
                  type="number"
                  id="priceL"
                  name="priceL"
                  value={formData.priceL === null ? '' : formData.priceL}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="無則留空"
                />
              </div>
            </div>

            {/* 產品狀態 */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">此產品可供銷售</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hotAvailable"
                  checked={formData.hotAvailable}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">提供熱飲選項</span>
              </label>
            </div>

            {/* 備註 */}
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                產品備註
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ''}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="例如：糖度固定、僅供冰飲等限制"
              ></textarea>
            </div>
          </div>

          {/* 右側欄 - 客製化選項 */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">客製化選項</h2>

            {/* 糖度選項 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                糖度選項
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={tempSugar}
                  onChange={(e) => setTempSugar(e.target.value)}
                  placeholder="輸入糖度選項"
                  className="flex-1 border border-gray-300 rounded-l-md p-2"
                />
                <button
                  type="button"
                  onClick={handleAddSugar}
                  className="bg-[#5a6440] text-white px-3 py-2 rounded-r-md"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sugarOptions && formData.sugarOptions.map((option, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    {option}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption('sugarOptions', index)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 冰量選項 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                冰量選項
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={tempIce}
                  onChange={(e) => setTempIce(e.target.value)}
                  placeholder="輸入冰量選項"
                  className="flex-1 border border-gray-300 rounded-l-md p-2"
                />
                <button
                  type="button"
                  onClick={handleAddIce}
                  className="bg-[#5a6440] text-white px-3 py-2 rounded-r-md"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.iceOptions && formData.iceOptions.map((option, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    {option}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption('iceOptions', index)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 加料選項 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                加料選項
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={tempTopping}
                  onChange={(e) => setTempTopping(e.target.value)}
                  placeholder="輸入加料選項"
                  className="flex-1 border border-gray-300 rounded-l-md p-2"
                />
                <button
                  type="button"
                  onClick={handleAddTopping}
                  className="bg-[#5a6440] text-white px-3 py-2 rounded-r-md"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.toppings && formData.toppings.map((topping, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    {topping}
                    <button
                      type="button"
                      onClick={() => handleRemoveOption('toppings', index)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 預覽區塊 */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-700 mb-3">產品預覽</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  {formData.image ? (
                    <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">無圖片</div>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{formData.name || '未命名產品'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {categoryOptions.find(c => c.value === formData.category)?.label}
                  </p>
                  <div className="text-sm mt-1">
                    {formData.priceM !== null && <span>中 NT${formData.priceM} </span>}
                    {formData.priceL !== null && <span>大 NT${formData.priceL}</span>}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-4">
                <div className="flex flex-wrap gap-y-2">
                  <div className="w-full">
                    <span className="font-medium">糖度選項:</span> {formData.sugarOptions.join(', ')}
                  </div>
                  <div className="w-full">
                    <span className="font-medium">冰量選項:</span> {formData.iceOptions.join(', ')}
                  </div>
                  <div className="w-full">
                    <span className="font-medium">加料選項:</span> {formData.toppings.length > 0 ? formData.toppings.join(', ') : '無'}
                  </div>
                  <div className="w-full">
                    <span className="font-medium">提供熱飲:</span> {formData.hotAvailable ? '是' : '否'}
                  </div>
                  {formData.notes && (
                    <div className="w-full">
                      <span className="font-medium">備註:</span> {formData.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
