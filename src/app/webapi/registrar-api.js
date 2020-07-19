const appRouter = require('express').Router();
const { authenticateToken, validatePageAccess } = require('../services/user');

appRouter.use('/profesional', require('./profesional'));
appRouter.use('/empresa', require('./empresa'))
appRouter.use('/admin', require('./admin'))
appRouter.use('/user', require('./user'));


module.exports = appRouter