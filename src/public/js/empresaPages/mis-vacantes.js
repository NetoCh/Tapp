var globalData;
var idVacante;
function MisVacantes() {
    var self = this
    this.init = () => {
        $(document).ready(() => {

            self.loadPage()

            $.get("/api/empresa/getAreas", {}, function (response) {
                if (response.success) {
                    SELECT.fill(response.data, "areaLaboral", { text: "nombre", value: "id_area" });
                }
            });

            $.get("/api/empresa/getTipoHorarios", {}, function (response) {
                if (response.success) {
                    SELECT.fill(response.data, "tipoHorario", { text: "nombre", value: "id" });
                }
            });
        })

        $("#btnUpdateVacante").click(() => {
            let model = {
                "nombre": $(`#nomVacante`).val(),
                "areaLaboral": $(`#areaLaboral`).val(),
                "descripcion": $(`#descripcion`).val(),
                "trabajosDes": $(`#trabajosDes`).val(),
                "requisitos": $(`#requisitos`).val(),
                "tipoHorario": $(`#tipoHorario`).val(),
                "salario": $(`#salario`).val(),
                "ubicacion": $(`#ubicacion`).val(),
                idVacante
            }
            $.post("/api/empresa/updateVacante", model, function (response) {
                self.notification(response)
                if (response.success) {
                    $('#editarVacante').modal('hide')
                    self.loadPage();
                }
            });
        })
    }

    this.notification = function (model) {
        Swal.fire({
            position: 'center',
            icon: model.icon,
            title: model.message,
            showConfirmButton: false,
            timer: 1000
        })
    }

    this.loadPage = () => {
        $.post("/api/empresa/getMyVacants", {}, function (data) {
            globalData = data.spData
            $("#content-card").html('')
            for (let index = 0; index < globalData.length; index++) {
                if (globalData[index].destacado === 1){
                    globalData[index].imagen = '<img src="img/medalla-de-honor.svg" style="max-width: 40px;">'
                    globalData[index].promo = ''
                } 
                else{
                    globalData[index].promo = '<a style="font-weight:bold; color:#ffff;" class=" my-1 btn btn-warning btn-sm">Promocionar <img src="img/medalla-de-honor.svg" style="max-width: 20px;"></a>'
                    globalData[index].imagen = ''
                }
                $('#content-card').append(
                `<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="blog-card-entrepressx">
                    <div class="meta-entrepressx">
                        <div class="photo-entrepressx" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)">
                        </div>
                        <ul class="details-entrepressx">
                            <li class="date-entrepressx">${globalData[index].fecha}</li>
                            <li class="area-entrepressx">${globalData[index].nombre_area}</li>
                            <li class="place-entrepressx">${globalData[index].ubicacion}</li>
                        </ul>
                        </div>
                        <div class="description-entrepressx">
                            <h1>${globalData[index].nombre_vacante} ${globalData[index].imagen}</h1>
                            <h2>${globalData[index].email}</h2>
                            <p>${globalData[index].descripcion_vacante}</p>
                            <p class="price-entrepressx text-left">
                                <a style="font-size: 2rem;">${globalData[index].salario}</a>
                            </p>
                            ${globalData[index].promo}
                            <a style="font-weight:bold; color:#ffff;" class="my-1 btn btn-success btn-sm" data-toggle="modal" data-target="#editarVacante" onclick="new MisVacantes().loadModal(${globalData[index].id_vacante})">Editar</a> 
                        </div>
                    </div>
                </div>`
                )
            }
        })
    }

    this.loadModal = (id) => {
        let model = globalData.find((element => element.id_vacante === id))
        $(`#nomVacante`).val(model.nombre_vacante)
        $(`#descripcion`).val(model.descripcion_vacante)
        $(`#trabajosDes`).val(model.trabajos_desempeñar)
        $(`#areaLaboral`).val(model.area_laboral)
        $(`#requisitos`).val(model.requisitos)
        $(`#tipoHorario`).val(model.tipo_horario)
        $(`#salario`).val(model.salario)
        $(`#ubicacion`).val(model.ubicacion)
        idVacante = model.id_vacante
        $("#btnUpdateVacante").removeAttr("data-dismiss")
    }
}