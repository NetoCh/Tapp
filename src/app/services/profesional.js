'use strict'
const bcrypt = require('bcrypt');
const pool = require('../models/pool')();

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
            console.log(result)
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
                    console.log(rows,error)
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
}

module.exports = new profesionalServices();