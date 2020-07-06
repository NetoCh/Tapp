const appRouter = require('express').Router();
const mainRoute = 'adminPages/index';
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
            },
            {
                type: "list-item",
                text: "Login",
                target: "/login"
            }
        ]
    },
    {
        type: "title",
        text: "ADMIN"
    },
    {
        type: "list",
        text: "",
        list: [
            {
                type: "list-item",
                text: "Dashboard",
                target: "/admin"
            }
        ]
    }
]

appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './dashboard.ejs',
            sideMenu
        }
    })
});



module.exports = appRouter;