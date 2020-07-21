const { route } = plugdo;
route.load({
    el: '#container',
    notFoundMessage: `<link rel="import" href="404.html">`,
    defaultPage: {
        name: "", page: "admin/dashboard", postLoad: () => {
            $(document).ready(() => {
                new Charts().init();
            });
        }
    }
});
route.register({
    name: "home", page: "admin/home", postLoad: function () {
        new Home().init()
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
