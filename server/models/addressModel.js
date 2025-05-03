import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './userModel.js';

export const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// 設置與 User 的關聯
Address.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Address, { foreignKey: 'userId' });
