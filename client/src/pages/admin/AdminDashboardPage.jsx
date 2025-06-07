import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiGrid, FiUsers, FiSettings, FiClock, FiTrendingUp, FiShoppingBag, FiX, FiFileText, FiMapPin } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { SlideUpSection, FadeInSection } from '../../components/common/AnimatedSection';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

export default function AdminDashboardPage() {
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
    total: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 快速訪問項目
  const quickAccessItems = [
    { name: '訂單管理', path: '/admin/orders', icon: FiPackage, color: 'bg-blue-500' },
    { name: '產品管理', path: '/admin/products', icon: FiGrid, color: 'bg-green-500' },
    { name: '會員管理', path: '/admin/users', icon: FiUsers, color: 'bg-purple-500' },
    { name: '門市管理', path: '/admin/stores', icon: FiMapPin, color: 'bg-orange-500' },
    { name: '新聞管理', path: '/admin/news', icon: FiFileText, color: 'bg-red-500' },
    { name: '網站設定', path: '/admin/settings', icon: FiSettings, color: 'bg-gray-500' }
  ];

  const [quickAccessRefs, visibleQuickAccess] = useStaggeredAnimation(quickAccessItems, 100);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:5000/api/orders/all', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('獲取訂單數據失敗');
        }

        const result = await response.json();
        const orders = result.data || [];

        const stats = {
          pending: orders.filter(order => order.status === '待處理').length,
          processing: orders.filter(order => order.status === '處理中').length,
          completed: orders.filter(order => order.status === '已完成').length,
          cancelled: orders.filter(order => order.status === '已取消').length,
          total: orders.length
        };

        setOrderStats(stats);

        const recent = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setRecentOrders(recent);
      } catch (error) {
        console.error('獲取儀表板數據失敗:', error);
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  return (
    <AdminLayout>
      <FadeInSection>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-2">歡迎回來，管理員</h2>
          <p className="text-gray-600">檢視並管理您的茶飲系統</p>
        </div>
      </FadeInSection>

      {/* 統計卡片 */}
      <SlideUpSection delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: '待處理訂單', value: orderStats.pending, icon: FiClock, color: 'border-blue-500', bg: 'bg-blue-50' },
            { title: '處理中', value: orderStats.processing, icon: FiPackage, color: 'border-yellow-500', bg: 'bg-yellow-50' },
            { title: '已完成', value: orderStats.completed, icon: FiTrendingUp, color: 'border-green-500', bg: 'bg-green-50' },
            { title: '已取消', value: orderStats.cancelled, icon: FiX, color: 'border-red-500', bg: 'bg-red-50' },
            { title: '總訂單數', value: orderStats.total, icon: FiShoppingBag, color: 'border-gray-500', bg: 'bg-gray-50' }
          ].map((stat, index) => (
            <div
              key={stat.title}
              className={`${stat.bg} p-6 rounded-xl shadow-sm border-l-4 ${stat.color}
                        hover-lift transition-all duration-300 group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1 group-hover:scale-110
                               transition-transform duration-300">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${stat.bg} group-hover:scale-110
                               transition-transform duration-300`}>
                  <stat.icon className="text-2xl text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideUpSection>

      {/* 快速訪問 */}
      <SlideUpSection delay={400}>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">快速訪問</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickAccessItems.map((item, index) => (
              <Link
                key={item.name}
                ref={el => quickAccessRefs.current[index] = el}
                to={item.path}
                className={`bg-white p-6 rounded-xl shadow-sm text-center hover-lift hover-glow
                          transition-all duration-300 group border border-gray-100 ${
                  visibleQuickAccess.has(index) ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center
                               mx-auto mb-3 group-hover:scale-110 transition-transform duration-300
                               shadow-lg`}>
                  <item.icon className="text-white text-xl" />
                </div>
                <h4 className="font-medium text-gray-800 group-hover:text-[#5a6440]
                             transition-colors duration-300">
                  {item.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </SlideUpSection>

      {/* 最近訂單 */}
      <SlideUpSection delay={600}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#5a6440] to-[#7c8861]">
            <h3 className="text-xl font-semibold text-white">最近訂單</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#5a6440] border-t-transparent mr-3"></div>
                <span className="text-gray-500">載入中...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['訂單編號', '顧客', '日期', '金額', '狀態', '操作'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          NT$ {Number(order.totalAmount).toFixed(0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-[#5a6440] hover:text-[#47512f] font-medium
                                     transition-colors duration-200 hover:underline"
                          >
                            查看
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <FiShoppingBag className="text-4xl text-gray-300 mb-2" />
                          <span>沒有最近訂單</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 bg-gray-50 border-t">
            <Link
              to="/admin/orders"
              className="text-[#5a6440] hover:text-[#47512f] font-medium
                       transition-colors duration-200 flex items-center group"
            >
              <span>查看所有訂單</span>
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </SlideUpSection>
    </AdminLayout>
  );
}
