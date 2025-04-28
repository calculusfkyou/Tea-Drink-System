import { User } from '../models/userModel.js';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log('收到註冊請求:', req.body);
  const { name, email, password, phone } = req.body;

  // 開始一個事務
  const transaction = await sequelize.transaction();

  try {
    // 檢查郵件是否已存在 (在事務中)
    const existingUser = await User.findOne({
      where: { email },
      transaction
    });

    if (existingUser) {
      await transaction.rollback(); // 回滾事務
      return res.status(409).json({
        status: 'fail',
        message: '此電子郵件已被註冊'
      });
    }

    // 密碼加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 創建用戶 (在事務中)
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    }, { transaction });

    if (!user) {
      await transaction.rollback(); // 回滾事務
      return res.status(400).json({
        status: 'fail',
        message: 'User registration failed',
      });
    }

    // 提交事務
    await transaction.commit();

    console.log('用戶創建成功:', user.toJSON());
    return res.status(201).json({
      status: 'success',
      message: 'User registered success',
    });
  } catch (error) {
    // 發生錯誤時回滾事務
    await transaction.rollback();

    console.error('註冊處理錯誤:', error);

    // 提供更具體的錯誤訊息
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 'error',
        message: '此電子郵件已被註冊'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Database error: ' + (error.message || '未知錯誤')
    });
  }
};

// 登入函數也需要加強安全性
export const login = async (req, res) => {
  console.log('收到登入請求:', req.body);
  const { email, password, rememberMe = false } = req.body;

  // 開始一個事務 (即使是讀取操作，也能確保資料一致性)
  const transaction = await sequelize.transaction();

  try {
    // 尋找用戶
    const user = await User.findOne({
      where: { email },
      transaction
    });

    if (!user) {
      await transaction.rollback();
      return res.status(401).json({
        status: 'fail',
        message: '帳號或密碼錯誤' // 使用通用訊息避免洩露用戶存在與否
      });
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await transaction.rollback();
      return res.status(401).json({
        status: 'fail',
        message: '帳號或密碼錯誤'
      });
    }

    // 生成 JWT 令牌
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your_jwt_secret_should_be_in_env_file',
      {
        expiresIn: rememberMe ? '30d' : '24h'
      }
    );

    // 設置 HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true, // 重要：防止 JavaScript 訪問
      secure: process.env.NODE_ENV === 'production', // 生產環境下要求 HTTPS
      sameSite: 'lax', // 防止 CSRF 攻擊
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30天或1天
      path: '/'
    });

    // 提交事務
    await transaction.commit();

    // 移除密碼再返回用戶資訊
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    console.log('用戶登入成功:', userWithoutPassword);

    return res.status(200).json({
      status: 'success',
      message: '登入成功',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    // 發生錯誤時回滾事務
    await transaction.rollback();

    console.error('登入處理錯誤:', error);

    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤，請稍後再試',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const logout = (req, res) => {
  // 清除認證 cookie
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // 立即過期
    path: '/'
  });

  return res.status(200).json({
    status: 'success',
    message: '登出成功'
  });
};

// 添加獲取當前用戶資訊的功能
export const getMe = async (req, res) => {
  try {
    // 此函數需要配合後面的身份驗證中間件使用
    // req.user 是由驗證中間件提供的
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到用戶'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error) {
    console.error('獲取用戶信息錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};
