const appRouter = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const braintree = require('braintree');
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
var gateway = braintree.connect({
    accessToken: 'access_token$sandbox$56srv6fdmbrh24yg$a8a5b4d8e5d1ba73cb14f3516426bdd0'
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
    let response = await profesionalesServices.update(model);
    if (req.file) {
        let updatedAvatarResponse = await profesionalesServices.updateAvatar(user.idLogin, req.file);
        if (!updatedAvatarResponse.success)
            response.message += " " + updatedAvatarResponse.message;
    }
    res.json(response);
});

appRouter.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});

appRouter.post("/checkout", function (req, res) {
    var saleRequest = {
        amount: 500.00,
        merchantAccountId: "USD",
        paymentMethodNonce: req.body.nonces,
        orderId: "Mapped to PayPal Invoice Number",
        descriptor: {
            name: "tap*testttess"
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
                description: "tap*testttess"
            },
            submitForSettlement: true
        }
    };
    gateway.transaction.sale(saleRequest, function (err, result) {
        if (err) {
            console.log(err);
            res.send({ message: err });
        } else if (result.success) {
            console.log(result);
            res.send({message:result.transaction.id });
        } else {
            res.send({message: result.message });
        }
    });
});

module.exports = appRouter;