const appRouter = require('express').Router();
const mainRoute = 'empresasPages/index';
let user;
const headerMenu = {
    image: "/img/avatar-6.jpg",
    title: "Titulo",
    subTitle: "Empresa",
    list: [
        {
            type: "divider",
        },
        {
            type: "list-item",
            text: "Mi Cuenta",
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
            target: "/logout"
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
                target: "/empresa"
            },
            {
                type: "list-item",
                text: "Vacantes",
                target: "/empresa/verVacantes"
            },
            {
                type: "list-item",
                text: "Profesionales",
                target: "/empresa/verProfesionales"
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

appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: './home',
            sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/registrarVacante', function (req, res) {
    user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: './registrarVacante',
            sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/empresaVacante', function (req, res) {
    user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: './empresaVacante',
            sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/verVacantes', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: '../homePages/verVacantes',
            sideMenu: sideMenu,
            headerMenu
        }
    })
});

appRouter.get('/verProfesionales', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: '../homePages/verProfesionales',
            sideMenu: sideMenu,
            headerMenu
        }
    })
});

module.exports = appRouter;