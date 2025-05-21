import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiPackage, FiMap, FiUser, FiCreditCard, FiFileText, FiCheck, FiX } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

// Toast 提示組件
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3秒後自動關閉

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-800';
    }
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="text-green-600" />;
      case 'error':
        return <FiX className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-5 right-5 flex items-center p-4 rounded-md shadow-md border-l-4 z-50 ${getToastClasses()}`}>
      <div className="mr-2">{getToastIcon()}</div>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        <FiX />
      </button>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusNote, setStatusNote] = useState('');

  // Toast 通知狀態
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // 顯示通知函數
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // 隱藏通知函數
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // 載入訂單詳情
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('獲取訂單詳情失敗');
        }

        const data = await response.json();
        setOrder(data.data);

        // 設置訂單項目
        if (data.data.OrderItems) {
          setOrderItems(data.data.OrderItems);
        }
      } catch (err) {
        console.error('獲取訂單詳情失敗:', err);
        setError('無法加載訂單詳情，請稍後再試。');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  // 可以變更的狀態列表
  const availableStatuses = ['待處理', '處理中', '已完成', '已取消'];

  // 處理訂單狀態更新
  const handleUpdateStatus = async (newStatus) => {
    if (!order || newStatus === order.status) return;

    try {
      setUpdatingStatus(true);
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status: newStatus,
          note: statusNote
        })
      });

      if (!response.ok) {
        throw new Error('更新訂單狀態失敗');
      }

      const data = await response.json();
      setOrder({ ...order, status: newStatus });
      setStatusNote('');
      showToast('訂單狀態已更新', 'success');
    } catch (err) {
      console.error('更新訂單狀態失敗:', err);
      showToast('更新訂單狀態失敗，請稍後再試', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // 根據狀態顯示不同背景色
  const getStatusColor = (status) => {
    switch (status) {
      case '待處理':
        return 'bg-blue-100 text-blue-800';
      case '處理中':
        return 'bg-yellow-100 text-yellow-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '已取消':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 格式化時間戳
  const formatDateTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // 根據訂單項目計算加料價格
  const calculateToppingPrice = (toppings) => {
    if (!toppings || toppings.length === 0) return 0;

    // 假設每種配料價格為10元
    return toppings.length * 10;
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

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">找不到此訂單</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Toast 提示窗 */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* 返回按鈕與頭部資訊 */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center text-[#5a6440] hover:text-[#47512f]"
        >
          <FiArrowLeft className="mr-1" /> 返回訂單列表
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* 訂單頭部 */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">訂單 #{order.orderNumber}</h2>
            <p className="text-sm text-gray-600">下單日期: {formatDateTime(order.createdAt)}</p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* 訂單內容 */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 顧客資訊 */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-semibold text-gray-600 uppercase flex items-center mb-3">
                <FiUser className="mr-2" /> 顧客資訊
              </h3>
              <div>
                <p className="text-gray-800">{order.userName || '未知用戶'}</p>
                {order.User && (
                  <>
                    <p className="text-gray-600">{order.User.phone || '無電話'}</p>
                    <p className="text-gray-600">{order.User.email || '無電子郵件'}</p>
                  </>
                )}
              </div>
            </div>

            {/* 配送資訊 */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-semibold text-gray-600 uppercase flex items-center mb-3">
                <FiMap className="mr-2" /> {order.deliveryMethod === '外送' ? '配送資訊' : '自取資訊'}
              </h3>
              <p className="text-gray-800">
                {order.deliveryMethod === '外送' ? '外送到府' : '門市自取'}
              </p>
              {order.deliveryMethod === '自取' && order.storeName && (
                <p className="text-gray-600">{order.storeName}</p>
              )}
              {order.deliveryMethod === '外送' && order.deliveryAddress && (
                <p className="text-gray-600">{order.deliveryAddress}</p>
              )}
            </div>
          </div>

          {/* 訂單項目 */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase flex items-center mb-3">
              <FiPackage className="mr-2" /> 訂購商品
            </h3>
            <div className="bg-white border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      商品
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      單價
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      數量
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      小計
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="mr-2">尺寸: {item.size}</span>
                          <span className="mr-2">糖度: {item.sugar}</span>
                          <span className="mr-2">冰塊: {item.ice}</span>
                          {item.toppings && item.toppings.length > 0 && (
                            <span>
                              加料: {Array.isArray(item.toppings)
                                ? item.toppings.join(', ')
                                : (typeof item.toppings === 'string' ? item.toppings : JSON.stringify(item.toppings))}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-500">
                        NT$ {Number(item.unitPrice).toFixed(0)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                        NT$ {Number(item.subTotal).toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-sm font-medium text-right text-gray-900">
                      總計:
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-red-600">
                      NT$ {Number(order.totalAmount).toFixed(0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 付款資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-semibold text-gray-600 uppercase flex items-center mb-3">
                <FiCreditCard className="mr-2" /> 付款資訊
              </h3>
              <p className="text-gray-800">{order.paymentMethod}</p>
              {order.discountAmount > 0 && (
                <p className="text-gray-600 mt-2">折扣金額: NT$ {Number(order.discountAmount).toFixed(0)}</p>
              )}
              {order.couponCode && (
                <p className="text-gray-600">使用優惠券: {order.couponCode}</p>
              )}
            </div>

            {/* 備註資訊 */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-semibold text-gray-600 uppercase flex items-center mb-3">
                <FiFileText className="mr-2" /> 訂單備註
              </h3>
              <p className="text-gray-800">
                {order.notes || '無備註'}
              </p>
            </div>
          </div>

          {/* 訂單狀態更新 */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">更新訂單狀態</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-2">
                {availableStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(status)}
                    disabled={updatingStatus || status === order.status}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      status === order.status
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-[#5a6440] text-white hover:bg-[#47512f]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="statusNote" className="block text-sm font-medium text-gray-700 mb-1">
                  處理備註 (選填)
                </label>
                <textarea
                  id="statusNote"
                  rows="2"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="例如：客戶已通知，延後取餐時間"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5a6440] focus:border-[#5a6440]"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
