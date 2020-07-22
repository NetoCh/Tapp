'use strict'
const pool = require('../models/pool')();
const fs = require('fs');
const bcrypt = require('bcrypt');
function EmpresasServices() {
    var self = this;
    this.GetAreas = async function () {
        let areas = await self.spGetArea()
        let response = {
            success: false,
            message: "No hay areas registradas",
            data: []
        }
        if (areas.success) {
            response.success = true;
            response.message = "Areas extraidas exitosamente"
            response.data = areas.data
        }
        return response
    }
    this.GetTipoHorarios = async function () {
        let tipoHorarios = await self.spGetTipoHorarios()
        let response = {
            success: false,
            message: "No hay tipos de horarios registradas",
            data: []
        }
        if (tipoHorarios.success) {
            response.success = true;
            response.message = "Tipos de horarios extraidas exitosamente"
            response.data = tipoHorarios.data
        }
        return response
    }
    this.spRegistrarVacantes = function (data) {
        let { nombre, areaLaboral, descripcion, trabajosDesen, requisitos, tipoHorario, salario, ubicacion, idLogin } = data;
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
                            response.message = error;
                            console.log(error)
                            resolve(response);
                        }
                        if (rows[1][0]._message === 1) {
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
    this.spGetVacant = (id) => {
        let response = {
            success: false
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_get_my_vacant(?)", [id], (error, rows) => {
                    if (error) {
                        response.error = error;
                        response.message = 'Error al cargar los datos.'
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            spData: rows[1]
                        }
                    } else {
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

    this.spUpdateVacante = (model) => {
        let response = {
            success: false,
            icon: 'warning'
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_actualizar_vacante(?,?,?,?,?,?,?,?,?)", Object.values(model), (error, rows) => {
                    if (error) {
                        response.error = error;
                        response.message = 'No se pudieron actualizar los datos.'
                        resolve(response)
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            icon: 'success',
                            message: 'Vacante actualizada correctamente'
                        }
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                response.icon = 'error'
                response.message = 'No se pudieron actualizar los datos.'
                resolve(response)
            }
        });
    }



    this.update = async function (model) {
        let data = Object.values(model);
        let response = {
            success: false,
            message: "No se logro actualizar el perfil"
        }
        try {
            let update = await self.spUpdateEmpresa(data);
            if (!update.success) return response;
            response = {
                success: true,
                message: "Perfil actualizado correctamente"
            }
            return response;
        } catch (err) {
            console.log(err);
            return response;
        }
    }
    
    this.spUpdateEmpresa = function (data) {
        let response = {
            success: false,
            message: "No se logro actualizar el avatar"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_actualizar_empresa(?,?,?,?,?,?,?,?)", data, (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Avatar actualizado correctamente"
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
    this.updateAvatar = async function (idLogin, image) {
        let { filename, destination } = image;
        let avatarStatus = await self.spUpdateAvatar(idLogin, filename);
        if (avatarStatus.success) {
            if (avatarStatus.data) {
                let oldImage = destination + "/" + avatarStatus.data.foto;
                if (fs.existsSync(oldImage) && avatarStatus.data.foto !== "defaultAvatar.png") {
                    fs.unlink(oldImage, (err) => {
                        if (err) throw err;
                        console.log(`deleted image: ${oldImage}`);
                    });
                }
            }
        }
        return avatarStatus;
    }
    this.spUpdateAvatar = function (idLogin, filename) {
        let response = {
            success: false,
            message: "No se logro actualizar el avatar"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_actualizar_avatar_Empresa(?,?)", [idLogin, filename], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Avatar actualizado correctamente",
                            data: rows[1][0]
                        }
                    }
                    resolve(response);
                });
            } catch (err) {
                response.icon = "error"
                response.message = err;
                resolve(response)
            }
        });
    }

    this.spDestacarVacnte = function (idVacante) {
        let response = {
            success: false
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_destacar_vacante(?)", [idVacante], (error, rows) => {
                    if (error) {
                        response.icon = 'error'
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            data: rows[0][0]
                        }
                    }
                    resolve(response);
                });
            } catch (err) {
                response.icon = "error"
                response.message = err;
                resolve(response)
            }
        });
    }

    this.spDeleteVacante = (idVacante) => {
        let response = {
            success: false,
            message: 'Error al eliminar la vacante',
            icon: "error"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_eliminar_vacante(?)", [idVacante], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            icon: 'success',
                            message : 'Vacante eliminada con exito.'
                        }
                        resolve(response);
                    }
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
}

module.exports = new EmpresasServices();