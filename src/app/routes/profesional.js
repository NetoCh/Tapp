const appRouter = require('express').Router();
const mainRoute = 'profesionalesPages/index';
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

appRouter.get('/registroProfesional', function (req, res) {
    user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional',
            headerMenu
        }
    })
});

module.exports = appRouter;