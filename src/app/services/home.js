'use strict'

const pool = require('../models/pool')();

function HomeServices() {

    this.getDestacados = () => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_traer_destacados()', (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
}

module.exports = new HomeServices();