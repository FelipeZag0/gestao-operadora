const express = require('express');

class AppRouter {
  constructor(clientController, planController, subscriptionController, paymentController) {
    this.router = express.Router();
    this.clientController = clientController;
    this.planController = planController;
    this.subscriptionController = subscriptionController;
    this.paymentController = paymentController;
    this._setupRoutes();
  }

  _setupRoutes() {
    // Client routes
    this.router.get('/gerenciaplanos/clientes', this.clientController.listClients.bind(this.clientController));
    this.router.post('/gerenciaplanos/cliente', this.clientController.registerClient.bind(this.clientController));

    // Plan routes
    this.router.get('/gerenciaplanos/planos', this.planController.listPlans.bind(this.planController));
    this.router.post('/gerenciaplanos/planos', this.planController.registerPlan.bind(this.planController));
    this.router.patch('/gerenciaplanos/planos/:idPlano', this.planController.updatePlanCost.bind(this.planController)); // Adding update cost endpoint

    // Subscription routes
    this.router.post('/gerenciaplanos/assinaturas', this.subscriptionController.createSubscription.bind(this.subscriptionController));
    this.router.get('/gerenciaplanos/assinaturas/cliente/:codCli', this.subscriptionController.listClientSubscriptions.bind(this.subscriptionController));
    this.router.get('/gerenciaplanos/assinaturas/plano/:codPlano', this.subscriptionController.listPlanSubscribers.bind(this.subscriptionController));

    // Payment route
    this.router.post('/registrarpagamento', this.paymentController.registerPayment.bind(this.paymentController));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AppRouter;