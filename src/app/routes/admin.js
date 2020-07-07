const appRouter = require('express').Router();
const userServices = require('../services/user');
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
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/home', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: '../homePages/home',
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/verVacantes', async function (req, res) {
    const vacantes = await userCtrl.TraerVacantes();
    res.render(mainRoute, {
        page: {
            route: '../homePages/verVacantes',
            areas: vacantes[0],
            empresas: vacantes[1],
            vacantes: vacantes[2],
            sideMenu: sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/verProfesionales', async function (req, res) {
    const profesionales = await userCtrl.TraerProfesionales();
    res.render(mainRoute, {
        page: {
            route: '../homePages/verProfesionales',
            profesionales: profesionales[0],
            areas: profesionales[1],
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

module.exports = appRouter;