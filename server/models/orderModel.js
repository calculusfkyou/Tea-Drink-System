import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './userModel.js';

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // 生成訂單編號: ORD-YYYYMMDD-XXX (年月日-序號)
    defaultValue: () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `ORD-${year}${month}${day}-${random}`;
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('待處理', '處理中', '已完成', '已取消'),
    defaultValue: '待處理',
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('現金', '信用卡', '行動支付'),
    allowNull: false,
    defaultValue: '現金'
  },
  deliveryMethod: {
    type: DataTypes.ENUM('自取', '外送'),
    allowNull: false,
    defaultValue: '自取'
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '自取門市ID'
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '自取門市名稱'
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '外送地址ID'
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '外送地址詳情'
  },
  couponCode: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '使用的優惠券代碼'
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: '折扣金額'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '訂單備註'
  }
}, {
  timestamps: true
});

// 建立與用戶模型的關聯
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
