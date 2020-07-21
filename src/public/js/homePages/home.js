var globalData;
function Home() {
    var self = this

    this.init = (() => {
        $(document).ready(() => {
            self.loadPage()
        })
    })

    this.loadPage = () => {
        $.post('/api/home/getDestacados', {} , (response) => {
            globalData = response.spData;
            $("#container-empresa").html('')
            $('#container-profesionales').html('')
            for (let index = 0; index < globalData[0].length && index < 3; index++) {
                $("#container-empresa").append(
                    `<div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="blog-card-entrepressx">
                        <div class="meta-entrepressx">
                            <div class="photo-entrepressx"
                                style="background-image: url(img/${globalData[0][index].foto})">
                            </div>
                            <ul class="details-entrepressx">
                                <li class="date-entrepressx">${globalData[0][index].fecha}</li>
                                <li class="area-entrepressx">${globalData[0][index].nombre_area}</li>
                                <li class="place-entrepressx">${globalData[0][index].ubicacion}</li>
                            </ul>
                        </div>
                        <div class="description-entrepressx">
                            <h1>${globalData[0][index].nombre_vacante} <img src="img/medalla-de-honor.svg" style="max-width: 40px;"></h1>
                            <h2>${globalData[0][index].email}</h2>
                            <p>${globalData[0][index].descripcion_vacante}</p>
                            <p class="price-entrepressx text-left">
                                <a style="font-size: 2rem;">${globalData[0][index].salario}</a>
                            </p>
                        </div>
                    </div>
                </div>`
                )
            }

            for (let index = 0; index < globalData[1].length && index < 4; index++) {
                $('#container-profesionales').append(
                `<div class="col-lg-3 col-md-6 col-sm-12 my-2 ">
                    <div class="card-awesomex">
                        <div class="banner">
                            <img class="svg" src="img/${globalData[1][index].foto}">
                        </div>
                        <div class="menu"> </div>
                        <h2 class="name-awesomex">${globalData[1][index].nombre_profesional}
                            ${globalData[1][index].apellido_profesional}</h2>
                        <div class="title-awesomex">${globalData[1][index].nombre_servicio}</div>
                        <div class="actions-awesomex ">
                            <div class="icon-info-awesomex row" style="text-align: center;">
                                <div class="col-12">
                                    <img src="img/medalla-de-honor.svg" style="max-width: 40px;"></i>
                                </div>
                            </div>
                            <div class="icon-btn-awesomex" data-toggle="modal" data-target="#verProfesional" onclick="new Home().loadModal(${globalData[1][index].id_profesional})"><button>Información</button></div>
                        </div>
                        <div class="description-awesomex text-center">${globalData[1][index].email}</div>
                    </div>
                </div>`
                )
            }
        })
    }

    this.loadModal = (id) => {
        let data = globalData[1].find(element => element.id_profesional === id)
        let nombre = data.nombre_profesional+' '+data.apellido_profesional
        $('#nombre').html(nombre)
        $('#edad').html(data.edad)
        $('#sexo').html(data.sexo)
        $('#direccion').html(data.direccion)
        $('#email').html(data.email)
        $('#telefono').html(data.telefono_profesional)
        $('#experiencia').html(data.experiencia)
    }
}