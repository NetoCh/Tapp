function Image() {
    this.upload = function (url, fd) {
        // let url = "/api/user/registrarProfesional"
        // let fd = new FormData($("form").get(0));
        $.ajax({
            url: url,
            data: fd,
            dataType: 'json',
            type: 'POST',
            processData: false,
            contentType: false,
            success: function (response) {
                let icon = response.success ? "success" : "error";
                Swal.fire({
                    position: 'center',
                    icon: icon,
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                    onClose: () => {
                        if(response.success) window.location.reload(true);
                    }
                })
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    }
}