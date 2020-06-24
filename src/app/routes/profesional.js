const appRouter = require('express').Router();
const mainRoute = 'profesionalesPages/index';
appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './home'
        }
    })
});

appRouter.get('/registroProfesional', function (req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional'
        }
    })
});

module.exports = appRouter;