const appRouter = require('express').Router();
const ip = require('ip');
const userServices = require('../services/user');
const user = require('../services/user');
const mainRoute = 'homePages/index';
const headerMenu = {
    image: "/img/avatar-6.jpg",
    title: "Titulo",
    subTitle: "Sub Titulo",
    list: [
        {
            type: "divider",
        },
        {
            type: "list-item",
            text: "Configuración",
            target: "/registroEmpresa"
        },
        {
            type: "divider"
        },
        {
            type: "list-item",
            text: "Login",
            target: "/login"
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
                target: "/"
            },
            {
                type: "list-item",
                text: "Vacantes",
                target: "/verVacantes"
            },
            {
                type: "list-item",
                text: "Profesionales",
                target: "/verProfesionales"
            }
        ]
    }
]

appRouter.get('/', function (req, res) { //aquí debe ir el index.ejs
    res.render(mainRoute, {
        page: {
            route: './home',
            sideMenu: sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    });
});

appRouter.get('/login', function(req, res) {
    res.render('homePages/login')
});

appRouter.post('/login', async function (req, res) {
    let user = req.body;
    user.ip = ip.address() || "";
    // Llamar funcion para verificar si el usuario y la contraseña existe
    try {
        let response = await userServices.signIn(user); 
        if (response.success) {
            res.cookie("token", response.token, { expires: new Date(Date.now() + 60000 * 60), httpOnly: true});
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

appRouter.get('/logout', function (req,res) {
    res.clearCookie("token");
    res.clearCookie("active");
    res.redirect('/');
    userServices.signOut(req);
});

appRouter.get('/registroEmpresa', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarEmpresa',
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/registroProfesional', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './registrarProfesional',
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/verVacantes', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verVacantes',
            sideMenu: sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

appRouter.get('/verProfesionales', function(req, res) {
    res.render(mainRoute, {
        page: {
            route: './verProfesionales',
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});

module.exports = appRouter;