import React, { useState, useEffect } from 'react';

export default function OrderHistorySection({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // 從API獲取訂單數據
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://tea-system.sdpmlab.org/api/orders', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('獲取訂單失敗');
        }

        const result = await response.json();
        setOrders(result.data);
      } catch (error) {
        console.error('獲取訂單時發生錯誤:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return <div className="text-center py-8">載入訂單記錄中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">訂單記錄</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          您還沒有任何訂單記錄
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div
                className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)} | {order.deliveryMethod === '自取' ? order.storeName : '外送'}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === '已完成' ? 'bg-green-100 text-green-700' :
                    order.status === '處理中' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === '待處理' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                  <p className="ml-4 font-medium">NT$ {order.totalAmount}</p>
                  <svg
                    className={`ml-2 w-5 h-5 transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>

              {expandedOrderId === order.id && (
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-3">訂購項目</h3>
                  <div className="space-y-2">
                    {order.OrderItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>{item.productName} ({item.size})</p>
                          <p className="text-xs text-gray-500">{item.sugar} / {item.ice} x {item.quantity}</p>
                          {item.toppings && item.toppings.length > 0 && (
                            <p className="text-xs text-gray-500">加料: {item.toppings.join(', ')}</p>
                          )}
                        </div>
                        <p className="font-medium">NT$ {item.subTotal}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between">
                    <p className="font-medium">總計</p>
                    <p className="font-medium">NT$ {order.totalAmount}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
