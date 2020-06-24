'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const config=require('./src/app/config/config')
const app = express()
const path = require ('path');
const appRouter = require('./src/app/routes/routes')
const cors=require('cors');
const ejs = require('ejs');

app.use(express.static("public"), express.static(path.join(__dirname,"src/public/")));
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/views/'));
//app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

require('./src/app/models/pool');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/tapp', appRouter)

/* para sacar ip 
var ip = require("ip");
console.dir ( ip.address() );*/




app.listen(config.port,config.hostname,() => {
  console.log(`Server running at http://${config.hostname}:${config.port}/tapp`);
});