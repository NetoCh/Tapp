const appRouter = require('express').Router();
const homeServices = require('../services/home')

appRouter.post("/getDestacados", async (req, res) => {
    let response = await homeServices.getDestacados();
    res.json(response);
})

module.exports = appRouter;