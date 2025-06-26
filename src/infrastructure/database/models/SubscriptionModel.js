const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const ClientModel = require('./ClientModel');
const PlanModel = require('./PlanModel');

const SubscriptionModel = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClientModel,
      key: 'id',
    },
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanModel,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  lastPaymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  nextPaymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'subscriptions',
  timestamps: false,
});

SubscriptionModel.belongsTo(ClientModel, { foreignKey: 'clientId', as: 'client' });
SubscriptionModel.belongsTo(PlanModel, { foreignKey: 'planId', as: 'plan' });

module.exports = SubscriptionModel;