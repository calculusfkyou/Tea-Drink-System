import express from 'express';
import {
  // 既有的控制器
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  uploadAvatar,
  // 新增的管理員控制器
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser
} from '../controllers/authController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { upload } from '../config/uploadConfig.js';

const router = express.Router();

// 公開路由
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// 受保護路由 - 需要登入
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

// 管理員路由 - 用戶管理
router.get('/users', protect, restrictTo('admin', 'manager'), getAllUsers);
router.get('/users/:id', protect, restrictTo('admin', 'manager'), getUserById);
router.post('/users', protect, restrictTo('admin', 'manager'), createUser);
router.put('/users/:id', protect, restrictTo('admin', 'manager'), updateUserById);
router.delete('/users/:id', protect, restrictTo('admin', 'manager'), deleteUser);

export default router;
