'use strict'

const express=require('express')
const userCtrl = require('../controllers/user')
const viewsRouter = require('./views')
const appRouter=express.Router()


appRouter.use('/', viewsRouter);
appRouter.get('/', userCtrl.TraerLogin);
//appRouter.get('/login', userCtrl.Login);
appRouter.post('/registoempresa', userCtrl.RegistrarEmpresa);
appRouter.post('/registoprofesional', userCtrl.RegistrarProfesional);


module.exports=appRouter