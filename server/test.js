import bcrypt from 'bcrypt';
import { User } from './models/userModel.js';
import sequelize from './config/database.js';

const createAdmin = async () => {
  try {
    // 連接資料庫
    await sequelize.authenticate();
    console.log('資料庫連線成功');

    // 檢查是否已有管理員帳號
    const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });

    if (existingAdmin) {
      console.log('管理員帳號已存在，無需重新創建');
      process.exit(0);
    }

    // 將密碼加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    // 創建管理員帳號
    const admin = await User.create({
      name: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      isVerified: true,
      role: 'admin'
    });

    console.log('管理員帳號創建成功:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('創建管理員帳號失敗:', error);
    process.exit(1);
  }
};

createAdmin();
