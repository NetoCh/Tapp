const appRouter = require('express').Router();

appRouter.get('/', function(req, res) { //aquí debe ir el index.ejs
    res.render('homePages/index')
});
appRouter.get('/login', function(req, res) {
    res.render('homePages/login')
});
appRouter.get('/registrarVacante', function(req, res) {
    res.render('empresasPages/registrarVacante')
});

appRouter.get('/registoEmpresa', function(req, res) {
    res.render('empresasPages/registrarEmpresa')
});

appRouter.get('/registroProfesional', function(req, res) {
    res.render('profesionalesPages/registrarProfesional')
});
appRouter.get('/empresaVacante', function(req, res) {
    res.render('empresasPages/empresaVacante')
});
appRouter.get('/adminDashboard', function(req, res) {
    res.render('adminPages/dashboard.ejs')
});
appRouter.get('/verVacantes', function(req, res) {
    res.render('homePages/verVacantes.ejs')
});
appRouter.get('/verProfesionales', function(req, res) {
    res.render('homePages/verProfesionales.ejs')
});






module.exports = appRouter;