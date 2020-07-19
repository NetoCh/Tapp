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
                target: "/empresa/registrarVacante"
            }
        ]
    }
]

appRouter.get('/', async (req, res) => { //aquí debe ir el index.ejs
    let data = await homeServices.getDestacados()
    res.render(mainRoute, {
        page: {
            route: './home',
            sideMenu,
            data,
            headerMenu: await userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/registrarVacante', async function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarVacante',
            sideMenu,
            headerMenu: await userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/empresaVacante', function (req, res) {
    res.render("empresasPages/empresaVacante");
});


module.exports = appRouter;