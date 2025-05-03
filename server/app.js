import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // 引入資料庫連線
import newsRoutes from './routes/newsRoutes.js'; // 引入新聞路由
import storeRoutes from './routes/storeRoutes.js'; // 引入門市路由
import authRoutes from './routes/authRoutes.js'; // 引入認證路由
import addressRoutes from './routes/addressRoutes.js'; // 引入地址路由
import productRoutes from './routes/productRoutes.js';
import { initializeProducts } from './models/productModel.js';
import { syncStoreModel, initializeStores } from './models/storeModel.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // 明確指定前端應用的來源
  credentials: true, // 允許憑證
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('伺服器運行中 🚀');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from MoMo Backend! We\'ll go from here now.' });
});

app.post('/api/hello', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name} from MoMo Backend!` });
});

app.use('/api/news', newsRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const startServer = async () => {
  try {
    // 資料庫認證
    await sequelize.authenticate();
    console.log('MySQL connected successfully');

    // 資料庫同步
    await sequelize.sync({ alter: true });
    console.log('資料庫已同步');

    // 初始化產品資料（只在需要時執行）
    await initializeProducts();
    await initializeStores();
    console.log('資料已檢查/初始化');

    // 啟動伺服器
    app.listen(PORT, () => {
      console.log(`✅ 伺服器運行中: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('伺服器啟動失敗:', error);
  }
};

// 執行啟動函數
startServer();

