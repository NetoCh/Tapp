function VerVacante() {
    this.init = () => {
        $(document).on("click", ".message", function () {
            document.getElementById("#nombre").innerHTML = objVacantes[$(this).data('id')].nombre_vacante;
            document.getElementById("#descripcion").innerHTML = objVacantes[$(this).data('id')].descripcion_vacante;
            document.getElementById("#area").innerHTML = objVacantes[$(this).data('id')].nombre_area;
            document.getElementById("#requisito").innerHTML = objVacantes[$(this).data('id')].requisitos;
            document.getElementById("#trabajos").innerHTML = objVacantes[$(this).data('id')].trabajos_desempeñar;
            document.getElementById("#salario").innerHTML = "$" + objVacantes[$(this).data('id')].salario;
            document.getElementById("#ubicacion").innerHTML = objVacantes[$(this).data('id')].ubicacion;
            document.getElementById("#horario").innerHTML = objVacantes[$(this).data('id')].tipo_horario;
            document.getElementById("#fecha").innerHTML = objVacantes[$(this).data('id')].fecha;
            document.getElementById("#empresa").innerHTML = objVacantes[$(this).data('id')].nombre_empresa;
            document.getElementById("#descripcionempr").innerHTML = objVacantes[$(this).data('id')].descripcion_empresa;
            document.getElementById("#telefono").innerHTML = objVacantes[$(this).data('id')].telefono_empresa;
            document.getElementById("#sitio").innerHTML = objVacantes[$(this).data('id')].pagina_web;
            document.getElementById("#email").innerHTML = objVacantes[$(this).data('id')].email;
        });
    }
}


