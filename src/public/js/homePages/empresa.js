function Empresa() {
    this.registrarInit = function () {
        $(document).ready(() => {
            $("form").on("submit", (e) => {
                e.preventDefault();
                let formData = $("form").serializeArray();
                let model = {}
                formData.map(({ name, value }) => {
                    model[name] = value;
                });
                $.post("/api/user/registrarEmpresa", model, function (response) {
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
    this.perfilInit = function () {
        $(document).ready(() => {
            $.get("/api/empresa/accions", {}, function (response) {
                if (response.success) {
                    let empresa = response.data;
                    let foto = `/img/${empresa.foto}`
                    $("#nombre").val(empresa.nombre_empresa);
                    $("#ubicacion").val(empresa.ubicacion_empresa);
                    $("#descripcion").val(empresa.descripcion_empresa);
                    $("#telefono").val(empresa.telefono_empresa);
                    $("#email").val(empresa.email);
                    $("#sitioW").val(empresa.pagina_web);
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
                let url = "/api/empresa/accions";
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