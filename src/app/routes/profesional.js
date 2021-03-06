const appRouter = require('express').Router();
const mainRoute = 'profesionalesPages/index';
const userServices = require('../services/user');
const homeServices = require('../services/home');
const home = require('../services/home');
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
    }
]

appRouter.get('/', async (req, res) => {
    try {
        res.render(mainRoute, {
            page: {
                sideMenu,
                headerMenu: await userServices.getHeaderMenu(req)
            }
        })
    } catch (e) {
        console.log(e)
    }

});
appRouter.get('/home', (req, res) => {
    res.render("homePages/home", {
        page: {
            button: 'Ver Más',
            ruta: '#profesionales'
        }
    });
});

appRouter.get('/perfil', (req, res) => {
    res.render("profesionalesPages/perfil");
});

module.exports = appRouter;