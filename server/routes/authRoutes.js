import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 公開路由
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// 受保護路由 - 需要登入
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
