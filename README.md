# 摸摸茶飲商務系統 🧋

一個功能完整的茶飲店線上訂購系統，提供顧客線上點餐、會員管理、購物車功能，以及管理員後台管理系統，實現完整的電商業務流程。

## 🚀 專案目的
建立一個現代化的茶飲店數位化解決方案，讓顧客能夠便利地線上訂購飲品，同時提供店家完整的後台管理功能，提升營運效率與顧客體驗。


## 📁 專案架構

```
tea-drink-system/
├── client/                                # 前端 React 應用程式
│   ├── public/                            # 靜態資源
│   │   └── assets/                        # 圖片、Logo、產品圖片
│   └── src/
│       ├── components/                    # 可重用元件
│       │   ├── about/                     # 關於我們元件
│       │   ├── admin/                     # 管理員介面元件
│       │   ├── auth/                      # 驗證相關元件
│       │   ├── cart/                      # 購物車元件
│       │   ├── common/                    # 通用元件
│       │   ├── contact/                   # 聯絡我們元件
│       │   ├── news/                      # 最新消息元件
│       │   ├── newsdetails/               # 消息細節元件
│       │   ├── notfound/                  # 錯誤處理元件
│       │   ├── products/                  # 產品相關元件
│       │   ├── profile/                   # 個人檔案元件
│       │   ├── storesdetails/             # 門市細節元件
│       │   ├── stores/                    # 門市資訊元件
│       │   ├── AboutUs.jsx                # 首頁關於我們元件
│       │   ├── Carousel.jsx               # 首頁輪播元件
│       │   ├── Footer.jsx                 # 頁面註腳元件
│       │   ├── Navbar.jsx                 # 頁面導覽列元件
│       │   ├── NavbarUserMenu.jsx         # 頁面登入後導覽列元件
│       │   ├── PostCard.jsx               # 卡片設計元件
│       │   ├── RecentNews.jsx             # 首頁最新消息元件
│       │   ├── RecommendedDrinks.jsx      # 首頁推薦飲品元件
│       │   └── StoreLocation.jsx          # 首頁關於我們區塊
│       ├── hooks/                         # 自定義 React Hooks
│       │   └── useScrollAnimation.js      # 特殊效果hooks
│       ├── pages/                         # 頁面元件
│       │   ├── admin/                     # 管理員頁面
│       │   ├── api/                       # API 頁面
│       │   ├── auth/                      # AUTH 頁面
│       │   ├── AboutPage.jsx
│       │   ├── CartPage.jsx
│       │   ├── CheckoutPage.jsx
│       │   ├── ContactPage.jsx
│       │   ├── Home.jsx
│       │   ├── NotFoundPage.jsx
│       │   ├── ProductsPage.jsx
│       │   ├── OrderSuccessPage.jsx
│       │   ├── ProductsPage.jsx
│       │   └── ProfilePage.jsx
│       ├── App.jsx                        # 主應用程式
│       ├── main.jsx                       # 應用程式入口
│       └── index.css                      # 全域樣式與動畫
├── server/                                # 後端 Node.js + Express
│   ├── config/                            # 設定檔
│   │   ├── database.js                    # 資料庫連線設定
│   │   └── uploadConfig.js                # 檔案上傳設定
│   ├── controllers/                       # 控制器 (業務邏輯)
│   │   ├── addressController.js
│   │   ├── authController.js
│   │   ├── newsController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── storeController.js
│   ├── middlewares/                       # 中介軟體
│   │   ├── authMiddleware.js
│   ├── models/                            # 資料模型
│   │   ├── addressModel.js
│   │   ├── newsModel.js
│   │   ├── orderItemModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   ├── storeModel.js
│   │   └── userModel.js
│   ├── routes/                            # API 路由
│   │   ├── addressRoutes.js
│   │   ├── authRoutes.js
│   │   ├── newsRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── storeRoutes.js
│   ├── app.js                             # Express 應用程式入口
│   ├── test.js                            # 測試檔案
│   └── package.json
├── .env                                   # 環境變數設定
├── .gitignore                             # Git 忽略清單
└── README.md                              # 專案說明文件
```


## 🔧 開發方式(使用方式)

1. **Clone 專案**
```bash
git clone https://github.com/calculusfkyou/Tea-Drink-System.git
cd tea-drink-system
```

2. **安裝前後端套件**
```bash
cd server
npm install
cd ../client
npm install
```

3. **啟動開發環境**
```bash
# 啟動後端 (在 server 目錄下)
cd server
npm run dev

# 啟動前端 (在 client 目錄下，開新終端)
cd client
npm run dev
```

## 📦 使用技術

### 前端：
- React - 前端框架
- Vite - 建構工具與開發伺服器
- React Router - 路由管理
- Tailwind CSS - 樣式框架
- React Icons - 圖示庫
- Axios - HTTP 請求
- React Hooks - 狀態管理與動畫效果

### 後端：
- Node.js + Express - 伺服器框架
- MySQL + Sequelize - 資料庫與 ORM
- JWT - 使用者驗證
- bcrypt - 密碼加密
- multer - 檔案上傳
- cors - 跨域處理

### 開發工具：
- 程式碼規範: ESLint
- 版本控制: Git
- API 測試: Postman
- 資料庫管理: MySQL Workbench
- 部署: ngrok (開發測試)

## 🌟 主要功能

### 👤 使用者功能
- 會員系統：註冊、登入、個人資料管理
- 產品瀏覽：分類瀏覽、產品詳情、搜尋功能
- 購物車：加入商品、修改數量、選擇規格
- 訂單管理：下單、付款、訂單追蹤
- 地址管理：配送地址新增、編輯、刪除
- 會員專區：訂單歷史、個人資料編輯

### 🛠️ 管理員功能
- 儀表板：營運數據總覽、訂單統計
- 產品管理：新增、編輯、刪除產品
- 訂單管理：訂單處理、狀態更新、詳情查看
- 會員管理：會員資料查看、權限管理
- 門市管理：門市資訊維護、營業時間設定
- 消息管理：最新消息發布與管理
- 系統設定：網站基本設定、聯絡資訊管理

### ✨ 特色功能
- 響應式設計：支援手機、平板、桌面裝置
- 動畫效果：流暢的頁面切換與互動動畫
- 無限輪播：首頁產品展示輪播，自動循環播放
- 即時購物車：動態更新商品數量與總價
- 多規格選擇：杯型、甜度、冰塊、加料客製化
- 優惠券系統：折扣碼套用功能
- 門市定位：Google Maps 整合門市位置

## 🎯 系統特點
### 使用者體驗 (UX)
- 直觀的操作介面設計
- 快速的頁面載入與切換動畫
- 友善的錯誤提示與引導
- 支援多裝置響應式瀏覽
- 購物車數量即時更新提示

### 技術亮點
- 前後端分離架構
- RESTful API 設計規範
- JWT 安全驗證機制
- 資料庫關聯設計優化
- 檔案上傳與圖片管理
- React Router 頁面路由動畫
- Tailwind CSS 響應式設計

### 商業價值
- 提升客戶購買便利性
- 降低人工訂單處理成本
- 完整的營運數據分析功能
- 支援多門市管理與擴展
- 提升品牌形象與競爭力

## 📱 系統截圖
### 前台使用者介面
- 首頁：品牌輪播、推薦商品、關於我們
- 產品頁面：分類瀏覽、產品詳情彈窗
- 購物車：商品管理、數量調整、結帳流程
- 會員中心：個人資料、訂單歷史、地址管理
- 門市資訊：地圖定位、營業時間、聯絡方式

### 後台管理介面
- 管理員儀表板：訂單統計、營收分析
- 產品管理：商品新增編輯、庫存管理
- 訂單管理：訂單列表、狀態更新、詳情查看
- 門市管理：門市資訊、營業時間設定
- 系統設定：網站設定、聯絡資訊管理

## 🔍 API 文檔
### 驗證相關
- POST /api/auth/register - 使用者註冊
- POST /api/auth/login - 使用者登入
- POST /api/auth/logout - 使用者登出
- GET /api/auth/profile - 取得個人資料
- PUT /api/auth/profile - 更新個人資料
### 產品相關
- GET /api/products - 取得產品列表
- GET /api/products/:id - 取得產品詳情
- POST /api/products - 新增產品 (管理員)
- PUT /api/products/:id - 更新產品 (管理員)
- DELETE /api/products/:id - 刪除產品 (管理員)
### 訂單相關
- POST /api/orders - 建立訂單
- GET /api/orders - 取得訂單列表
- GET /api/orders/:id - 取得訂單詳情
- PUT /api/orders/:id/status - 更新訂單狀態 (管理員)
### 門市相關
- GET /api/stores - 取得門市列表
- GET /api/stores/:id - 取得門市詳情
- POST /api/stores - 新增門市 (管理員)
- PUT /api/stores/:id - 更新門市資訊 (管理員)
### 新聞相關
- GET /api/news - 取得新聞列表
- GET /api/news/:id - 取得新聞詳情
- POST /api/news - 發布新聞 (管理員)
- PUT /api/news/:id - 更新新聞 (管理員)

## 🧪 測試方式
### 前端測試
```bash
cd client
npm run test
```

### 後端測試
```bash
cd server
npm run test
```

### API 測試
使用 Postman 或其他 API 測試工具測試各個端點功能

## 🚧 開發狀態
### ✅ 已完成功能
- ✅ 使用者註冊與登入系統
- ✅ 產品瀏覽與詳情展示
- ✅ 購物車功能完整實作
- ✅ 訂單建立與管理
- ✅ 管理員後台系統
- ✅ 門市資訊管理
- ✅ 新聞發布系統
- ✅ 響應式設計
- ✅ 頁面動畫效果
- ✅ 無限輪播功能
### 🔄 開發中功能
- 🔄 優惠券系統完善
- 🔄 支付系統整合
- 🔄 推播通知系統
- 🔄 進階數據分析
### 📋 待開發功能
- 📋 多語言支援
- 📋 會員等級系統
- 📋 庫存管理系統
- 📋 行動 App 版本
- 📋 社群媒體整合

## 🤝 貢獻方式
1. Fork 此專案
2. 建立功能分支 (git checkout -b feature/新功能)
3. 提交更改 (git commit -am '新增某某功能')
4. 推送到分支 (git push origin feature/新功能)
5. 建立 Pull Request

### 開發規範
- 遵循 ESLint 和 Prettier 配置
- 提交訊息使用英文，格式：類型: 簡短描述
- 新功能需要包含對應的測試
- 保持程式碼可讀性和註解完整性

### 開發注意事項：
- 前端開發伺服器：http://localhost:5173
- 後端 API 伺服器：http://localhost:5000
- 資料庫：MySQL (需自行安裝並設定)
- 環境變數請參考 .env.example 檔案
- 詳細的 API 文檔請參考 docs/ 資料夾

## 📞 聯絡資訊與評估要求
### 🔗 專案連結
- GitHub 專案：https://github.com/calculusfkyou/Tea-Drink-System
- 開發者：calculusfkyou, 411177034 軟體三 吳傢澂

## 📄 授權條款
本專案採用 MIT 授權條款，詳情請見 LICENSE 檔案。
