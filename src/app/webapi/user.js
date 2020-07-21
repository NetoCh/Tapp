const appRouter = require('express').Router();
const profesionalServices = require('../services/profesional');
const empresaServices = require('../services/empresas');

appRouter.get("/verifySession", async (req, res, next) => {
     await userServices.authenticateToken(req, res, next);
})

appRouter.post('/registrarProfesional', async function (req, res) {
     let model = req.body;
     let response = await profesionalServices.registerProfesional(model);
     res.json(response);
})

appRouter.post('/registrarEmpresa', async function (req, res) {
     let model = req.body;
     let response = await empresaServices.registerEmpresa(model);
     res.json(response);
})

module.exports = appRouter;