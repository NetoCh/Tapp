const appRouter = require('express').Router();
const ip = require('ip');
const userServices = require('../services/user');
const homeServices = require('../services/home');
const mainRoute = 'homePages/index';
const userCtrl = require('../controllers/user');

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

appRouter.get('/', async (req, res) => { //aquí debe ir el index.ejs
    let data = await homeServices.getDestacados()
    res.render(mainRoute, {
        page: {
            sideMenu: sideMenu,
            data,
            headerMenu: userServices.getHeaderMenu(req)
        }
    });
});

appRouter.get('/home', function (req, res) { //aquí debe ir el index.ejs
    res.render('homePages/home');
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

appRouter.get('/verVacantes', async function(req, res) {
    const vacantes = await userCtrl.TraerVacantes();
    res.render('homePages/verVacantes', {
        page: {
            areas: vacantes[0],
            empresas: vacantes[1],
            vacantes: vacantes[2]
        }
    })
});

appRouter.get('/verProfesionales', async function(req, res) {
    const profesionales = await userCtrl.TraerProfesionales();
    res.render('homePages/verProfesionales', {
        page: {
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
            profesionales: profesionales[2],
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
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
            vacantes: vacantes[3],
            sideMenu,
            headerMenu: userServices.getHeaderMenu(req)
        }
    })
});


module.exports = appRouter;