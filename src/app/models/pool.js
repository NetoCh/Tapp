'use strict'
require('dotenv').config()
function mysqlConnection(){
    var mysql = require('mysql')
    const connection = mysql.createConnection({
        host: process.env.DB_HOST_TAPP,
        user: process.env.DB_USER_TAPP,
        password: process.env.DB_PASSWORD_TAPP,
        database: process.env.DB_DATABASE_TAPP
    });
    return connection;
}

module.exports = mysqlConnection;
