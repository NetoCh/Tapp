const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `404 page not found`,
    defaultPage: {
        name: "", page: "/home", postLoad: function () {
            $(document).ready(() => {
                new Home().init();
            });
        } 
    }
});

route.register({
    name: "vacantes", page: "/verVacantes", postLoad: function () {
        $(document).ready(() => {
            new Vacantes().vacante();
        })
    
    } 
});
route.register({
    name: "profesionales", page: "/verProfesionales", postLoad: function () {
        $(document).ready(() => {
            new Profesionales().profesional();
        })
    
    }
});

route.register({
    name: "registrar-profesional", page: "/registroProfesional", postLoad: function () {
        $(document).ready(() => {
            new Profesionales().registrarInit();
        });
    }
});

route.register({
    name: "registrar-empresa", page: "/registroEmpresa", postLoad: function () {
        $(document).ready(() => {
            new Empresa().registrarInit();
        });
    }
});


