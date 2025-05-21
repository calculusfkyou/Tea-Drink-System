import express from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController.js';

const router = express.Router();

// 所有訂單路由都需要用戶登入
router.use(protect);

// 管理員權限路由 - 注意：這些具體路由必須放在通用路由之前
// 獲取所有訂單 (僅限管理員)
router.get('/all', restrictTo('admin', 'manager'), getAllOrders);

// 創建新訂單
router.post('/', createOrder);

// 獲取用戶所有訂單
router.get('/', getUserOrders);

// 獲取指定訂單詳情
router.get('/:id', getOrderById);

// 取消訂單
router.patch('/:id/cancel', cancelOrder);

// 更新訂單狀態 (僅限管理員)
router.put('/:id/status', restrictTo('admin', 'manager'), updateOrderStatus);

export default router;
