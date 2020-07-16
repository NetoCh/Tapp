const appRouter = require('express').Router();
const mainRoute = 'profesionalesPages/index';
const userServices = require('../services/user');
const homeServices = require('../services/home');
const home = require('../services/home');
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
                target: "#"
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
    }
]


appRouter.get('/', async (req, res) => { 
    res.render(mainRoute, {
        page: {
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/registroProfesional', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional',
            headerMenu: userServices.getHeaderMenu(req)
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


module.exports = appRouter;