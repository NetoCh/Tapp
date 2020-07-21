const appRouter = require('express').Router();
const mainRoute = 'empresasPages/index';
const userCtrl = require('../controllers/user');
const homeServices = require('../services/home');
const userServices = require('../services/user');
const sideMenu = [
    {
        type: "title",
        text: "MAIN"
    },
    {
        type: "list",
        text: "",
        list: [
            {
                type: "list-item",
                text: "Inicio",
                target: "#"
            },
            {
                type: "list-item",
                text: "Vacantes",
                target: "#vacantes"
            },
            {
                type: "list-item",
                text: "Profesionales",
                target: "#profesionales"
            }
        ]
    },
    {
        type: "title",
        text: "Registrar"
    },
    {
        type: "list",
        text: "",
        list: [
            {
                type: "list-item",
                text: "Vacante",
                target: "#registrarVacante"
            }
        ]
    }
]

appRouter.get('/', async (req, res) => { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            sideMenu,
            headerMenu: await userServices.getHeaderMenu(req),
        }
    })
});

appRouter.get('/home', function (req, res) {
    res.render('homePages/home', {
        page: {
            button: 'Ver Más..',
            ruta: '#profesionales'
        }
    })
});

appRouter.get('/registrarVacante', function (req, res) {
    res.render('empresasPages/registrarVacante')
});

appRouter.get('/empresaVacante', function (req, res) {
    res.render("empresasPages/empresaVacante");
});

appRouter.get('/perfil', function (req, res) {
    res.render("empresasPages/perfil");
});


module.exports = appRouter;