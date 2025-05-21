import express from 'express';
import {
  getAllProducts,
  getProduct,
  getRecommendedProducts,
  getCategoryProducts,
  // 新增管理員功能
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  toggleProductAvailability,
  deleteProduct
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 公開路由
// 獲取所有產品或按類別過濾
router.get('/', getAllProducts);

// 獲取推薦產品
router.get('/recommended', getRecommendedProducts);

// 獲取按類別分組的所有產品
router.get('/categories', getCategoryProducts);

// 獲取單一產品詳情
router.get('/:id', getProduct);

// 管理員路由
// 獲取所有產品 (管理員用)
router.get('/admin/all', protect, restrictTo('admin', 'manager'), getAllProductsAdmin);

// 創建新產品
router.post('/', protect, restrictTo('admin', 'manager'), createProduct);

// 更新產品
router.put('/:id', protect, restrictTo('admin', 'manager'), updateProduct);

// 切換產品可用狀態
router.patch('/:id/toggle', protect, restrictTo('admin', 'manager'), toggleProductAvailability);

// 刪除產品
router.delete('/:id', protect, restrictTo('admin', 'manager'), deleteProduct);

export default router;
