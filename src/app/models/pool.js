'use strict'
require('dotenv').config()
function mysqlConnection(){
    var mysql = require('mysql')
    var config = require('../config/config')
    const connection = mysql.createConnection({
        host: process.env.bdHost,
        user: process.env.bdUser,
        password: process.env.bdPassword,
        database: process.env.database

        // host: config.bdhost,
        // user: config.bdUser,
        // password: config.bdPassword,
        // database: config.database
    });
    return connection;
}


module.exports = mysqlConnection;
