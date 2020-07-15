const appRouter = require('express').Router();
const { authenticateToken, validatePageAccess } = require('../services/user');
const userCtrl = require('../controllers/user')

appRouter.use('/profesional', require('./profesional'));
appRouter.use('/empresa', require('./empresa'))
// appRouter.use('/admin', require('./admin'))

appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);           //cambiar formato
appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);   // cambiar formato

module.exports = appRouter