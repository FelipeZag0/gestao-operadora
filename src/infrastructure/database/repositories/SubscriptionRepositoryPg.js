const ISubscriptionRepository = require('../../../domain/repositories/ISubscriptionRepository');
const SubscriptionModel = require('../models/SubscriptionModel');
const Subscription = require('../../../domain/entities/Subscription');

class SubscriptionRepositoryPg extends ISubscriptionRepository {
  _toDomain(data) {
    if (!data) return null;
    return new Subscription(
      data.id,
      data.codCli,
      data.codPlano,
      data.startDate,
      data.endDate,
      data.status,
      data.lastPaymentDate,
      data.nextPaymentDate
    );
  }

  async save(subscription) {
    const createdSubscription = await SubscriptionModel.create(subscription);
    return this._toDomain(createdSubscription);
  }

  async findById(id) {
    const subscriptionData = await SubscriptionModel.findByPk(id);
    return this._toDomain(subscriptionData);
  }

  async findByCodCli(codCli) {
    const subscriptionsData = await SubscriptionModel.findAll({ where: { codCli } });
    return subscriptionsData.map(this._toDomain);
  }

  async findByCodPlano(codPlano) {
    const subscriptionsData = await SubscriptionModel.findAll({ where: { codPlano } });
    return subscriptionsData.map(this._toDomain);
  }

  async update(subscription) {
    const [updatedRows] = await SubscriptionModel.update(
      {
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.status,
        lastPaymentDate: subscription.lastPaymentDate,
        nextPaymentDate: subscription.nextPaymentDate,
      },
      { where: { id: subscription.id } }
    );
    if (updatedRows === 0) {
      return null;
    }
    return subscription;
  }
}

module.exports = SubscriptionRepositoryPg;