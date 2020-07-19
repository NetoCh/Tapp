const appRouter = require('express').Router();
const profesionalesCtrl = require('../services/profesional');
const userServices = require('../services/user');

appRouter.get("/getProfesionales", async (req, res) => {
    let response = await profesionalesCtrl.getProfesionales();
    res.json(response);
})

appRouter.get("/perfilProfesional", async (req, res) => {
    let user = userServices.decryptToken(req);
    let response = await userServices.spGetUserDataBDComplete(user.idLogin);
    response.data.email = user.user;
    res.json(response);
})

module.exports = appRouter;