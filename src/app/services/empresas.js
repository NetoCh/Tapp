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
}

module.exports= new EmpresasServices();