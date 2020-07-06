'use strict'

const express = require('express');
const appRouter = express.Router();
const { authenticateToken, validatePageAccess } = require('../services/user');
// const userCtrl = require('../controllers/user')                          se movio a webapi/registrar-api.js



// Import Routes
const homeRoutes = require('./home')
const empresaRoute = require('./empresa');
const profesionalRoute = require('./profesional');
const adminRoute = require('./admin');

appRouter.use('/', homeRoutes);
appRouter.use('/empresa', authenticateToken, validatePageAccess(2), empresaRoute);
appRouter.use('/profesional', authenticateToken, validatePageAccess(3), profesionalRoute);
appRouter.use('/admin', authenticateToken, validatePageAccess(1), adminRoute);
// appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);            se movio a webapi/registrar-api.js
// appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);    se movio a webapi/registrar-api.js


module.exports=appRouter