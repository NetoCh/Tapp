const appRouter = require('express').Router();
const mainRoute = 'empresasPages/index';
const headerMenu = {
    image: "/img/avatar-6.jpg",
    title: "Titulo",
    subTitle: "Sub Titulo",
    list: [
        {
            type: "divider",
        },
        {
            type: "list-item",
            text: "Configuración",
            target: "/registroEmpresa"
        },
        {
            type: "list-item",
            text: "Vacantes Publicadas",
            target: "empresa/empresaVacante/"
        },
        {
            type: "divider"
        },
        {
            type: "list-item",
            text: "Logout",
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
                target: "empresa/registrarVacante"
            }
        ]
    }
]

appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './home',
            sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/registrarVacante', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarVacante',
            sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/empresaVacante', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './empresaVacante',
            sideMenu,
            headerMenu
        }
    })
});

module.exports = appRouter;