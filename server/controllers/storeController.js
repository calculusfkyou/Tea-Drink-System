import { storeData, getAllRegions } from '../models/storeModel.js';

// 獲取所有門市資料
export const getAllStores = (req, res) => {
  try {
    const { region } = req.query;

    let result = [...storeData];

    // 如果有指定地區，則過濾門市
    if (region && region !== '全部') {
      result = result.filter(store => store.region === region);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: '獲取門市資料失敗', error: error.message });
  }
};

// 獲取單個門市詳情
export const getStoreById = (req, res) => {
  try {
    const { id } = req.params;
    const store = storeData.find(item => item.id === parseInt(id));

    if (!store) {
      return res.status(404).json({ message: '找不到該門市資料' });
    }

    return res.status(200).json(store);
  } catch (error) {
    return res.status(500).json({ message: '獲取門市詳情失敗', error: error.message });
  }
};

// 獲取所有地區
export const getRegions = (req, res) => {
  try {
    const regions = getAllRegions();
    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ message: '獲取地區資料失敗', error: error.message });
  }
};
