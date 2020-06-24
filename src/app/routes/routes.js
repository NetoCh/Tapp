'use strict'

const express=require('express')
const userCtrl = require('../controllers/user')
const viewsRouter = require('./views')
const appRouter=express.Router()

// Import Routes
const empresaRoute = require('./empresa');
const profesionalRoute = require('./profesional');
const adminRoute = require('./admin');

appRouter.use('/', viewsRouter);
appRouter.get('/', userCtrl.TraerLogin);
appRouter.use('/empresa', empresaRoute);
appRouter.use('/profesional', profesionalRoute);
appRouter.use('/admin', adminRoute);
// appRouter.get('empresa', empresaRoute);
//appRouter.get('/login', userCtrl.Login);
appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);
appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);


module.exports=appRouter