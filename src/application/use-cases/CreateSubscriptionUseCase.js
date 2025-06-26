const Subscription = require('../../domain/entities/Subscription');

class CreateSubscriptionUseCase {
  constructor(clientRepository, planRepository, subscriptionRepository, subscriptionDomainService) {
    this.clientRepository = clientRepository;
    this.planRepository = planRepository;
    this.subscriptionRepository = subscriptionRepository;
    this.subscriptionDomainService = subscriptionDomainService;
  }

  async execute(codCli, codPlano, startDate) {
    const client = await this.clientRepository.findById(codCli);
    if (!client) {
      throw new Error('Client not found.');
    }

    const plan = await this.planRepository.findById(codPlano);
    if (!plan) {
      throw new Error('Plan not found.');
    }

    // Assuming monthly payment frequency for initial nextPaymentDate calculation (can be dynamic based on plan)
    const initialNextPaymentDate = this.subscriptionDomainService.calculateNextPaymentDate(new Date(startDate), 1);

    const subscription = new Subscription(
      null,
      codCli,
      codPlano,
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