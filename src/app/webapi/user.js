const appRouter = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const profesionalServices = require('../services/profesional');
const empresaServices = require('../services/empresas');
var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          let fileStorage = 'src/public/img/avatar';
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

appRouter.get("/verifySession", async (req, res, next) => {
     await userServices.authenticateToken(req, res, next);
})

appRouter.post('/registrarProfesional', async function (req, res) {
     let model = req.body;
     let response = await profesionalServices.registerProfesional(model);
     res.json(response);
})

appRouter.post('/registrarEmpresa', async function (req, res) {
     let model = req.body;
     let response = await empresaServices.registerEmpresa(model);
     res.json(response);
})

module.exports = appRouter;