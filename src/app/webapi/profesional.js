const appRouter = require('express').Router();
const profesionalesCtrl = require('../services/profesional');

appRouter.get("/getProfesionales", async (req, res) => {
    let response = await profesionalesCtrl.getProfesionales();
    res.json(response);
})

module.exports = appRouter;