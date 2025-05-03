import express from 'express';
import {
  getAllStores,
  getStoreById,
  getRegions,
  createStore,
  updateStore,
  deleteStore
} from '../controllers/storeController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 公開路由
// 獲取所有門市或按地區過濾
router.get('/', getAllStores);

// 獲取所有地區
router.get('/regions', getRegions);

// 獲取單個門市詳情
router.get('/:id', getStoreById);

// 管理員路由
// 創建、更新和刪除門市需要管理員權限
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', createStore);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);

export default router;
