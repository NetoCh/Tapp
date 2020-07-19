const appRouter = require('express').Router();
const userCtrl = require('../controllers/user');
const adminService = require('../services/admin');
const { json } = require('body-parser');

appRouter.get("/getDatos", async(req,res)=>{
    let cantMF= await adminService.GetDatos();
    res.json(cantMF);
})

module.exports = appRouter;