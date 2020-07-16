const appRouter = require('express').Router();
const vacantesCtrl = require('../services/vacante');

appRouter.get("/getVacantes", async (req, res) => {
    let response = await vacantesCtrl.getVacantes();
    res.json(response);
})

appRouter.post("/registrarVacantes", async (req, res) => {
    let response = await userCtrl.TraerProfesionales();
    res.json(response);
})


module.exports = appRouter;