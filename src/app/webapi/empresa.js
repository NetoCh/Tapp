const appRouter = require('express').Router();
const userCtrl = require('../controllers/user');
const empresaService = require('../services/empresas');
const userService = require('../services/user');
const sanitizer = require('sanitizer');
const { check, validationResult, sanitize } = require('express-validator');

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
    await check('nombre').isAlphanumeric().withMessage('El nombre solo debe contener caracteres alfanuméricos').isEmpty().withMessage("El campo esta vacío").run(model);
    await check('areaLaboral').isNumeric().withMessage('El nombre solo debe ser un número').isEmpty().withMessage("El campo esta vacío").run(model);
    await check('descripcion').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('trabajosDesen').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('requisitos').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('tipoHorario').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('salario').isFloat().withMessage('Debe ser un número decimal').isEmpty().withMessage("El campo esta vacío").run(model);
    await check('ubicacion').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let response = {
            success: false,
            message: "Sus datos no cumplen las medidas de seguridad, verifique que no se contengan caracteres especiales o scripts.",
            data: []
        }
        return res.json(response)
    }
    model.nombre=sanitizer.sanitize(model.nombre);
    model.descripcion=sanitizer.sanitize(model.descripcion);
    model.trabajosDesen=sanitizer.sanitize(model.trabajosDesen);
    model.requisitos=sanitizer.sanitize(model.requisitos);
    model.ubicacion=sanitizer.sanitize(model.ubicacion);
    let response= await empresaService.spRegistrarVacantes(model)
    res.json(response)
})

module.exports = appRouter;