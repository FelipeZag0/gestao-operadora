const Subscription = require('../../domain/entities/Subscription');

class CreateSubscriptionUseCase {
  constructor(clientRepository, planRepository, subscriptionRepository, subscriptionDomainService) {
    this.clientRepository = clientRepository;
    this.planRepository = planRepository;
    this.subscriptionRepository = subscriptionRepository;
    this.subscriptionDomainService = subscriptionDomainService;
  }

  async execute(clientId, planId, startDate) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new Error('Client not found.');
    }

    const plan = await this.planRepository.findById(planId);
    if (!plan) {
      throw new Error('Plan not found.');
    }

    // Assuming monthly payment frequency for initial nextPaymentDate calculation (can be dynamic based on plan)
    const initialNextPaymentDate = this.subscriptionDomainService.calculateNextPaymentDate(new Date(startDate), 1);

    const subscription = new Subscription(
      null,
      clientId,
      planId,
      new Date(startDate),
      null, // endDate
      'active',
      null, // lastPaymentDate
      initialNextPaymentDate
    );

    return this.subscriptionRepository.save(subscription);
  }
}

module.exports = CreateSubscriptionUseCase;