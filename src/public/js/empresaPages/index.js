const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `<link rel="import" href="404.html">`,
    defaultPage: {
        name: "", page: "/home", postLoad: () => {
    }}
});

route.register({ name: "home", page: "/home" });
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
    name: "vacantes-publicadas", page: "empresa/empresaVacante", postLoad: function () {
    }
});

route.register({ name: "registrarVacante", page: "empresa/registrarVacante", postLoad: function () {
    new RegistrarVacantes().init();
    }
});

