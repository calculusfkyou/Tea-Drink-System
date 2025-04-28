import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

// 保護路由，要求用戶必須登入
export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token; // 從 cookie 獲取令牌

    // 如果 cookie 中沒有，嘗試從請求標頭獲取 (可選，為兼容舊客戶端)
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 沒有令牌則拒絕請求
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: '您未登入，請先登入'
      });
    }

    // 驗證令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_should_be_in_env_file');

    // 檢查用戶是否存在
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: '此令牌的用戶已不存在'
      });
    }

    // 將用戶信息附加到請求對象
    req.user = decoded;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'fail',
        message: '無效的令牌'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'fail',
        message: '令牌已過期，請重新登入'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 限制某些路由只能由特定角色的用戶訪問
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: '您沒有權限執行此操作'
      });
    }

    next();
  };
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
