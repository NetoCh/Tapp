function MisVacantes() {
    var self = this

    this.init = () => {
        $(document).ready(() => {
            self.loadPage()
        })

    }

    this.loadPage = () => {
        $.post("/api/empresa/getMyVacants", {}, function (data) {
            var response = data.spData
            $("#content-card").html('')
            for (let index = 0; index < response.length; index++) {
                if(response[index].destacado === 1)
                    response[index].imagen = '<img src="img/medalla-de-honor.svg" style="max-width: 40px;">'
                else   
                response[index].imagen = ''
                $('#content-card').append(
                `<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="blog-card-entrepressx">
                        <div class="meta-entrepressx">
                            <div class="photo-entrepressx"
                                style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)">
                            </div>
                            <ul class="details-entrepressx">
                                <li class="date-entrepressx">${response[index].fecha}</li>
                                <li class="area-entrepressx">${response[index].nombre_area}</li>
                                <li class="place-entrepressx">${response[index].ubicacion}</li>
                            </ul>
                        </div>
                        <div class="description-entrepressx">
                            <h1>${response[index].nombre_vacante} ${response[index].imagen}</h1>
                            <h2>${response[index].email}</h2>
                            <p>${response[index].descripcion_vacante}</p>
                            <p class="price-entrepressx text-left">
                                <a style="font-size: 2rem;">${response[index].salario}</a>
                            </p>
                        </div>
                    </div>
                </div>`
                )
            }

        })
    }
}