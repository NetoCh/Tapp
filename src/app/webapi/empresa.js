const appRouter = require('express').Router();
const userCtrl = require('../controllers/user');

appRouter.get("/getVacantes", async (req, res) => {
    let response = await userCtrl.TraerProfesionales();
    res.json(response);
})

appRouter.post("/registrarVacantes", async (req, res) => {
    let response = await userCtrl.TraerProfesionales();
    res.json(response);
})


module.exports = appRouter;