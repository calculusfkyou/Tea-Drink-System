import express from 'express';
import {
  getAllStores,
  getStoreById,
  getRegions,
  createStore,
  updateStore,
  deleteStore,
  getAllStoresAdmin,
  toggleStoreVisibility
} from '../controllers/storeController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 管理員專用路由 - 放在前面，避免與動態路由衝突
router.get('/admin/all', protect, restrictTo('admin'), getAllStoresAdmin);
router.post('/admin', protect, restrictTo('admin'), createStore);
router.put('/admin/:id', protect, restrictTo('admin'), updateStore);
router.delete('/admin/:id', protect, restrictTo('admin'), deleteStore);
router.patch('/admin/:id/toggle', protect, restrictTo('admin'), toggleStoreVisibility);

// 公開路由 - 放在後面
router.get('/', getAllStores);
router.get('/regions', getRegions);
router.get('/:id', getStoreById);

export default router;
