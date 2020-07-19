'use strict'

const pool = require('../models/pool')();

function HomeServices() {
    this.getDestacados = () => {
        return new Promise((resolve) => {
            pool.query('CALL pa_traer_destacados()', (error, rows) => {
                if (error) resolve(error);
                resolve(rows)
            })
        })
    }
}

module.exports = new HomeServices();