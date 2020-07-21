const appRouter = require('express').Router();
const userServices = require('../services/user');
const homeServices = require('../services/home');
const userCtrl = require('../controllers/user');
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
                target: "#home"
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

appRouter.get('/', async function (req, res) {
    res.render(mainRoute, {
        page: {
            sideMenu,
            headerMenu: await userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/home', async function (req, res) {
    res.render('homePages/home', {
        page: {
            button: 'Ver Más...',
            ruta: '#profesionales'
        }
    })
});

appRouter.get('/dashboard', async (req, res) => {
    res.render('adminPages/dashboard');
});



module.exports = appRouter;