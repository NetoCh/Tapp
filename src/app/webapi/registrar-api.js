const appRouter = require('express').Router();
const userCtrl = require('../controllers/user')


appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);
appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);