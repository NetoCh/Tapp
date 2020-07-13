const appRouter = require('express').Router();
const mainRoute = 'profesionalesPages/index';
const userServices = require('../services/user');
const homeServices = require('../services/home');
const home = require('../services/home');
const headerMenu = {
    image: "/img/avatar-6.jpg",
    title: "Titulo",
    subTitle: "Porfesional",
    list: [
        {
            type: "divider",
        },
        {
            type: "list-item",
            text: "Configuración",
            target: "/registroProfesional"
        },
        {
            type: "divider"
        },
        {
            type: "list-item",
            text: "Login",
            target: "/login"
        }
    ]
}
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
                target: "/"
            },
            {
                type: "list-item",
                text: "Vacantes",
                target: "/verVacantes"
            },
            {
                type: "list-item",
                text: "Profesionales",
                target: "/verProfesionales"
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
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/registroProfesional', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional',
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

module.exports = appRouter;