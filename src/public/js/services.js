function Image() {
    this.saveImage = function (url, fd) {
        // let url = "/api/user/registrarProfesional"
        // let fd = new FormData($("form").get(0));
        $.ajax({
            url: url,
            data: fd,
            dataType: 'json',
            type: 'POST',
            processData: false,
            contentType: false,
            success: function (data) {
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    }
}