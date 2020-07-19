'use strict'

const pool = require('../models/pool')();

function profesionalServices() {
    
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
    this.registerProfesional = (model) => {
        console.log(model);
    }

}

module.exports = new profesionalServices();