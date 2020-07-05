'use strict'
const pool = require('../models/pool')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); //uso ==> uuidv4();
const rolRoutes = {
    0: "/",
    1: "/admin",
    2: "/empresa",
    3: "/profesional"

}
function UserServices() {
    this.signIn = async function (model) {
        let { user, password, ip } = model;
        let response = {
            success: false,
            message: "Usuario o Contraseña Incorrecto. Intentelo Nuevamente",
            token: ""
        }

        // Validaciones de parametros
        if (user === "" || user === undefined) return response;
        if (password === "" || password === undefined) return response;
        // Buscar Contraseña Encriptada del usuario;
        // let userData = await this.getUserDataBD(user);
        let userData = {
            email: "www@www",
            password: bcrypt.hashSync("123", 10),
            rol: 1
        }
        // Comparar las contraseñas
        const match = await bcrypt.compareSync(password, userData.password);
        if (match) {
            let accessToken = {
                user: userData.email,
                userId: userData.id,
                rol: userData.rol,
                ip,
                uuid: uuidv4()
            }
            // Insertar la session si la contraseña es correcta
            // let insertedSession = await this.insertUserSession(accessToken);
            // if (!insertedSession.success) return response;
            response = {
                success: true,
                message: "Ha iniciado sesión correctamente",
                route: rolRoutes[userData.rol],
                token: jwt.sign(accessToken, process.env.ACCESS_TOKEN_KEY)
            }
            return response;
        } else {
            return response;
        }
    }
    this.getUserDataBD = async function (user) {
        let response = {
            success: false,
            message: "No se logro encontrar este usuario",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_usuarioPassword(?)", [user], (error, rows) => {
                    if (error) {
                        response.message = error;
                        resolve(response);
                    }
                    response = {
                        success: true,
                        message: "Data del usuario extraida correctamente",
                        data: rows
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
    this.insertUserSession = async function (accessToken) {
        let response = {
            success: false,
            message: "No se logro insertar la sesión",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_insertUserSession(?,?,?,?,?)", Object.values(accessToken), (error, rows) => {
                    if (error) {
                        response.message = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Sesión insertada correctamente",
                            data: rows
                        }
                    }
                    resolve(response);
                });
            } catch (err) {
                response.message = err;
                resolve(response)
            }
        });
    }
    this.authenticateToken = function (req, res, next){
        const cookie = req.headers.cookie;
        const token1 = cookie.split('token=')[1];
        const token = token1 !== undefined ? token1.split(" ")[0] : null;
        if (token == null || token == undefined) return res.redirect('/');
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) return res.redirect('/');
            res.user = user;
            res.cookie("token", token, { expires: new Date(Date.now() + 60000 * 60), httpOnly: true });
            next()
        });
    }
}
module.exports = new UserServices();


// module.exports={
//         getAll: ()=>{
//             return new Promise((resolve, reject)=>{
//                 pool.query('select * from Login', (error, rows)=>{
//                     if(error) reject(error);
//                     resolve(rows)
//                     console.log(rows[0].email)
//                 })
//             })  
//         },

//         ObtenerUsuario: (email)=>{
//             return new Promise((resolve, reject)=>{
//                 pool.query('select * from Login where email =?', email, (err, rows)=>{
//                     if (err) reject(err);
//                     resolve(rows[0])
//                 });
//             });
//         },
//         RegistrarEmpresa:({email, rol, pass, nombre, ubicacion, descripcion, telefono, web})=>{
//             return new Promise((resolve, reject)=>{
//                 pool.query('insert into Login (email, password, rol) values(?,?,?)', [email, pass, rol], (err, result)=>{
//                     if(err) reject(err);
//                     if (result){
//                         pool.query('insert into Empresas (nombre_empresa, ubicacion_empresa, descripcion_empresa, telefono_empresa, email_empresa,pagina_web, rol) values(?,?,?,?,?,?,?)', [nombre, ubicacion, descripcion,telefono,email,web,rol], (error, results)=>{
//                             if(error) reject(error);
//                             if(results){
//                                 resolve(result)
//                             }
//                         })
//                     }
//                 })
//             })
//         }, 
//         RegistrarProfesional:({email, rol, pass, nombre, apellido, direccion, edad, sexo, telefono, descripcion, experiencia, nivelAcademico, destacado})=>{
//             return new Promise((resolve, reject)=>{
//                 pool.query('insert into Login (email, password, rol) values(?,?,?)', [email, pass, rol], (err, result)=>{
//                     if(err) reject(err);
//                     if (result){
//                         pool.query('insert into Profesionales (nombre_profesional, apellido_profesional, direccion, edad, sexo, telefono_profesional, email_profesional, descripcion_profesional, experiencia, nivel_academico, rol, destacado) values(?,?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellido, direccion, edad, sexo,telefono, email,descripcion,experiencia,nivelAcademico,rol,destacado], (error, results)=>{
//                             if(error) reject(error);
//                             if(results){
//                                 resolve(result)
//                             }
//                         })
//                     }
//                 })
//             })
//         }, 
// }