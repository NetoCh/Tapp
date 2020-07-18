const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `404 page not found`,
    defaultPage: { name: "", page: "/home" }
});

route.register({ name: "vacantes", page: "/verVacantes", postLoad: function(){
    new Vacantes().vacante();
    } 
});
route.register({ name: "profesionales", page: "/verProfesionales", postLoad: function () {
    new Profesionales().profesional();
    }
});

route.register({
    name: "registrar-profesional", page: "/registroProfesional", postLoad: function () {
        $(document).ready(() => {
            new Profesionales().registrarInit();
        });
    }
});


