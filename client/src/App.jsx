import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'; // 匯入 ContactPage
import ProductsPage from './pages/ProductsPage'; // 匯入 ProductsPage
import NewsPage from './pages/api/NewsPage'; // 匯入 NewsPage
import NewsDetailPage from './pages/api/NewsDetailPage'; // 匯入 NewsDetailPage
import LocationsPage from './pages/api/LocationsPage'; // 匯入 LocationsPage
import StoreDetailPage from './pages/api/StoreDetailPage'; // 匯入 StoreDetailPage
import AboutPage from './pages/AboutPage'; // 匯入 AboutPage
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

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
          {/* <Route path="*" element={<p className="p-6 text-center">找不到頁面 😢</p>} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* 新增註冊路由 */}
          <Route path="/login" element={<LoginPage />} /> {/* 新增登入路由 */}
          <Route path="*" element={<NotFoundPage />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
