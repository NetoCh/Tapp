const appRouter = require('express').Router();
const mainRoute = 'homePages/index';
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

appRouter.get('/', function(req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './home',
            sideMenu: sideMenu,
            headerMenu
        }
    })
});
appRouter.get('/login', function(req, res) {
    res.render('homePages/login')
});

appRouter.get('/registroEmpresa', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarEmpresa',
            headerMenu
        }
    })
});

appRouter.get('/registroProfesional', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional',
            headerMenu
        }
    })
});
appRouter.get('/verVacantes', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verVacantes',
            sideMenu: sideMenu,
            headerMenu
        }
    })
});
appRouter.get('/verProfesionales', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verProfesionales',
            sideMenu: sideMenu,
            headerMenu
        }
    })
});

module.exports = appRouter;