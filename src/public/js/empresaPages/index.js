const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `<p>404 - page not found</p>`,
    defaultPage: {
       name: "", page: "empresa/home", postLoad: function () {
            new Home().init();
        } 
    }
});

route.register({
    name: "vacantes", page: "/verVacantes", postLoad: function () {
        new Vacantes().vacante();
    }
});
route.register({
    name: "profesionales", page: "/verProfesionales", postLoad: function () {
        new Profesionales().profesional();
    }
});

route.register({
    name: "empresaVacante", page: "empresa/empresaVacante", postLoad: function () {
        new MisVacantes().init();
    }
});

route.register({
    name: "registrarVacante", page: "empresa/registrarVacante", postLoad: function () {
        new RegistrarVacantes().init();
    }
});

route.register({
    name: "perfil", page: "empresa/perfil", postLoad: function () {
        new Empresa().perfilInit();
    }
});

