import express from 'express';
import {
  getAllProducts,
  getProduct,
  getRecommendedProducts,
  getCategoryProducts
} from '../controllers/productController.js';

const router = express.Router();

// 獲取所有產品或按類別過濾
router.get('/', getAllProducts);

// 獲取推薦產品
router.get('/recommended', getRecommendedProducts);

// 獲取按類別分組的所有產品
router.get('/categories', getCategoryProducts);

// 獲取單一產品詳情
router.get('/:id', getProduct);

export default router;
