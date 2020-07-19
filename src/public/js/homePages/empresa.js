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
}