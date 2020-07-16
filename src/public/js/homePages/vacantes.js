function Vacantes() {
    this.vacante = () => {
        $(document).ready(function() {
            let objVacantes;
            $.get("/api/empresa/getVacantes", {}, function (data) {
                var comparar = new Array();
                objVacantes = data[2];
                for (let data of objVacantes) {
                    let obj = new Object();
                    obj.nombre = data.nombre_empresa+ " "+data.nombre_vacante;
                    obj.id = data.id_vacante;
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
            $(document).on("click", ".messageVacante", function () {
                let id = $(this).data('id');
                let found = objVacantes.find(x => x.id_vacante === id)
                document.getElementById("#nombre").innerHTML = found.nombre_vacante;
                document.getElementById("#descripcion").innerHTML = found.descripcion_vacante;
                document.getElementById("#area").innerHTML = found.nombre_area;
                document.getElementById("#requisito").innerHTML = found.requisitos;
                document.getElementById("#trabajos").innerHTML = found.trabajos_desempeñar;
                document.getElementById("#salario").innerHTML = "$"+found.salario;
                document.getElementById("#ubicacion").innerHTML = found.ubicacion;
                document.getElementById("#horario").innerHTML = found.tipo_horario;
                document.getElementById("#fecha").innerHTML = found.fecha;
                document.getElementById("#empresa").innerHTML = found.nombre_empresa; 
                document.getElementById("#descripcionempr").innerHTML = found.descripcion_empresa;  
                document.getElementById("#telefono").innerHTML = found.telefono_empresa; 
                document.getElementById("#sitio").innerHTML = found.pagina_web;  
                document.getElementById("#email").innerHTML = found.email;
            });
            $("#filtrarVacante").click((e) => {
                e.preventDefault();
                let formData = $("form").serializeArray();
                let params = "";
                formData.forEach((item) => {
                    params += `${item.name}=${item.value}&`;
                });
                let root = '#vacantes?' + params;
                window.location.href = root;
                location.reload();
            })
            // End Doc Ready
        });
    }
}