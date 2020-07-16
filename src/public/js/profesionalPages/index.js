const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `<p>404 - Page not found</p>`,
    defaultPage: { name: "", page: "/home" }
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

