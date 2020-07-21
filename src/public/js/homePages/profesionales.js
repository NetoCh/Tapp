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
            $.get("/api/empresa/getAreas", {}, function (response) {
                if (!response.success) return;
                SELECT.fill(response.data, "areas", { text: "nombre", value: "id_area" }); 
            });
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
            $.get("/api/profesional/destacado", {}, function (response) {
                if (response.success) {
                    $("#paypal-button").hide();
                    $("#destacar-title-paypal-button").hide();
                } else {
                    $.get("/api/profesional/client_token", {}, function (clientToken) {
                        paypal.Button.render({
                        braintree: braintree,
                        client: {
                            production: clientToken,
                            sandbox: clientToken
                            },
                            locale: 'en_US',
                            style: {
                                size: 'small',
                                color: 'black',
                                shape: 'pill',
                                label: 'checkout',
                                tagline: 'false'
                            },
                        env: 'sandbox', // Or 'sandbox'
                        commit: true, // This will add the transaction amount to the PayPal button
                            payment: function (data, actions) {
                            return actions.braintree.create({
                                flow: 'checkout', // Required
                                amount: 2.00, // Required
                                currency: 'USD', // Required
                                enableShippingAddress: true,
                                shippingAddressEditable: false,
                                shippingAddressOverride: {
                                    recipientName: 'Tapp',
                                    line1: 'Panama',
                                    line2: 'Panama',
                                    city: 'Panama',
                                    countryCode: 'PA',
                                    postalCode: '507',
                                    state: 'PA',
                                    phone: '123.456.7890'
                                }
                            });
                        },
                        onAuthorize: function (payload) {
                            // Submit `payload.nonce` to your server.
                            let nonce = payload.nonce;
                            payload.nonces = nonce;
                            $.post("/api/profesional/checkout", payload, function (response) {
                                let icon = response.success ? "success" : "error";
                                Swal.fire({
                                    position: 'top-end',
                                    icon: icon,
                                    title: response.message,
                                    showConfirmButton: false,
                                    onClose: () => {
                                        if (response.success) window.location.reload(true);
                                    }
                                })
                            });
                        },
                        }, '#paypal-button');
                    });
                }
            });
            
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
