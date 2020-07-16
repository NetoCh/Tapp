const appRouter = require('express').Router();
const userServices = require('../services/user');

appRouter.get("/verifySession", async (req, res, next) => {
     await userServices.authenticateToken(req, res, next);
})

module.exports = appRouter;