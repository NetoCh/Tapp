'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const path = require ('path');
const appRouter = require('./src/app/routes/routes')
const apiRouter = require('./src/app/webapi/registrar-api')
const cors = require('cors');

app.use(express.static("public"), express.static(path.join(__dirname,"src/public/")));
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/views/'));
//app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


app.use('/', appRouter)
app.use('/api', apiRouter)


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado en el puerto: '+app.get('port'));
});
