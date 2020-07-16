function Profesionales() {
    this.profesional = () =>{
        $(document).ready(function () {
            var objProfesionales;
            $.get("/api/profesional/getProfesionales", {}, function (data) {
                let comparar = new Array();
                objProfesionales = data[0];
                for (let data of objProfesionales) {
                    let obj = new Object();
                    obj.nombre = data.nombre_profesional + " "+ data.apellido_profesional + " " + data.nombre_area;
                    obj.id = data.id_profesional;
                    comparar.push(obj);
                }
                var filtrar = () => {
                    let buscar = document.querySelector('#buscar');
                    for (let data of comparar) {
                        let m = document.getElementById(data.id);
                        if(m != null) {
                            if (data.nombre.toLowerCase().indexOf(buscar.value.toLowerCase()) !== -1) {
                                if (m.style.display === "none") {
                                    m.style.display = "block";
                                }
                            }
                            else {
                                m.style.display = "none";
                            }
                        }
                    }
                }
                buscar.addEventListener('keyup', filtrar);
            });
            $(document).on("click", ".messageProfesional", function () {
                let id = $(this).data('id');
                let found = objProfesionales.findIndex(x => x.id_profesional === id);
                document.getElementById("#nombre").innerHTML = objProfesionales[found].nombre_profesional + " " + objProfesionales[found].apellido_profesional;
                document.getElementById("#edad").innerHTML = objProfesionales[found].edad;
                document.getElementById("#sexo").innerHTML = objProfesionales[found].sexo;
                document.getElementById("#direccion").innerHTML = objProfesionales[found].direccion;
                document.getElementById("#email").innerHTML = objProfesionales[found].email;
                document.getElementById("#telefono").innerHTML = objProfesionales[found].telefono_profesional;
                document.getElementById("#nivel").innerHTML = objProfesionales[found].nivel_academico;
                document.getElementById("#experiencia").innerHTML = objProfesionales[found].experiencia;
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