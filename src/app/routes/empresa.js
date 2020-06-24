const appRouter = require('express').Router();
const mainRoute = 'empresasPages/index';
appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render('empresasPages/index', {
        page: {
            route: './home'
        }
    })
});

appRouter.get('/registrarVacante', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarVacante'
        }
    })
});

appRouter.get('/registroEmpresa', function (req, res) {
    res.render('empresasPages/registrarEmpresa', {
        page: {
            route: './registrarVacante'
        }
    })
});

appRouter.get('/empresaVacante', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './empresaVacante'
        }
    })
});

module.exports = appRouter;