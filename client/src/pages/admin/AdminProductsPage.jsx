import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiPlusCircle, FiEdit, FiTrash2, FiToggleRight, FiToggleLeft, FiX } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

// Toast 提示組件
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClasses = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-500 text-green-800';
      case 'error': return 'bg-red-50 border-red-500 text-red-800';
      default: return 'bg-gray-50 border-gray-500 text-gray-800';
    }
  };

  return (
    <div className={`fixed top-5 right-5 p-4 border-l-4 rounded-md shadow-md z-50 ${getToastClasses()}`}>
      <div className="flex justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-4">×</button>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 載入產品資料
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://tea-system.sdpmlab.org/api/products/admin/all', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('獲取產品資料失敗');
        }

        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        console.error('載入產品資料失敗:', error);
        showToast('載入產品資料失敗', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 處理產品狀態切換
  const handleToggleAvailability = async (id) => {
    try {
      const response = await fetch(`https://tea-system.sdpmlab.org/api/products/${id}/toggle`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('切換產品狀態失敗');
      }

      const result = await response.json();

      // 更新本地產品列表
      setProducts(products.map(product =>
        product.id === id ? result.data : product
      ));

      showToast(`產品已${result.data.isAvailable ? '啟用' : '停用'}`, 'success');
    } catch (error) {
      console.error('切換產品狀態失敗:', error);
      showToast('切換產品狀態失敗', 'error');
    }
  };

  // 處理刪除產品
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('確定要刪除此產品嗎？此操作無法還原。')) {
      return;
    }

    try {
      const response = await fetch(`https://tea-system.sdpmlab.org/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('刪除產品失敗');
      }

      // 更新本地產品列表
      setProducts(products.filter(product => product.id !== id));
      showToast('產品已刪除', 'success');
    } catch (error) {
      console.error('刪除產品失敗:', error);
      showToast('刪除產品失敗', 'error');
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

  // 篩選產品
  const filteredProducts = products.filter(product => {
    // 搜尋詞過濾
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!searchMatch) return false;

    // 類別過濾
    if (filterCategory !== 'all' && product.category !== filterCategory) {
      return false;
    }

    // 狀態過濾
    if (filterStatus === 'available' && !product.isAvailable) {
      return false;
    }
    if (filterStatus === 'unavailable' && product.isAvailable) {
      return false;
    }

    return true;
  });

  // 產品類別轉換為中文
  const getCategoryName = (category) => {
    const categories = {
      'recommended': '推薦飲品',
      'classic': '經典茶品',
      'special': '特殊系列',
      'mix': '特調系列'
    };
    return categories[category] || category;
  };

  // 取得所有不重複的類別
  const allCategories = [...new Set(products.map(product => product.category))];

  return (
    <AdminLayout>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">產品管理</h1>
          <p className="text-gray-600">管理所有茶飲產品項目</p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-[#5a6440] text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlusCircle className="mr-2" /> 新增產品
        </Link>
      </div>

      {/* 搜尋和過濾區塊 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
        {/* 搜尋欄位 */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="搜尋產品名稱或描述..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* 篩選按鈕及選單 */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
          >
            <FiFilter className="mr-2" /> 篩選
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
              <div className="p-4">
                <h3 className="font-semibold mb-2">產品類別</h3>
                <div className="mb-4">
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="category"
                      checked={filterCategory === 'all'}
                      onChange={() => setFilterCategory('all')}
                      className="mr-2"
                    />
                    所有類別
                  </label>
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filterCategory === category}
                        onChange={() => setFilterCategory(category)}
                        className="mr-2"
                      />
                      {getCategoryName(category)}
                    </label>
                  ))}
                </div>

                <h3 className="font-semibold mb-2">產品狀態</h3>
                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="status"
                      checked={filterStatus === 'all'}
                      onChange={() => setFilterStatus('all')}
                      className="mr-2"
                    />
                    全部
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="status"
                      checked={filterStatus === 'available'}
                      onChange={() => setFilterStatus('available')}
                      className="mr-2"
                    />
                    可售
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="status"
                      checked={filterStatus === 'unavailable'}
                      onChange={() => setFilterStatus('unavailable')}
                      className="mr-2"
                    />
                    不可售
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 產品列表 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a6440]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">沒有找到符合條件的產品</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    產品資訊
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    類別
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    價格 (中/大)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product.id} className={!product.isAvailable ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.image || '/assets/Logo.png'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCategoryName(product.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.priceM !== null ? `${product.priceM}元` : '–'} /
                      {product.priceL !== null ? `${product.priceL}元` : '–'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isAvailable ? '可售' : '不可售'}
                      </span>
                      {product.hotAvailable && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          可熱飲
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-4">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          onClick={() => handleToggleAvailability(product.id)}
                          className={`${product.isAvailable ? 'text-green-500 hover:text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {product.isAvailable ? <FiToggleRight /> : <FiToggleLeft />}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
