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

