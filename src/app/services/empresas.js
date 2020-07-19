'use strict'
const pool = require('../models/pool')();

function EmpresasServices(){
    var self = this;
    this.GetAreas = async function(){
        let areas = await self.spGetArea()
        let response = {
            success: false,
            message: "No hay areas registradas",
            data: []
        }
        if(areas.success){
            response.success=true;
            response.message="Areas extraidas exitosamente"
            response.data=areas.data
        }
        return response
    }
   this.GetTipoHorarios = async function(){
        let tipoHorarios = await self.spGetTipoHorarios()
        let response = {
            success: false,
            message: "No hay tipos de horarios registradas",
            data: []
        }
        if(tipoHorarios.success){
            response.success=true;
            response.message="Tipos de horarios extraidas exitosamente"
            response.data=tipoHorarios.data
        }
        return response
    }
    this.spRegistrarVacantes = function (data){
        let {nombre, areaLaboral, descripcion, trabajosDesen, requisitos, tipoHorario, salario, ubicacion, idLogin}= data;
        let response = {
            success: false,
            message: "No se pudo registrar la vacante",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_registrar_vacante(?,?,?,?,?,?,?,?,?)",
                [nombre, areaLaboral, descripcion, trabajosDesen, requisitos, tipoHorario, salario, ubicacion, idLogin], (error, rows) => {
                    if (error) {
                        response.message=error;
                        console.log(error)
                        resolve(response);
                    }
                    if(rows[1][0]._message===1){
                       response = {
                            success: true,
                            message: "Vacante registrada exitosamente",
                       } 
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
    this.spGetArea = function () {
        let response = {
            success: false,
            message: "No hay areas registradas",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_traer_areas()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Areas extraidas correctamente",
                            data: rows[1]
                       } 
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
    this.spGetTipoHorarios = function () {
        let response = {
            success: false,
            message: "No hay tipos de horarios registradas",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_traer_tipo_horarios()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Tipos de horario extraidas correctamente",
                            data: rows[1]
                       } 
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
    this.registerEmpresa = async (model) => {
        model.pass = await bcrypt.hash(model.pass, 10);
        let data = Object.values(model);
        let response = {
            success: false,
            message: "El correo ya existe. Intentelo nuevamente"
        }
        try {
            let result = await self.spRegisterProfesional(data);
            if (!result.success) return response;
            response = {
                success: true,
                message: "Se ha registrado correctamente"
            }
            return response;
        } catch (err) {
            console.log(err);
            return response;
        }
    }
    this.spRegisterProfesional = function (data) {
        let response = {
            success: false,
            message: "No se logro insertar este usuario"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_registrar_empresa(?,?,?,?,?,?,?)", data, (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Se ha registrado correctamente"
                        }
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }

    this.spGetVacant = (id)=>  {
        let response = {
            success: false
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_get_my_vacant(?)", [id], (error, rows) => {
                    if (error) {
                        response.error = error;
                        response.message  = 'Error al cargar los datos.'
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            spData : rows[1]
                        }
                    }else{
                        response.message = 'No existen vacantes publicadas.'
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
}

module.exports= new EmpresasServices();