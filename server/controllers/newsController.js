import { Op } from 'sequelize';
import { News } from '../models/newsModel.js';

// 獲取所有新聞
export const getAllNews = async (req, res) => {
  try {
    const { category, limit } = req.query;

    // 建立查詢條件
    let whereClause = {};
    if (category && category !== '全部') {
      whereClause.category = category;
    }

    // 查詢選項
    let options = {
      where: whereClause,
      order: [['date', 'DESC']]
    };

    // 如果有限制參數，設定 limit
    if (limit) {
      options.limit = parseInt(limit);
    }

    const news = await News.findAll(options);
    return res.status(200).json(news);
  } catch (error) {
    console.error('獲取新聞失敗:', error);
    return res.status(500).json({ message: '獲取新聞失敗', error: error.message });
  }
};

// 獲取單個新聞詳情
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: '找不到該新聞' });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error('獲取新聞詳情失敗:', error);
    return res.status(500).json({ message: '獲取新聞詳情失敗', error: error.message });
  }
};
