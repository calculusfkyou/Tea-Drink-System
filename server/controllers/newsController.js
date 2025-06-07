import { Op } from 'sequelize';
import { News } from '../models/newsModel.js';

// 獲取所有新聞
export const getAllNews = async (req, res) => {
  try {
    const { category, limit } = req.query;

    // 建立查詢條件，排除隱藏的新聞
    let whereClause = { isHidden: false }; // 只顯示未隱藏的新聞
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

// 創建新聞
export const createNews = async (req, res) => {
  try {
    const { title, date, category, excerpt, image, detailImage, content, details, images, isHidden = false } = req.body;

    // 驗證必填欄位
    if (!title || !date || !category || !content) {
      return res.status(400).json({
        status: 'fail',
        message: '請填寫所有必填欄位'
      });
    }

    const news = await News.create({
      title,
      date,
      category,
      excerpt,
      image,
      detailImage,
      content,
      details,
      images: images || [],
      isHidden
    });

    return res.status(201).json({
      status: 'success',
      message: '新聞創建成功',
      data: news
    });
  } catch (error) {
    console.error('創建新聞失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 更新新聞
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, category, excerpt, image, detailImage, content, details, images, isHidden } = req.body;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該新聞'
      });
    }

    // 更新新聞資料
    await news.update({
      title,
      date,
      category,
      excerpt,
      image,
      detailImage,
      content,
      details,
      images: images || [],
      isHidden
    });

    return res.status(200).json({
      status: 'success',
      message: '新聞更新成功',
      data: news
    });
  } catch (error) {
    console.error('更新新聞失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 刪除新聞
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該新聞'
      });
    }

    await news.destroy();

    return res.status(200).json({
      status: 'success',
      message: '新聞刪除成功'
    });
  } catch (error) {
    console.error('刪除新聞失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 管理員獲取所有新聞（包含隱藏的）
export const getAllNewsAdmin = async (req, res) => {
  try {
    const { category, status } = req.query;

    // 建立查詢條件
    let whereClause = {};

    if (category && category !== '全部') {
      whereClause.category = category;
    }

    if (status === 'hidden') {
      whereClause.isHidden = true;
    } else if (status === 'visible') {
      whereClause.isHidden = false;
    }

    const news = await News.findAll({
      where: whereClause,
      order: [['date', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      results: news.length,
      data: news
    });
  } catch (error) {
    console.error('獲取新聞失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 切換新聞顯示狀態
export const toggleNewsVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該新聞'
      });
    }

    // 切換顯示狀態
    await news.update({
      isHidden: !news.isHidden
    });

    return res.status(200).json({
      status: 'success',
      message: `新聞已${news.isHidden ? '隱藏' : '顯示'}`,
      data: news
    });
  } catch (error) {
    console.error('切換新聞狀態失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};
