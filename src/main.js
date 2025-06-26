require('dotenv').config();
const { authenticate, sync } = require('./config/database.js');
const Server = require('./server.js');

// Import Domain Entities (for sequelize sync)
const ClientModel = require('./infrastructure/database/models/ClientModel.js');
const PlanModel = require('./infrastructure/database/models/PlanModel.js');
const SubscriptionModel = require('./infrastructure/database/models/SubscriptionModel.js');
const PaymentModel = require('./infrastructure/database/models/PaymentModel.js');

// Repositories
const ClientRepositoryPg = require('./infrastructure/database/repositories/ClientRepositoryPg.js');
const PlanRepositoryPg = require('./infrastructure/database/repositories/PlanRepositoryPg.js');
const SubscriptionRepositoryPg = require('./infrastructure/database/repositories/SubscriptionRepositoryPg.js');
const PaymentRepositoryPg = require('./infrastructure/database/repositories/PaymentRepositoryPg.js');

// Domain Services
const SubscriptionDomainService = require('./infrastructure/services/SubscriptionDomainService.js');

// Use Cases
const RegisterClientUseCase = require('./application/use-cases/RegisterClientUseCase.js');
const ListClientsUseCase = require('./application/use-cases/ListClientsUseCase.js');
const RegisterPlanUseCase = require('./application/use-cases/RegisterPlanUseCase.js');
const ListPlansUseCase = require('./application/use-cases/ListPlansUseCase.js');
const CreateSubscriptionUseCase = require('./application/use-cases/CreateSubscriptionUseCase.js');
const ListClientSubscriptionsUseCase = require('./application/use-cases/ListClientSubscriptionsUseCase.js');
const ListPlanSubscribersUseCase = require('./application/use-cases/ListPlanSubscribersUseCase.js');
const RegisterPaymentUseCase = require('./application/use-cases/RegisterPaymentUseCase.js');

// Controllers
const ClientController = require('./infrastructure/web/controllers/ClientController.js');
const PlanController = require('./infrastructure/web/controllers/PlanController.js');
const SubscriptionController = require('./infrastructure/web/controllers/SubscriptionController.js');
const PaymentController = require('./infrastructure/web/controllers/PaymentController.js');

// Routes
const AppRouter = require('./infrastructure/web/routes/index.js'); 

async function initializeDatabase() {
  try {
    await authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models (create tables if they don't exist)
    await sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
    process.exit(1);
  }
}

async function main() {
  await initializeDatabase();

  // Instantiate Repositories
  const clientRepository = new ClientRepositoryPg();
  const planRepository = new PlanRepositoryPg();
  const subscriptionRepository = new SubscriptionRepositoryPg();
  const paymentRepository = new PaymentRepositoryPg();

  // Instantiate Domain Services
  const subscriptionDomainService = new SubscriptionDomainService();

  // Instantiate Use Cases (Dependency Injection)
  const registerClientUseCase = new RegisterClientUseCase(clientRepository);
  const listClientsUseCase = new ListClientsUseCase(clientRepository);
  const registerPlanUseCase = new RegisterPlanUseCase(planRepository);
  const listPlansUseCase = new ListPlansUseCase(planRepository);
  const createSubscriptionUseCase = new CreateSubscriptionUseCase(clientRepository, planRepository, subscriptionRepository, subscriptionDomainService);
  const listClientSubscriptionsUseCase = new ListClientSubscriptionsUseCase(subscriptionRepository);
  const listPlanSubscribersUseCase = new ListPlanSubscribersUseCase(subscriptionRepository);
  const registerPaymentUseCase = new RegisterPaymentUseCase(subscriptionRepository, paymentRepository);

  // Instantiate Controllers (Dependency Injection)
  const clientController = new ClientController(registerClientUseCase, listClientsUseCase);
  const planController = new PlanController(registerPlanUseCase, listPlansUseCase);
  const subscriptionController = new SubscriptionController(createSubscriptionUseCase, listClientSubscriptionsUseCase, listPlanSubscribersUseCase);
  const paymentController = new PaymentController(registerPaymentUseCase);

  // Instantiate Router
  const appRouter = new AppRouter(clientController, planController, subscriptionController, paymentController);

  // Start Server
  const server = new Server(appRouter);
  server.start();
}

main();