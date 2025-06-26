require('dotenv').config();
const sequelize = require('./config/database');
const Server = require('./server');

// Import Domain Entities (for sequelize sync)
const ClientModel = require('./infrastructure/database/models/ClientModel');
const PlanModel = require('./infrastructure/database/models/PlanModel');
const SubscriptionModel = require('./infrastructure/database/models/SubscriptionModel');
const PaymentModel = require('./infrastructure/database/models/PaymentModel');

// Repositories
const ClientRepositoryPg = require('./infrastructure/database/repositories/ClientRepositoryPg');
const PlanRepositoryPg = require('./infrastructure/database/repositories/PlanRepositoryPg');
const SubscriptionRepositoryPg = require('./infrastructure/database/repositories/SubscriptionRepositoryPg');
const PaymentRepositoryPg = require('./infrastructure/database/repositories/PaymentRepositoryPg');

// Domain Services
const SubscriptionDomainService = require('./infrastructure/services/SubscriptionDomainService');

// Use Cases
const RegisterClientUseCase = require('./application/use-cases/RegisterClientUseCase');
const ListClientsUseCase = require('./application/use-cases/ListClientsUseCase');
const RegisterPlanUseCase = require('./application/use-cases/RegisterPlanUseCase');
const ListPlansUseCase = require('./application/use-cases/ListPlansUseCase');
const CreateSubscriptionUseCase = require('./application/use-cases/CreateSubscriptionUseCase');
const ListClientSubscriptionsUseCase = require('./application/use-cases/ListClientSubscriptionsUseCase');
const ListPlanSubscribersUseCase = require('./application/use-cases/ListPlanSubscribersUseCase');
const RegisterPaymentUseCase = require('./application/use-cases/RegisterPaymentUseCase');

// Controllers
const ClientController = require('./infrastructure/web/controllers/ClientController');
const PlanController = require('./infrastructure/web/controllers/PlanController');
const SubscriptionController = require('./infrastructure/web/controllers/SubscriptionController');
const PaymentController = require('./infrastructure/web/controllers/PaymentController');

// Routes
const AppRouter = require('./infrastructure/web/routes');

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models (create tables if they don't exist)
    await sequelize.sync();
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
  const planController = new PlanController(registerPlanUseCase, listPlansUseCase); // Needs update for PATCH
  const subscriptionController = new SubscriptionController(createSubscriptionUseCase, listClientSubscriptionsUseCase, listPlanSubscribersUseCase);
  const paymentController = new PaymentController(registerPaymentUseCase);

  // Instantiate Router
  const appRouter = new AppRouter(clientController, planController, subscriptionController, paymentController);

  // Start Server
  const server = new Server(appRouter);
  server.start();
}

main();