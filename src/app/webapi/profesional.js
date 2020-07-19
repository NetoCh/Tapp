const appRouter = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const profesionalesServices = require('../services/profesional');
const userServices = require('../services/user');
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

appRouter.get("/getProfesionales", async (req, res) => {
    let response = await profesionalesServices.getProfesionales();
    res.json(response);
})

appRouter.get("/accions", async (req, res) => {
    let user = userServices.decryptToken(req);
    let response = await userServices.spGetUserDataBDComplete(user.idLogin);
    response.data.email = user.user;
    res.json(response);
})

appRouter.post("/accions", uploadAvatarProfesional.single("avatar"), async (req, res) => {
    let user = userServices.decryptToken(req);
    let model = req.body;
    model.idLogin = user.idLogin;
    let updatedAvatarResponse;
    let response = {
        success: false,
        message: ""
    }
    let updateResponse = await profesionalesServices.update(model);
    if (updateResponse.success) {
        response.success = true;
        response.message = updateResponse.message;
    }
    if (req.file) {
        updatedAvatarResponse = await profesionalesServices.updateAvatar(user.idLogin, req.file);
        response.message += " " + updatedAvatarResponse.message;
    }
    res.json(response);
})

module.exports = appRouter;