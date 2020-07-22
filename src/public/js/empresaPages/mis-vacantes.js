var globalData;
var idVacante;
function MisVacantes() {
    var total = 0;
    var self = this
    this.init = () => {
        $(document).ready(() => {

            self.loadPage()
            self.paypal()
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
            if(globalData.length > 0 ){
                for (let index = 0; index < globalData.length; index++) {
                    if (globalData[index].destacado === 1) {
                        globalData[index].imagen = '<img src="img/medalla-de-honor.svg" style="max-width: 40px;">'
                        globalData[index].promo = ''
                    }
                    else {
                        globalData[index].promo = `<a style="font-weight:bold; color:#ffff;" class=" my-1 btn btn-warning btn-sm" data-toggle="modal" data-target="#editarVacante" onclick="new MisVacantes().loadModal(${globalData[index].id_vacante},${true})">Promocionar <img src="img/medalla-de-honor.svg"  style="max-width: 20px;"></a>`
                        globalData[index].imagen = ''
                    }
                    $('#content-card').append(
                        `<div class="col-lg-6 col-md-6 col-sm-12 my-2">
                        <div class="blog-card-entrepressx">
                        <div class="meta-entrepressx">
                            <div class="photo-entrepressx" style="background-image: url(img/${globalData[index].foto})">
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
                                <div class="text-right container"> 
                                    <div class="row">
                                    <div class="col-12">
                                    <a style="font-weight:bold; color:#ffff;" class="my-1 btn btn-success btn-sm" data-toggle="modal" data-target="#editarVacante" onclick="new MisVacantes().loadModal(${globalData[index].id_vacante})">Editar</a>
                                    </div>
                                    <div class="col-12">
                                    <a style="font-weight:bold; color:#ffff;" class="my-1 btn btn-danger btn-sm"  onclick="new MisVacantes().deleteVacante(${globalData[index].id_vacante})">Eliminar</a> 
                                    </div>
                                    <div class="col-12">
                                    ${globalData[index].promo}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    )
                }
            }else{
                $('#content-card').append(
                    `<h1>No Exiten vacantes registradas</h1>`
                )
            }
            
        })
    }

    this.loadModal = (id, val) => {
        let model = globalData.find((element => element.id_vacante === id))
        if (val) {
            $(`#nomVacante`).prop('disabled', true)
            $(`#descripcion`).prop('disabled', true)
            $(`#trabajosDes`).prop('disabled', true)
            $(`#areaLaboral`).prop('disabled', true)
            $(`#requisitos`).prop('disabled', true)
            $(`#tipoHorario`).prop('disabled', true)
            $(`#salario`).prop('disabled', true)
            $(`#ubicacion`).prop('disabled', true)
            $("#btnUpdateVacante").hide()
            $('#pay').show()
        } else {
            $(`#nomVacante`).prop('disabled', false)
            $(`#descripcion`).prop('disabled', false)
            $(`#trabajosDes`).prop('disabled', false)
            $(`#areaLaboral`).prop('disabled', false)
            $(`#requisitos`).prop('disabled', false)
            $(`#tipoHorario`).prop('disabled', false)
            $(`#salario`).prop('disabled', false)
            $(`#ubicacion`).prop('disabled', false)
            $("#btnUpdateVacante").show()
            $('#pay').hide()
        }
        idVacante = id;
        $(`#nomVacante`).val(model.nombre_vacante)
        $(`#descripcion`).val(model.descripcion_vacante)
        $(`#trabajosDes`).val(model.trabajos_desempeñar)
        $(`#areaLaboral`).val(model.area_laboral)
        $(`#requisitos`).val(model.requisitos)
        $(`#tipoHorario`).val(model.tipo_horario)
        $(`#salario`).val(model.salario)
        $(`#ubicacion`).val(model.ubicacion)
        $("#btnUpdateVacante").removeAttr("data-dismiss")
    }

    this.paypal = () => {
        $.get("/api/empresa/client_token", {}, function (clientToken) {
            paypal.Button.render({
                braintree: braintree,
                client: {
                    production: clientToken,
                    sandbox: clientToken
                },
                env: 'sandbox', // Or 'sandbox'
                commit: true, // This will add the transaction amount to the PayPal button
                payment: function (data, actions) {
                    return actions.braintree.create({
                        flow: 'checkout', // Required
                        amount: '10.00', // Required
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
                    let nonce = payload.nonce;
                    payload.nonces = nonce;
                    payload.idVacante = idVacante
                    $.post("/api/empresa/checkout", payload, function (response) {
                        console.log(response)
                        if (response.success) {
                            Swal.fire({
                                position: 'center',
                                icon: response.icon,
                                title: response.message,
                                message: `Id-Transaction: ${response.transactionId}`,
                                showConfirmButton: false,
                                timer: 1000
                            })
                            self.loadPage()
                            $('#editarVacante').modal('hide')
                        } else {
                            self.notification(response);
                        }
                    })
                    Swal.fire({
                        title: 'Procesando Transacción',
                        html: 'Por favor, espere...',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        onBeforeOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                        }
                    });
                },
            }, '#paypal-button');
        });
    }

    this.deleteVacante = (id) => {
        let model = globalData.find((element => element.id_vacante === id))
        Swal.fire({
            title: `¿Esta seguro que desea eliminar la vacante ${model.nombre_vacante}?`,
            text: "Esta acción es ireversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminala!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                $.post('/api/empresa/deleteVacant', { id }, (response) => {
                    if(response.success){
                        self.loadPage()
                    }
                    self.notification(response)
                })
            }
        })
    }
}