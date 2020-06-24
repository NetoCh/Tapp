const appRouter = require('express').Router();
const mainRoute = 'adminPages/index';
appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './dashboard.ejs'
        }
    })
});



module.exports = appRouter;