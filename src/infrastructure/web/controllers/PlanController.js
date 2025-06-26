class PlanController {
  constructor(registerPlanUseCase, listPlansUseCase) {
    this.registerPlanUseCase = registerPlanUseCase;
    this.listPlansUseCase = listPlansUseCase;
  }

  async registerPlan(req, res) {
    try {
      const { name, description, monthlyCost } = req.body;
      const plan = await this.registerPlanUseCase.execute(name, description, monthlyCost);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listPlans(req, res) {
    try {
      const plans = await this.listPlansUseCase.execute();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = PlanController;