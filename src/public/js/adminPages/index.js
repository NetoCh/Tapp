const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `<link rel="import" href="404.html">`,
    defaultPage: {
        name: "", page: "admin/dashboard", postLoad: () => {
            $(document).ready(() => {
                new Charts().init();
            });
    }}
});

route.register({ name: "home", page: "/home" });
route.register({ name: "vacantes", page: "/verVacantes" });
route.register({name: "profesionales", page: "/verProfesionales", postLoad: function () {
        new Profesionales().init();
    }
});
