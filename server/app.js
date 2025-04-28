import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // 引入資料庫連線
import newsRoutes from './routes/newsRoutes.js'; // 引入新聞路由
import storeRoutes from './routes/storeRoutes.js'; // 引入門市路由
import authRoutes from './routes/authRoutes.js'; // 引入認證路由
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

// 添加新聞路由
app.use('/api/news', newsRoutes);

// 添加門市路由
app.use('/api/stores', storeRoutes);

// 添加認證路由
app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');

    await sequelize.sync();
    console.log('Tables sync successfully');
  } catch (error) {
    console.log('Unable to connect to MySQL:', error);
  }
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
