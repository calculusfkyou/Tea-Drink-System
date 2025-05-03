import { Address } from '../models/addressModel.js';
import sequelize from '../config/database.js';

// 獲取用戶的所有地址
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { userId: req.user.id },
      order: [['isDefault', 'DESC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      data: addresses
    });
  } catch (error) {
    console.error('獲取地址錯誤:', error);
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 創建新地址
export const createAddress = async (req, res) => {
  const { nickname, recipient, phone, city, district, address, isDefault } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // 如果設置為預設地址，先將其他地址設為非預設
    if (isDefault) {
      await Address.update(
        { isDefault: false },
        {
          where: { userId: req.user.id },
          transaction
        }
      );
    }

    // 創建新地址
    const newAddress = await Address.create({
      userId: req.user.id,
      nickname,
      recipient,
      phone,
      city,
      district,
      address,
      isDefault: Boolean(isDefault)
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      status: 'success',
      message: '地址已成功添加',
      data: newAddress
    });
  } catch (error) {
    await transaction.rollback();

    console.error('創建地址錯誤:', error);
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 更新地址
export const updateAddress = async (req, res) => {
  const { nickname, recipient, phone, city, district, address, isDefault } = req.body;
  const addressId = req.params.id;
  const transaction = await sequelize.transaction();

  try {
    const addressToUpdate = await Address.findOne({
      where: { id: addressId, userId: req.user.id },
      transaction
    });

    if (!addressToUpdate) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'fail',
        message: '找不到地址或您沒有權限'
      });
    }

    if (isDefault) {
      await Address.update(
        { isDefault: false },
        {
          where: { userId: req.user.id },
          transaction
        }
      );
    }

    await addressToUpdate.update({
      nickname, recipient, phone, city, district, address, isDefault
    }, { transaction });

    await transaction.commit();

    res.status(200).json({
      status: 'success',
      message: '地址已成功更新',
      data: addressToUpdate
    });
  } catch (error) {
    await transaction.rollback();

    console.error('更新地址錯誤:', error);
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};

// 刪除地址
export const deleteAddress = async (req, res) => {
  const addressId = req.params.id;

  try {
    const address = await Address.findOne({
      where: { id: addressId, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到地址或您沒有權限'
      });
    }

    await address.destroy();

    res.status(200).json({
      status: 'success',
      message: '地址已成功刪除'
    });
  } catch (error) {
    console.error('刪除地址錯誤:', error);
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    });
  }
};
