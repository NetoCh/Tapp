'use strict'

const express=require('express')
// const userCtrl = require('../controllers/user')                          se movio a webapi/registrar-api.js
const { authenticateToken } = require('../services/user');
const appRouter=express.Router()

// Import Routes
const viewsRouter = require('./home')
const empresaRoute = require('./empresa');
const profesionalRoute = require('./profesional');
const adminRoute = require('./admin');

appRouter.use('/', viewsRouter);
appRouter.use('/empresa', authenticateToken, empresaRoute);
appRouter.use('/profesional', authenticateToken, profesionalRoute);
appRouter.use('/admin', authenticateToken, adminRoute);
// appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);            se movio a webapi/registrar-api.js
// appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);    se movio a webapi/registrar-api.js


module.exports=appRouter