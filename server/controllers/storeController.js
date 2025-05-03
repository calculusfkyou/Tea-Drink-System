import Store, { getAllRegions } from '../models/storeModel.js';
import { Op } from 'sequelize';

// 獲取所有門市資料
export const getAllStores = async (req, res) => {
  try {
    const { region, limit = 100, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    // 構建查詢條件
    const whereClause = {};
    if (region && region !== '全部') {
      whereClause.region = region;
    }

    // 執行查詢
    const { count, rows: stores } = await Store.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['region', 'ASC'], ['name', 'ASC']]
    });

    // 處理返回的數據格式，使其與前端期望的格式一致
    const formattedStores = stores.map(store => {
      const storeJson = store.get({ plain: true });

      // 格式化營業時間
      const hours = {};
      if (storeJson.weekday_hours) hours.weekday = storeJson.weekday_hours;
      if (storeJson.weekend_hours) hours.weekend = storeJson.weekend_hours;
      if (storeJson.default_hours) hours.default = storeJson.default_hours;

      // 格式化位置信息
      const location = {
        lat: storeJson.latitude,
        lng: storeJson.longitude
      };

      // 刪除舊的字段
      delete storeJson.weekday_hours;
      delete storeJson.weekend_hours;
      delete storeJson.default_hours;
      delete storeJson.latitude;
      delete storeJson.longitude;
      delete storeJson.created_at;
      delete storeJson.updated_at;

      // 添加新的格式化字段
      return {
        ...storeJson,
        hours,
        location,
        detailImage: storeJson.detail_image,
      };
    });

    // 返回結果
    return res.status(200).json({
      status: 'success',
      results: count,
      data: formattedStores,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('獲取門市資料失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '獲取門市資料失敗',
      error: error.message
    });
  }
};

// 獲取單個門市詳情
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);

    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該門市資料'
      });
    }

    // 格式化門市數據以符合前端期望的格式
    const storeJson = store.get({ plain: true });

    // 格式化營業時間
    const hours = {};
    if (storeJson.weekday_hours) hours.weekday = storeJson.weekday_hours;
    if (storeJson.weekend_hours) hours.weekend = storeJson.weekend_hours;
    if (storeJson.default_hours) hours.default = storeJson.default_hours;

    // 格式化位置信息
    const location = {
      lat: storeJson.latitude,
      lng: storeJson.longitude
    };

    // 刪除舊的字段
    delete storeJson.weekday_hours;
    delete storeJson.weekend_hours;
    delete storeJson.default_hours;
    delete storeJson.latitude;
    delete storeJson.longitude;
    delete storeJson.created_at;
    delete storeJson.updated_at;

    // 添加新的格式化字段
    const formattedStore = {
      ...storeJson,
      hours,
      location,
      detailImage: storeJson.detail_image,
    };

    return res.status(200).json(formattedStore);
  } catch (error) {
    console.error('獲取門市詳情失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '獲取門市詳情失敗',
      error: error.message
    });
  }
};

// 獲取所有地區
export const getRegions = async (req, res) => {
  try {
    const regions = await getAllRegions();
    return res.status(200).json(regions);
  } catch (error) {
    console.error('獲取地區資料失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '獲取地區資料失敗',
      error: error.message
    });
  }
};

// 管理員: 創建新門市
export const createStore = async (req, res) => {
  try {
    const storeData = req.body;
    const store = await Store.create(storeData);

    return res.status(201).json({
      status: 'success',
      message: '門市創建成功',
      data: store
    });
  } catch (error) {
    console.error('創建門市失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '創建門市失敗',
      error: error.message
    });
  }
};

// 管理員: 更新門市資料
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該門市'
      });
    }

    await store.update(updateData);

    return res.status(200).json({
      status: 'success',
      message: '門市資料已更新',
      data: store
    });
  } catch (error) {
    console.error('更新門市失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '更新門市失敗',
      error: error.message
    });
  }
};

// 管理員: 刪除門市
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到該門市'
      });
    }

    await store.destroy();

    return res.status(200).json({
      status: 'success',
      message: '門市已刪除'
    });
  } catch (error) {
    console.error('刪除門市失敗:', error);
    return res.status(500).json({
      status: 'error',
      message: '刪除門市失敗',
      error: error.message
    });
  }
};
