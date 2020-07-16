//const { reset } = require("nodemon");

function RegistrarVacantes (){
    this.init = function(){
        $(document).ready(()=>{
            $("#btnRegistrar").prop("disabled", true);
            $.get("/api/empresa/getAreas", {}, function (response) {
                if(response.success){
                    SELECT.fill(response.data,"areaLaboral", {text: "nombre", value: "id_area"}); 
                    Swal.fire({
                        title: 'Todos los campos deben ser llenados para el envío de este formulario.',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
                else{
                    let timerInterval
                    Swal.fire({
                    title: 'Se ha producido un error',
                    html: 'Redireccionando en <b></b> milisegundos.',
                    timer: 2000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                            b.textContent = Swal.getTimerLeft()
                            }
                        }
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                        window.location.href = "/empresa";
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                    });
                }
            });
            

            //Verificar que salario sea numero positivo
             //Verificar que se llenen los datos del formulario
             $("#salario").keyup(function() {
                var salario = document.getElementById("salario").value;
                console.log(salario.length)
                try {
                    salario = parseFloat(salario)
                    if(salario <=0 || isNaN(salario)==true){
                        $("#btnRegistrar").prop("disabled", true);
                        Swal.fire({
                            title: 'El salario debe ser un número mayor a cero.',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                    }
                } catch (error) {
                    console.log("catch")
                    Swal.fire({
                        title: 'El salario debe ser un número mayor a cero.',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
            });


            //Verificar que se llenen los datos del formulario
            $("#formVacante input").keyup(function() {
                var form = $(this).parents("#formVacante");
                var check = CheckInputs(form);
                var check1 = CheckTextArea(form);
                if(check==true && check1==true) {
                    $("#btnRegistrar").prop("disabled", false);
                }
                else {
                    $("#btnRegistrar").prop("disabled", true);
                }
            });

            //Verificar que se llenen los datos del formulario
            $("#formVacante textarea").keyup(function() {
                var form = $(this).parents("#formVacante");
                var check = CheckInputs(form);
                var check1 = CheckTextArea(form);
                if(check==true && check1==true) {
                    $("#btnRegistrar").prop("disabled", false);
                }
                else {
                    $("#btnRegistrar").prop("disabled", true);
                }
            });

            //Verica si cada input del formulario esta lleno
            function CheckInputs(obj) {
                var camposRellenados = true;
                obj.find("input").each(function() {
                var $this = $(this);
                    if( $this.val().length <= 0 ) {
                        camposRellenados = false;
                        return false;
                    }
                });
                if(camposRellenados == false) {
                    return false;
                }
                else {
                    return true;
                }
            }

            //Verica si cada text area del formulario esta lleno
            function CheckTextArea(obj) {
                var camposRellenados = true;
                obj.find("textarea").each(function() {
                var $this = $(this);
                    if( $this.val().length <= 0 ) {
                        camposRellenados = false;
                        return false;
                    }
                });
                if(camposRellenados == false) {
                    return false;
                }
                else {
                    return true;
                }
            }

            $("#btnRegistrar").click(function (e){
                e.preventDefault();
                let datos = {
                    nombre: $("#nomVacante").val(),
                    areaLaboral: $("#areaLaboral").val(), //select
                    descripcion: $("#descripcion").val(),
                    trabajosDesen: $("#trabajosDes").val(),
                    requisitos: $("#requisitos").val(),
                    tipoHorario: $("#tipoHorario").val(), //select
                    salario: $("#salario").val(),
                    ubicacion: $("#ubicacion").val(),
                }
                $.post("/api/empresa/registrarVacantes", datos, function (response) {
                    //mensajito si es bueno, y si es malo tambien
                    let icon = response.success? 'success' : 'error'
                    Swal.fire({
                        position: 'center',
                        icon: icon,
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    if(response.success){
                        $("#btnRegistrar").prop("disabled", true);
                        $("form").trigger("reset");
                    }
                });
            });
        });
    }
}
