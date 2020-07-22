const appRouter = require('express').Router();
const fs = require('fs');
const braintree = require('braintree');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const vacantesCtrl = require('../services/vacante');
const empresaService = require('../services/empresas');
const userService = require('../services/user');
const sanitizer = require('sanitizer');
const { check, validationResult, sanitize } = require('express-validator');
const { response } = require('express');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileStorage = 'src/public/img/';
        fs.mkdir(fileStorage, { recursive: true }, (err) => {
            if (err) throw err;
        });
        cb(null, fileStorage)
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + '.' + file.mimetype.split("image/")[1])
    }
});
var uploadAvatarProfesional = multer({
    storage: storage
});

appRouter.get("/getVacantes", async (req, res) => {
    let response = await vacantesCtrl.getVacantes();
    res.json(response);
})

appRouter.get("/getAreas", async (req, res) => {
    let areas = await empresaService.GetAreas();
    res.json(areas);
})

appRouter.get("/getTipoHorarios", async (req, res) => {
    let tipoHorarios = await empresaService.GetTipoHorarios();
    res.json(tipoHorarios);
})
appRouter.post("/registrarVacantes", async (req, res) => {
    let user = userService.decryptToken(req);
    let model = req.body;
    model.idLogin = user.idLogin;
    model.areaLaboral = parseInt(model.areaLaboral)
    model.tipoHorario = parseInt(model.tipoHorario)
    model.salario = parseFloat(model.salario)
    await check('nombre').isAlphanumeric().withMessage('El nombre solo debe contener caracteres alfanuméricos').isEmpty().withMessage("El campo esta vacío").run(model);
    await check('areaLaboral').isNumeric().withMessage('El nombre solo debe ser un número').isEmpty().withMessage("El campo esta vacío").run(model);
    await check('descripcion').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('trabajosDesen').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('requisitos').isAscii().withMessage("El campo debe contener solo caracteres ASCII").isEmpty().withMessage("El campo esta vacío").run(model);
    await check('tipoHorario').isNumeric().withMessage('El nombre solo debe ser un número').isEmpty().withMessage("El campo esta vacío").run(model);
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
    model.nombre = sanitizer.sanitize(model.nombre);
    model.descripcion = sanitizer.sanitize(model.descripcion);
    model.trabajosDesen = sanitizer.sanitize(model.trabajosDesen);
    model.requisitos = sanitizer.sanitize(model.requisitos);
    model.ubicacion = sanitizer.sanitize(model.ubicacion);
    let response = await empresaService.spRegistrarVacantes(model)
    res.json(response)
})

appRouter.post('/getMyVacants', async (req, res) => {
    let id = userService.decryptToken(req).idLogin;
    let response = await empresaService.spGetVacant(id)
    res.json(response)
})

appRouter.post('/updateVacante', async (req, res) => {
    let model = req.body;
    let response = await empresaService.spUpdateVacante(model)
    res.json(response)
})

appRouter.get("/accions", async (req, res) => {
    let user = userService.decryptToken(req);
    let response = await userService.spGetUserDataBDComplete(user.idLogin);
    response.data.email = user.user;
    res.json(response);
})

appRouter.post("/accions", uploadAvatarProfesional.single("avatar"), async (req, res) => {
    let user = userService.decryptToken(req);
    let model = req.body;
    model.idLogin = user.idLogin;
    let response = await empresaService.update(model);
    if (req.file) {
        let updatedAvatarResponse = await empresaService.updateAvatar(user.idLogin, req.file);
        if(!updatedAvatarResponse.success)
            response.message += " " + updatedAvatarResponse.message;
    }
    res.json(response);
})

var gateway = braintree.connect({
    accessToken: 'access_token$sandbox$3s78y6tdbxdyhvgb$3d6798054cc7efac2921b3bac068aeb3'
});

appRouter.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});

appRouter.post("/checkout", (req, res) => {
    // let user = userServices.decryptToken(req);
    var saleRequest = {
        amount: 10.00,
        merchantAccountId: "USD",
        paymentMethodNonce: req.body.nonces,
        orderId: uuidv4(),
        descriptor: {
            name: "tap*testttest"
        },
        shipping: {
            firstName: "Jen",
            lastName: "Smith",
            company: "Braintree",
            streetAddress: "1 E 1st St",
            extendedAddress: "5th Floor",
            locality: "Bartlett",
            region: "IL",
            postalCode: "60103",
            countryCodeAlpha2: "US"
        },
        options: {
            paypal: {
                customField: "PayPal",
                description: "tap*testttest"
            },
            submitForSettlement: true
        }
    };
    gateway.transaction.sale(saleRequest, async (err, result) => {
        let model = {
            success : false,
            icon : 'error',
            message : 'Transacción Declinada.'
        }
        if (err) {
            res.send(model);
        } else if (result.success) {
            await empresaService.spDestacarVacnte(req.body.idVacante);
            model.success = true;
            model.icon = 'success';
            model.message = 'Transacción exitosa'
            model.transactionId = result.transaction.id
            res.send(model);
        } else {
            res.send(model);
        }
    });
});

appRouter.post("/deleteVacant", async (req, res) => {
    let response = await empresaService.spDeleteVacante(req.body.id);
    res.json(response);
});



module.exports = appRouter;