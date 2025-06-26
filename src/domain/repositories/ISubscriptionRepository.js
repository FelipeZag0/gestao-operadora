class ISubscriptionRepository {
  async save(subscription) {
    throw new Error('Method "save" not implemented.');
  }
  async findById(id) {
    throw new Error('Method "findById" not implemented.');
  }
  async findByClientId(clientId) {
    throw new Error('Method "findByClientId" not implemented.');
  }
  async findByPlanId(planId) {
    throw new Error('Method "findByPlanId" not implemented.');
  }
  async update(subscription) {
    throw new Error('Method "update" not implemented.');
  }
}

module.exports = ISubscriptionRepository;