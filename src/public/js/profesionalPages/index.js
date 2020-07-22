const { route } = plugdo;

route.load({
    el: '#container',
    notFoundMessage: `<p>404 - Page not found</p>`,
    defaultPage: {
       name: "", page: "profesional/home", postLoad: function () {
            $(document).ready(() => {
                new Home().init(); 
            })
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
    name: "perfil", page: "profesional/perfil", postLoad: function () {
        $(document).ready(() => {
            new Profesionales().perfilInit();
        });
    }
});

