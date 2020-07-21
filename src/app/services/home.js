'use strict'

const pool = require('../models/pool')();

function HomeServices() {
    this.getDestacados = () => {
        let model = {
            success : false        }
        try {
            return new Promise((resolve) => {
                pool.query('CALL pa_traer_destacados()', (error, rows) => {
                    if (error){
                        model.message = 'Error al cargar la pagina'
                        model.error = error
                        resolve(model);
                    }
                    model.success = true
                    model.spData = rows
                    resolve(model)
                })
            })
        } catch (error) {
            model.message = 'Error al cargar la pagina'
            model.error = error
            resolve(model);
        }
    }
}

module.exports = new HomeServices();