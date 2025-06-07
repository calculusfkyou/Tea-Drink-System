import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin,
  toggleNewsVisibility
} from '../controllers/newsController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 管理員專用路由
router.get('/admin/all', protect, restrictTo('admin'), getAllNewsAdmin);
router.post('/admin', protect, restrictTo('admin'), createNews);
router.put('/admin/:id', protect, restrictTo('admin'), updateNews);
router.delete('/admin/:id', protect, restrictTo('admin'), deleteNews);
router.patch('/admin/:id/toggle', protect, restrictTo('admin'), toggleNewsVisibility);

// 公開路由
router.get('/', getAllNews);
router.get('/:id', getNewsById);

export default router;
