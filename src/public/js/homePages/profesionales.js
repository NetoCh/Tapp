function Profesionales() {
    this.init = () =>{
        $(document).ready(function () {
            var objProfesionales;
            $.get("/api/profesional/getProfesionales", {}, function (data) {
                var buscar = document.querySelector('#buscar');
                var comparar = new Array();
                objProfesionales = data[0];
                var filtrar = () => {
                    for (let data of objProfesionales) {
                        comparar.push(data.nombre_profesional + " " + data.apellido_profesional);
                    }
                    for (let data of comparar) {
                        let z = comparar.findIndex(index => index === data);
                        let m = document.getElementById(z);
                        if (data.toLowerCase().indexOf(buscar.value.toLowerCase()) !== -1) {
                            if (m.style.display === "none") {
                                m.style.display = "block";
                            }
                        }
                        else {
                            m.style.display = "none";
                        }
                    }
                }
                buscar.addEventListener('keyup', filtrar);
            });
            $(document).on("click", ".message", function () {
                document.getElementById("#nombre").innerHTML = objProfesionales[$(this).data('id')].nombre_profesional + " " + objProfesionales[$(this).data('id')].apellido_profesional;
                document.getElementById("#edad").innerHTML = objProfesionales[$(this).data('id')].edad;
                document.getElementById("#sexo").innerHTML = objProfesionales[$(this).data('id')].sexo;
                document.getElementById("#direccion").innerHTML = objProfesionales[$(this).data('id')].direccion;
                document.getElementById("#email").innerHTML = objProfesionales[$(this).data('id')].email;
                document.getElementById("#telefono").innerHTML = objProfesionales[$(this).data('id')].telefono_profesional;
                document.getElementById("#nivel").innerHTML = objProfesionales[$(this).data('id')].nivel_academico;
                document.getElementById("#experiencia").innerHTML = objProfesionales[$(this).data('id')].experiencia;
            });
            $("#filtrarProfesional").click((e) => {
                e.preventDefault();
                let formData = $("form").serializeArray();
                let params = "";
                formData.forEach((item) => {
                    params += `${item.name}=${item.value}&`;
                });
                let root = '#profesionales?' + params;
                window.location.href = root;
                location.reload();
            })
            // End Doc Ready
        });
    }
}