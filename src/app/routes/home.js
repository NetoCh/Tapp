const appRouter = require('express').Router();
const mainRoute = 'homePages/index';
const userCtrl = require('../controllers/user');

appRouter.get('/', function(req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './home'
        }
    })
});
appRouter.get('/login', function(req, res) {
    res.render('homePages/login')
});

appRouter.get('/registroEmpresa', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarEmpresa'
        }
    })
});

appRouter.get('/registroProfesional', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional'
        }
    })
});

appRouter.get('/verVacantes', async function(req, res) {
    const vacantes = await userCtrl.TraerVacantes();
    res.render(mainRoute, {
        page: {
            route: './verVacantes',
            areas: vacantes[0],
            empresas: vacantes[1],
            vacantes: vacantes[2]
        }
    })
});

appRouter.get('/verProfesionales', async function(req, res) {
    const profesionales = await userCtrl.TraerProfesionales();
    res.render(mainRoute, {
        page: {
            route: './verProfesionales',
            profesionales: profesionales[0],
            areas: profesionales[1]
        }
    })
});

appRouter.post('/filtrarProfesionales', async function(req, res){
    var filtro = [req.body.area, req.body.genero, req.body.destacado, req.body.edad_min, req.body.edad_max];
    if (req.body.edad_min == ""){
        filtro[3] = 18
    }
    if (req.body.edad_max == ""){
        filtro[4] = 0
    }
    const profesionales = await userCtrl.FiltrarProfesionales(filtro);
    res.render(mainRoute, {
        page: {
            route: './verProfesionales',
            areas: profesionales[1],
            profesionales: profesionales[2]
        }
    })
});

appRouter.post('/filtrarVacantes', async function(req, res){
    var filtro = [req.body.empresa, req.body.area, req.body.destacado, req.body.salario_min];
    if(req.body.salario_min == ""){
        filtro[3] = 0
    }
    var vacantes = await userCtrl.FiltrarVacantes(filtro);
    res.render(mainRoute, {
        page: {
            route: './verVacantes',
            areas: vacantes[1],
            empresas: vacantes[2],
            vacantes: vacantes[3]
        }
    })
});

module.exports = appRouter;