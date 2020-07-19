'use strict'

const pool = require('../models/pool')();

function vacanteServices() {
    this.getVacantes = () => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_traer_todas_Vacantes();', (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
    this.getFiltroVacantes = (filtro) => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_filtrar_Vacantes(?,?,?,?)', filtro , (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
}

module.exports = new vacanteServices();