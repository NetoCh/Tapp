const appRouter = require('express').Router();
const mainRoute = 'homePages/index';

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
            route: '../empresasPages/registrarEmpresa'
        }
    })
});

appRouter.get('/registroProfesional', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: '../profesionalesPages/registrarProfesional'
        }
    })
});
appRouter.get('/empresaVacante', function(req, res) {
    res.render('empresasPages/empresaVacante')
});
appRouter.get('/adminDashboard', function(req, res) {
    res.render('adminPages/dashboard.ejs')
});
appRouter.get('/verVacantes', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verVacantes'
        }
    })
});
appRouter.get('/verProfesionales', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verProfesionales'
        }
    })
});






module.exports = appRouter;