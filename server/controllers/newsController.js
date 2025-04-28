import { newsData } from '../models/newsModel.js';

// 獲取所有新聞
export const getAllNews = (req, res) => {
  try {
    // 取得分類和限制參數
    const { category, limit } = req.query;

    let result = [...newsData];

    // 將日期字串轉換為日期對象並排序（新到舊）
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 如果有分類參數且不是'全部'，進行過濾
    if (category && category !== '全部') {
      result = result.filter(news => news.category === category);
    }

    // 如果有限制參數，限制返回的結果數量
    if (limit) {
      result = result.slice(0, parseInt(limit));
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: '獲取新聞失敗', error: error.message });
  }
};

// 獲取單個新聞詳情
export const getNewsById = (req, res) => {
  try {
    const { id } = req.params;
    const news = newsData.find(item => item.id === parseInt(id));

    if (!news) {
      return res.status(404).json({ message: '找不到該新聞' });
    }

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ message: '獲取新聞詳情失敗', error: error.message });
  }
};
