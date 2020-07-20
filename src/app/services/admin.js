'use strict'

const e = require('express');

const pool = require('../models/pool')();

function AdminService(){
    var self = this;
    this.GetDatos = async function(){
        let cantMF = await self.spGetCantMF()
        let response = {
            success: false,
            message: "Error al extraer datos",
            data: []
        }
        if(cantMF.success){
            //response.data=cantMF.data
            let cantEmpresaMes = await self.spGetCantEmpresasMes()
            if(cantEmpresaMes.success){   
                let cantEmpProf = await self.spGetCantEmpresasProfesionales()
                if(cantEmpProf.success){   
                    let cantVacantMes = await self.spGetCantVacantesMes()
                    if(cantVacantMes.success){   
                        let cantVacantesMes = await self.spGetCantProfesionalesMes()
                        if(cantVacantesMes.success){   
                            let cantVacantesTipo = await self.spGetCantVacantesTipo()
                            if(cantVacantesTipo.success){   
                                response.success=true,
                                response.message="Datos extraidos",             
                                response.data=[cantMF.data,cantEmpresaMes.data,cantEmpProf.data,cantVacantMes.data,cantVacantesMes.data,cantVacantesTipo.data]
                            }
                        }
                    }
                }
            }
        }
        return response
    }

    /*  Llamada al procedimiento para obtener la cantidad de hombres y mujeres*/
    this.spGetCantMF = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_traer_cant_hombre_mujer()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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

    /*  Llamada al procedimiento para obtener la cantidad de empresas registrados por mes*/
    this.spGetCantEmpresasMes = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_empresas_mes()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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
      /*  Llamada al procedimiento para obtener la cantidad de empresas registrados por mes*/
      this.spGetCantProfesionalesMes = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_profesionales_mes()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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

    /*  Llamada al procedimiento para obtener la cantidad de empresas y profesionales*/
    this.spGetCantEmpresasProfesionales = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_traer_cant_empresa_profesional()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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

     /*  Llamada al procedimiento para obtener la cantidad de vacantes registradas por mes*/
     this.spGetCantVacantesMes = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_vacantes_mes()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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
    /*  Llamada al procedimiento para obtener la cantidad de vacantes registradas por mes*/
    this.spGetCantVacantesTipo = function () {
        let response = { 
            success: false,
            message: "No hay datos registrados",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_traer_cant_vacantes_tipo_horario()", (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Datos extraidos correctamente",
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
module.exports= new AdminService();