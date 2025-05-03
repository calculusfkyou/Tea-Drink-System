import { Order } from '../models/orderModel.js';
import { OrderItem } from '../models/orderItemModel.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import sequelize from '../config/database.js';

// 創建新訂單
export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { cartItems, deliveryMethod, paymentMethod, addressId, storeId, storeName, couponCode, notes } = req.body;

    // 計算訂單總金額
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += parseFloat(item.price) * item.quantity;
    }

    // 應用優惠券折扣 (未來可實作)
    const discountAmount = 0;

    // 創建訂單
    const order = await Order.create({
      userId: req.user.id,
      totalAmount: totalAmount - discountAmount,
      status: '待處理',
      paymentMethod,
      deliveryMethod,
      storeId: deliveryMethod === '自取' ? storeId : null,
      storeName: deliveryMethod === '自取' ? storeName : null,
      addressId: deliveryMethod === '外送' ? addressId : null,
      couponCode,
      discountAmount,
      notes
    }, { transaction });

    // 創建訂單項目
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        productName: item.name,
        productImage: item.image,
        size: item.size,
        sugar: item.sugar,
        ice: item.ice,
        toppings: item.toppings || [],
        quantity: item.quantity,
        unitPrice: parseFloat(item.price) / item.quantity,
        subTotal: parseFloat(item.price)
      }, { transaction });
    }

    // 提交事務
    await transaction.commit();

    // 返回訂單數據
    return res.status(201).json({
      status: 'success',
      message: '訂單創建成功',
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber
      }
    });

  } catch (error) {
    // 回滾事務
    await transaction.rollback();

    console.error('創建訂單時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '創建訂單失敗',
      error: error.message
    });
  }
};

// 獲取用戶所有訂單
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [{
        model: OrderItem,
        include: [{
          model: Product,
          attributes: ['id', 'name', 'image']
        }]
      }]
    });

    return res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    console.error('獲取訂單時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '獲取訂單失敗',
      error: error.message
    });
  }
};

// 獲取指定訂單詳情
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
      include: [{
        model: OrderItem,
        include: [{
          model: Product,
          attributes: ['id', 'name', 'image']
        }]
      }]
    });

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到訂單'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    console.error('獲取訂單詳情時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '獲取訂單詳情失敗',
      error: error.message
    });
  }
};

// 取消訂單
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId }
    });

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到訂單'
      });
    }

    // 只有待處理的訂單可以取消
    if (order.status !== '待處理') {
      return res.status(400).json({
        status: 'fail',
        message: '此訂單狀態無法取消'
      });
    }

    // 更新訂單狀態
    order.status = '已取消';
    await order.save();

    return res.status(200).json({
      status: 'success',
      message: '訂單已成功取消'
    });
  } catch (error) {
    console.error('取消訂單時發生錯誤:', error);
    return res.status(500).json({
      status: 'error',
      message: '取消訂單失敗',
      error: error.message
    });
  }
};
