import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'; // 匯入 ContactPage
import ProductsPage from './pages/ProductsPage'; // 匯入 ProductsPage
import NewsPage from './pages/api/NewsPage'; // 匯入 NewsPage
import NewsDetailPage from './pages/api/NewsDetailPage'; // 匯入 NewsDetailPage
import LocationsPage from './pages/api/LocationsPage'; // 匯入 LocationsPage
import StoreDetailPage from './pages/api/StoreDetailPage'; // 匯入 StoreDetailPage
import AboutPage from './pages/AboutPage'; // 匯入 AboutPage
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminUserDetailPage from './pages/admin/AdminUserDetailPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminNewsEditPage from './pages/admin/AdminNewsEditPage';
import AdminStoresPage from './pages/admin/AdminStoresPage';
import AdminStoreEditPage from './pages/admin/AdminStoreEditPage';

// 受保護的路由元件
const ProtectedRoute = ({ children, adminOnly = false }) => {
  // 從 localStorage 獲取用戶資訊
  const userJSON = localStorage.getItem('userDisplay');
  let user = null;

  try {
    if (userJSON) {
      user = JSON.parse(userJSON);
    }
  } catch (error) {
    console.error('解析用戶資訊失敗:', error);
  }

  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} /> {/* 新增聯絡我們路由 */}
          <Route path="/products" element={<ProductsPage />} /> {/* 新增飲品介紹路由 */}
          <Route path="/news" element={<NewsPage />} /> {/* 新增新聞列表路由 */}
          <Route path="/news/:id" element={<NewsDetailPage />} /> {/* 新增新聞詳情路由 */}
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:id" element={<StoreDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderNumber" element={<OrderSuccessPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* 新增註冊路由 */}
          <Route path="/login" element={<LoginPage />} /> {/* 新增登入路由 */}
          <Route path="*" element={<NotFoundPage />} />
          {/* Add other routes here */}

          {/* 管理員頁面 */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrdersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders/:orderId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrderDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute adminOnly={true}>
              <AdminProductsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/:productId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminProductEditPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/edit/:productId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminProductEditPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/:userId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminUserDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/new" element={
            <ProtectedRoute adminOnly={true}>
              <AdminUserDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute adminOnly={true}>
              <AdminSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/news" element={
            <ProtectedRoute adminOnly={true}>
              <AdminNewsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/news/new" element={
            <ProtectedRoute adminOnly={true}>
              <AdminNewsEditPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/news/edit/:newsId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminNewsEditPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/stores" element={
            <ProtectedRoute adminOnly={true}>
              <AdminStoresPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/stores/new" element={
            <ProtectedRoute adminOnly={true}>
              <AdminStoreEditPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/stores/edit/:storeId" element={
            <ProtectedRoute adminOnly={true}>
              <AdminStoreEditPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
