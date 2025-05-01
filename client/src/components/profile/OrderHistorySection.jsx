import React, { useState, useEffect } from 'react';

export default function OrderHistorySection({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // 模擬獲取訂單數據
  // 實際應用中，這裡應該從後端API獲取真實數據
  useEffect(() => {
    // 假設的訂單數據
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'ORD-20240501-001',
        date: '2024-05-01',
        status: '已完成',
        totalAmount: 320,
        items: [
          { name: '珍珠奶茶', size: '中杯', sugar: '微糖', ice: '少冰', quantity: 2, price: 110 },
          { name: '四季春茶', size: '大杯', sugar: '無糖', ice: '正常冰', quantity: 1, price: 100 }
        ],
        store: '摸摸茶-台北101店'
      },
      {
        id: '2',
        orderNumber: 'ORD-20240428-052',
        date: '2024-04-28',
        status: '已完成',
        totalAmount: 210,
        items: [
          { name: '芋頭鮮奶', size: '中杯', sugar: '正常糖', ice: '少冰', quantity: 1, price: 130 },
          { name: '蜂蜜檸檬綠', size: '大杯', sugar: '半糖', ice: '去冰', quantity: 1, price: 80 }
        ],
        store: '摸摸茶-台北信義店'
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000); // 模擬載入延遲
  }, []);

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
                    {order.date} | {order.store}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === '已完成' ? 'bg-green-100 text-green-700' :
                    order.status === '處理中' ? 'bg-yellow-100 text-yellow-700' :
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
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p>{item.name} ({item.size})</p>
                          <p className="text-xs text-gray-500">{item.sugar} / {item.ice} x {item.quantity}</p>
                        </div>
                        <p className="font-medium">NT$ {item.price * item.quantity}</p>
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
