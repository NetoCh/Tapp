const pool = require('../models/pool')();
const bcrypt = require('bcrypt');
function Empresa() {
    var self = this;
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
}

module.exports = new Empresa();