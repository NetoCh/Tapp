'use strict'
const pool = require('../models/pool')();
const bcrypt = require('bcrypt');
const fs = require('fs');
const { response } = require('express');

function profesionalServices() {
    var self = this;
    this.getProfesionales = () => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_traer_todos_Profesionales();', (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
    this.getFiltroProfesionales = (filtro) => {
        return new Promise((resolve, reject) => {
            if (filtro[3] == "") filtro[3] = 18;
            if (filtro[4] == "") filtro[4] = 0;
            pool.query('CALL pa_filtrar_Profesionales(?, ?, ?, ?, ?);', filtro, (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
    this.registerProfesional = async (model) => {
        let { nombreEmp,
            apellidopro,
            direccionpro,
            edadpro,
            sexopro,
            telefonopro,
            mailpro,
            password,
            descppro,
            experienciapro } = model;
        model.password = await bcrypt.hash(model.password, 10);
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
                pool.query("CALL pa_registrar_profesional(?,?,?,?,?,?,?,?,?,?,?)", data, (error, rows) => {
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
    this.update = async function (model) {
        let data = Object.values(model);
        let response = {
            success: false,
            message: "No se logro actualizar el perfil"
        }
        try {
            let update = await self.spUpdateProfesional(data);
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
    this.spUpdateProfesional = function (data) {
        let response = {
            success: false,
            message: "No se logro actualizar el avatar"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_actualizar_profesional(?,?,?,?,?,?,?,?,?,?,?,?)", data, (error, rows) => {
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
        let avatarStatus = await self.spUpdateAvatar(idLogin,filename);
        if (avatarStatus.success) {
            if (avatarStatus.data) { 
                let oldImage = destination + "/" + avatarStatus.data.foto;
                if (fs.existsSync(oldImage)) {
                    fs.unlink(oldImage, (err) => {
                        if (err) throw err;
                        console.log(`deleted image: ${oldImage}`);
                    });
                }
            }
        }
        return response;
    }
    this.spUpdateAvatar = function (idLogin, filename) {
        let response = {
            success: false,
            message: "No se logro actualizar el avatar"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_actualizar_avatar_profesional(?,?)", [idLogin, filename], (error, rows) => {
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
                response.message = err;
                resolve(response)
            }
        });
    }
}

module.exports = new profesionalServices();