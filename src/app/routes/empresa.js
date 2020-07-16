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
    res.render(mainRoute, {
        page: {
            route: './registrarVacante',
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
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
    let dbResponse;
    let vacantes;
    let areas;
    let empresas;
    let { empresa, area, destacado, salario_min } = req.query;
    var filtro = [empresa, area, destacado, salario_min];
    if (empresa !== undefined || area !== undefined || destacado !== undefined || salario_min !== undefined) {
        dbResponse = await vacanteServices.getFiltroVacantes(filtro);
        areas = dbResponse[1];
        empresas = dbResponse[2];
        vacantes = dbResponse[3];
    } else {
        dbResponse = await vacanteServices.getVacantes();
        areas = dbResponse[0];
        empresas = dbResponse[1];
        vacantes = dbResponse[2];
    }
    res.render('homePages/verVacantes', {
        page: {
            areas,
            empresas,
            vacantes
        }
    })
});

appRouter.get('/verProfesionales', async function (req, res) {
    let dbResponse;
    let profesionales;
    let areas;
    let { area, genero, destacado, edad_min, edad_max } = req.query;
    var filtro = [area, genero, destacado, edad_min, edad_max];
    if (area !== undefined || genero !== undefined || destacado !== undefined || edad_min !== undefined || edad_max !== undefined) {
        dbResponse = await profesionalServices.getFiltroProfesionales(filtro);
        profesionales = dbResponse[2];
        areas = dbResponse[1];
    } else {
        dbResponse = await profesionalServices.getProfesionales();
        profesionales = dbResponse[0];
        areas = dbResponse[1];
    }
    res.render('homePages/verProfesionales', {
        page: {
            profesionales,
            areas
        }
    })
});

module.exports = appRouter;