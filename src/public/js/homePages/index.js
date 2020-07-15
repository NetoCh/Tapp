const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `404 page not found`,
    defaultPage: { name: "", page: "/home" }
});

route.register({ name: "vacantes", page: "/verVacantes" });
route.register({ name: "profesionales", page: "/verProfesionales", postLoad: function () {
    new Profesionales().init();
    }
});
