const appRouter = require('express').Router();
const vacantesCtrl = require('../services/vacante');

appRouter.get("/getVacantes", async (req, res) => {
    let response = await vacantesCtrl.getVacantes();
    res.json(response);
})

module.exports = appRouter;