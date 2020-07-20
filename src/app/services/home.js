'use strict'

const { response } = require('express');

const pool = require('../models/pool')();

function HomeServices() {
    try {
        this.getDestacados = () => {
            return new Promise((resolve) => {
                pool.query('CALL pa_traer_destacados()', (error, rows) => {
                    if (error) resolve(error);
                    resolve(rows)
                })
            })
        }
    } catch (ex) {
        resolve(ex)
    }

}

module.exports = new HomeServices();