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
  useEffect(() => {
    // 只在開發環境執行
    if (process.env.NODE_ENV === 'development') {
      // 獲取當前頁面加載的時間戳
      const pageLoadTime = Date.now();

      // 嘗試獲取上次伺服器啟動時間
      const lastServerStartTime = parseInt(localStorage.getItem('devServerStartTime') || '0');

      // 檢查是否是新的伺服器啟動 (時間差超過5秒或首次啟動)
      const isNewServerStart = !lastServerStartTime || (pageLoadTime - lastServerStartTime > 5000);

      // 如果是新的伺服器啟動，則清除所有資料
      if (isNewServerStart) {
        console.log('[開發模式] 檢測到伺服器重啟，自動清除登入狀態...');

        // 清除所有認證相關資料
        localStorage.removeItem('userDisplay');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('cart');
        localStorage.removeItem('checkoutItems');
        localStorage.removeItem('socialLinks');
        localStorage.removeItem('resetCompletedFlag'); // 清除舊的重置標記

        // 清除 cookie (呼叫後端登出端點)
        fetch('http://localhost:5000/api/auth/logout', {
          method: 'GET',
          credentials: 'include',
        }).catch(err => console.error('登出 API 呼叫失敗:', err));

        // 觸發自定義事件通知其他元件狀態已更改
        window.dispatchEvent(new Event('authStateChanged'));

        // 儲存新的伺服器啟動時間
        localStorage.setItem('devServerStartTime', pageLoadTime.toString());

        // 重新載入頁面以確保所有狀態都被重置
        console.log('[開發模式] 執行頁面重載...');
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  }, []); // 空依賴陣列，表示只在元件掛載時執行一次

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
