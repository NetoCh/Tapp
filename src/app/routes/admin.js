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
                target: "/admin/home"
            },
            {
                type: "list-item",
                text: "Vacantes",
                target: "/admin/verVacantes"
            },
            {
                type: "list-item",
                text: "Profesionales",
                target: "/admin/verProfesionales"
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

appRouter.get('/home', function (req, res) { //aquí debe ir el index.ejs
    user = res.user;
    headerMenu.title = user.user;
    res.render(mainRoute, {
        page: {
            route: '../homePages/home',
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