import express from 'express';
import { getAllStores, getStoreById, getRegions } from '../controllers/storeController.js';

const router = express.Router();

// 獲取所有門市或按地區過濾
router.get('/', getAllStores);

// 獲取所有地區
router.get('/regions', getRegions);

// 獲取單個門市詳情
router.get('/:id', getStoreById);

export default router;
