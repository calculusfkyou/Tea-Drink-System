import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Order } from './orderModel.js';
import { Product } from './productModel.js';

export const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名稱 (冗餘儲存以防商品後續變更)'
  },
  productImage: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '商品圖片 (冗餘儲存)'
  },
  size: {
    type: DataTypes.ENUM('M', 'L'),
    allowNull: false,
    comment: '尺寸: 中杯/大杯'
  },
  sugar: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '糖度'
  },
  ice: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '冰塊'
  },
  toppings: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    comment: '加料選項'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '單價'
  },
  subTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '小計金額'
  }
}, {
  timestamps: true
});

// 建立與訂單和產品模型的關聯
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });
