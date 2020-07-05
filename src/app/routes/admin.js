const appRouter = require('express').Router();
const mainRoute = 'adminPages/index';
const headerMenu = {
    image: "/img/avatar-6.jpg",
        title: "Titulo",
            subTitle: "Admin",
                list: [
                    {
                        type: "divider",
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
    let user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: './dashboard.ejs',
            sideMenu,
            headerMenu
        }
    })
});



module.exports = appRouter;