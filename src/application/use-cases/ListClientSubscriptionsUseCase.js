class ListClientSubscriptionsUseCase {
  constructor(subscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async execute(clientId) {
    return this.subscriptionRepository.findByClientId(clientId);
  }
}

module.exports = ListClientSubscriptionsUseCase;