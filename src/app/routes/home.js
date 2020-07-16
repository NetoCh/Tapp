const appRouter = require('express').Router();
const ip = require('ip');
const userServices = require('../services/user');
const homeServices = require('../services/home');
const vacanteServices = require('../services/vacante');
const profesionalServices = require('../services/profesional');
const mainRoute = 'homePages/index';
const userCtrl = require('../controllers/user');
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

appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            sideMenu: sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    });
});

appRouter.get('/home', async (req, res) => { //aquí debe ir el index.ejs
    let data = await homeServices.getDestacados()
    res.render('homePages/home', {
        page: {
            data
        }
    });
});

appRouter.get('/login', function (req, res) {
    res.render('homePages/login')
});

appRouter.post('/login', async function (req, res) {
    let user = req.body;
    user.ip = ip.address() || "";
    // Llamar funcion para verificar si el usuario y la contraseña existe
    try {
        let response = await userServices.signIn(user);
        if (response.success) {
            res.cookie("token", response.token, { expires: new Date(Date.now() + 60000 * 60), httpOnly: true });
            res.redirect(response.route);
        } else {
            res.render('homePages/login', {
                message: [
                    {
                        type: "danger",
                        message: response.message
                    }
                ]
            });
        }
    } catch (err) {
        console.log(err)
    }
});

appRouter.get('/logout', function (req, res) {
    userServices.signOut(req);
    res.clearCookie("token");
    res.clearCookie("active");
    res.redirect('/');
});

appRouter.get('/registroEmpresa', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarEmpresa',
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

appRouter.get('/verVacantes', async function (req, res) {
    let dbResponse;
    let vacantes;
    let areas;
    let empresas;
    let { empresa, area, destacado, salario_min } = req.query;
    var filtro = [empresa, area, destacado, salario_min];
    if (empresa !== undefined & area !== undefined & destacado !== undefined & salario_min !== undefined) {
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
    if (area !== undefined & genero !== undefined & destacado !== undefined & edad_min !== undefined & edad_max !== undefined) {
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


//creo que no va
appRouter.post('/filtrarProfesionales', async function (req, res) {
    var filtro = [req.body.area, req.body.genero, req.body.destacado, req.body.edad_min, req.body.edad_max];
    if (req.body.edad_min == "") {
        filtro[3] = 18
    }
    if (req.body.edad_max == "") {
        filtro[4] = 0
    }
    const profesionales = await userCtrl.FiltrarProfesionales(filtro);
    res.render(mainRoute, {
        page: {
            route: './verProfesionales',
            areas: profesionales[1],
            profesionales: profesionales[2],
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});
//creo que no va
appRouter.post('/filtrarVacantes', async function (req, res) {
    var filtro = [req.body.empresa, req.body.area, req.body.destacado, req.body.salario_min];
    if (req.body.salario_min == "") {
        filtro[3] = 0
    }
    var vacantes = await userCtrl.FiltrarVacantes(filtro);
    res.render(mainRoute, {
        page: {
            route: './verVacantes',
            areas: vacantes[1],
            empresas: vacantes[2],
            vacantes: vacantes[3],
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

module.exports = appRouter;