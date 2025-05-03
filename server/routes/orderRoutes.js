import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createOrder, getUserOrders, getOrderById, cancelOrder } from '../controllers/orderController.js';

const router = express.Router();

// 所有訂單路由都需要用戶登入
router.use(protect);

// 創建新訂單
router.post('/', createOrder);

// 獲取用戶所有訂單
router.get('/', getUserOrders);

// 獲取指定訂單詳情
router.get('/:id', getOrderById);

// 取消訂單
router.patch('/:id/cancel', cancelOrder);

export default router;
