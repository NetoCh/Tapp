'use strict'
require('dotenv').config()
function mysqlConnection(){
    var mysql = require('mysql')
    // var config = require('../config/config')
    // const connection = mysql.createConnection({
    //     // host: process.env.bdHost,
    //     // user: process.env.bdUser,
    //     // password: process.env.bdPassword,
    //     // database: process.env.database

    //  host: config.bdhost,
    //  user: config.bdUser,
    //  password: config.bdPassword,
    //  database: config.database
    // });
    const connection = mysql.createConnection({
        host: process.env.DB_HOST_TAPP,
        user: process.env.DB_USER_TAPP,
        password: process.env.DB_PASSWORD_TAPP,
        database: process.env.DB_DATABASE_TAPP
    });

    return connection;

}


module.exports = mysqlConnection;
