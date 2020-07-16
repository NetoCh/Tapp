const appRouter = require('express').Router();
const mainRoute = 'empresasPages/index';
const userCtrl = require('../controllers/user');
const homeServices = require('../services/home');
const userServices = require('../services/user');
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
        text: "Registrar"
    },
    {
        type: "list",
        text: "",
        list: [
            {
                type: "list-item",
                text: "Vacante",
                target: "#registrarVacante"
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

appRouter.get('/registrarVacante', function (req, res) {
    res.render('empresasPages/registrarVacante')
});

appRouter.get('/empresaVacante', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './empresaVacante',
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