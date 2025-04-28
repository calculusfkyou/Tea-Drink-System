import express from 'express';
import { getAllNews, getNewsById } from '../controllers/newsController.js';

const router = express.Router();

// 獲取所有新聞或按類別過濾
router.get('/', getAllNews);

// 獲取單個新聞詳情
router.get('/:id', getNewsById);

export default router;
