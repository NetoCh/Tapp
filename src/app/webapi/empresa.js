const appRouter = require('express').Router();
const userCtrl = require('../controllers/user');
const empresaService = require('../services/empresas');
const userService = require('../services/user');

appRouter.get("/getVacantes", async (req, res) => {
    let response = await userCtrl.TraerProfesionales();
    res.json(response);
})

appRouter.get("/getAreas", async(req,res)=>{
    let areas= await empresaService.GetAreas();
    res.json(areas);
})
appRouter.post("/registrarVacantes", async(req,res)=>{
    let user = userService.decryptToken(req);
    let model=req.body;
    model.idLogin=user.idLogin;
    model.areaLaboral=parseInt(model.areaLaboral)
    model.salario=parseFloat(model.salario)
    console.log(model)
    let response= await empresaService.spRegistrarVacantes(model)
    console.log(response)
    res.json(response)
})

module.exports = appRouter;