function VerProfesionales () {
    this.init = () => {
        $(document).on("click", ".message", function () {
            document.getElementById("#nombre").innerHTML = objProfesionales[$(this).data('id')].nombre_profesional + " " + objProfesionales[$(this).data('id')].apellido_profesional;
            document.getElementById("#edad").innerHTML = objProfesionales[$(this).data('id')].edad;
            document.getElementById("#sexo").innerHTML = objProfesionales[$(this).data('id')].sexo;
            document.getElementById("#direccion").innerHTML = objProfesionales[$(this).data('id')].direccion;
            document.getElementById("#email").innerHTML = objProfesionales[$(this).data('id')].email;
            document.getElementById("#telefono").innerHTML = objProfesionales[$(this).data('id')].telefono_profesional;
            document.getElementById("#nivel").innerHTML = objProfesionales[$(this).data('id')].nivel_academico;
            document.getElementById("#experiencia").innerHTML = objProfesionales[$(this).data('id')].experiencia;   
          });
    }
}