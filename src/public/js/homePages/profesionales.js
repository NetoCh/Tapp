function Profesionales() {
    var self = this;
    this.profesional = () => {
        $(document).ready(function () {
            let objProfesionales;
            $.get("/api/profesional/getProfesionales", {}, function (data) {
                let comparar = new Array();
                objProfesionales = data[0];
                for (let data of objProfesionales) {
                    let obj = new Object();
                    obj.nombre = data.nombre_profesional + " " + data.apellido_profesional + " " + data.nombre_area;
                    obj.id = data.id_profesional;
                    comparar.push(obj);
                }
                var filtrar = () => {
                    let buscar = document.querySelector('#buscar');
                    for (let data of comparar) {
                        let m = document.getElementById(data.id);
                        if (m != null) {
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
    this.registrarInit = () => {
        $(document).ready(() => {
            $("form").on("submit", (e) => {
                e.preventDefault();
                let formData = $("form").serializeArray();
                let model = {}
                formData.map(({name, value}) => {
                    model[name] = value;
                });
                $.post("/api/user/registrarProfesional", model, function (response) {
                    if (response.success) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500,
                            onClose: () => {
                                window.location.href = "/login";
                            }
                        });
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                });
            });
        });
    }
    this.perfilInit = () => {
        $(document).ready(() => {
            $.get("/api/profesional/accions", {}, function (response) {
                if (response.success) {
                    let userData = response.data;
                    let foto = `img/${userData.foto}`;
                    $("#nombreP").val(userData.nombre_profesional);
                    $("#apellidOP").val(userData.apellido_profesional);
                    $("#direccionP").val(userData.direccion);
                    $("#edadP").val(userData.edad);
                    $("input[name='sexopro']").val(userData.sexo);
                    $("#telefonoP").val(userData.telefono_profesional);
                    $("#emailP").val(userData.email)
                    $("#DescP").val(userData.descripcion_profesional);
                    $("#expP").val(userData.experiencia);
                    $('#imagePreview').css('background-image', 'url(' + foto + ')');
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            $("form").on("submit", (e) => {
                e.preventDefault();
                let formData = $("form").serializeArray();
                let model = {}
                formData.map(({ name, value }) => {
                    model[name] = value;
                });
                let url = "/api/profesional/accions";
                let fd = new FormData($("form").get(0));
                new Image().upload(url, fd);
            });
            $("#imageUpload").change(function () {
                let input = this;
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                        $('#imagePreview').hide();
                        $('#imagePreview').fadeIn(650);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            });
        });
    }
}
