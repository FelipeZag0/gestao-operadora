class ListPlanSubscribersUseCase {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(planId) {
    return this.subscriptionRepository.findByPlanId(planId);
  }
}

module.exports = ListPlanSubscribersUseCase;