'use strict'
const pool = require('../models/pool')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userIp = require('ip');
const jwtDecode = require('jwt-decode');
const { v4: uuidv4 } = require('uuid'); //uso ==> uuidv4();
const rolRoutes = {
    0: "/",
    1: "/admin",
    2: "/profesional",
    3: "/empresa",
}
function UserServices() {
    var self = this;
    this.signIn = async function (model) {
        let { user, password } = model;
        let response = {
            success: false,
            message: "Usuario o Contraseña Incorrecto. Intentelo Nuevamente",
            token: ""
        }

        // Validaciones de parametros
        if (user === "" || user === undefined) return response;
        if (password === "" || password === undefined) return response;
        // Buscar Contraseña Encriptada del usuario;
        let spResponse = await self.spGetUserDataBD(user);
        // Comparar las contraseñas
        if (!spResponse.success) return response;
        let userData = spResponse.data;
        const match = await bcrypt.compareSync(password, userData.password);
        if (match) {
            let accessToken = {
                user: userData.email,
                idLogin: userData.id_login,
                rol: userData.rol,
                uuid: uuidv4()
            }
            // Insertar la session si la contraseña es correcta
            let insertedSession = await self.spInsertUserSession(accessToken);
            if (!insertedSession.success) return response;
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
    this.signOut = async function (req) {
        // Elimino la sesión de la BD
        let user = self.decryptToken(req);
        return await self.spDeleteUserSession(user);
    }
    this.callSql = function (sql, parameteres) { // select * from tabla where id = ?;
        let response = {
            success: false,
            message: "No se logro encontrar este usuario",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query(sql, parameteres, (error, rows) => {
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
                resolve(response);
            }
        });
    }
    this.spGetUserDataBD = function (user) {
        let response = {
            success: false,
            message: "No se logro encontrar este usuario",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_data_usuario(?)", [user], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                       response = {
                            success: true,
                            message: "Data del usuario extraida correctamente",
                            data: rows[1][0]
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
    this.spInsertUserSession = function (accessToken) {
        let { uuid, idLogin } = accessToken;
        let ip = userIp.address();
        let response = {
            success: false,
            message: "No se logro insertar la sesión",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_insertar_sesion(?,?,?)", [uuid,ip,idLogin], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Sesión insertada correctamente"
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
    this.spDeleteUserSession = function (accessToken) {
        let { uuid, idLogin } = accessToken;
        let response = {
            success: false,
            message: "No se logro eliminar la sesión",
            data: []
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_eliminar_sesion(?,?)", [uuid,idLogin], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Sesión eliminada correctamente"
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
    this.authenticateToken = function (req, res, next) {
        const token = req.cookies.token;
        if (token == null || token == undefined) return res.redirect('/');
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
            if (err) {
                res.cookie("token", token, { expires: new Date(Date.now()), httpOnly: true });
                return res.redirect('/');
            } 
            res.user = user;
            user.ip = userIp.address() || "";
            let response = await self.validateSession(user);
            if (!response.success) {
                res.cookie("token", token, { expires: new Date(Date.now()), httpOnly: true });
                return res.redirect('/');
            } 
            res.cookie("token", token, { expires: new Date(Date.now() + 60000 * 60), httpOnly: true });
            next()
        });
    }
    this.authenticateToken1 = function(req, res, next) {
        const authHeader = req.headers['authorization']
        console.log(req.headers);
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
    this.validateSession = function (accessToken) {
        // Valida si la sesión todavia es valida, de ser asi, le extiende el tiempo
        let { uuid, ip, idLogin } = accessToken;
        let response = {
            success: false,
            message: "Sesión no válida"
        }
        return new Promise((resolve) => {
            try {
                pool.query("CALL pa_validar_sesion(?,?,?)", [uuid, ip, idLogin], (error, rows) => {
                    if (error) {
                        response.error = error;
                        resolve(response);
                    }
                    if (rows[0][0]._message === 1) {
                        response = {
                            success: true,
                            message: "Sesión válida"
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
    this.decryptToken = function (req) {
        let token = req.cookies.token;
        try {
            if (token) return jwtDecode(req.cookies.token);
        } catch (err) {
            console.log(err);
        }
        return "";
    }
    this.getHeaderMenu = function (req) {
        let user = self.decryptToken(req);
        if (user !== "" && user !== undefined) {
            const headerMenu = {
                1: {
                    image: "/img/avatar-6.jpg",
                    title: user.user,
                    subTitle: "Admin",
                    list: [
                        {
                            type: "divider"
                        },
                        {
                            type: "list-item",
                            text: "Cerrar Sessión",
                            target: "/logout"
                        }
                    ]
                },
                3: {
                    image: "/img/avatar-6.jpg",
                    title: user.user,
                    subTitle: "Empresa",
                    list: [
                        {
                            type: "divider"
                        },
                        {
                            type: "list-item",
                            text: "Mi Cuenta",
                            target: "/registroEmpresa"
                        },
                        {
                            type: "list-item",
                            text: "Vacantes Publicadas",
                            target: "/empresa/empresaVacante"
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "list-item",
                            text: "Cerrar Sessión",
                            target: "/logout"
                        }
                    ]
                },
                2: {
                    image: "/img/avatar-6.jpg",
                    title: user.user,
                    subTitle: "Profesional",
                    list: [
                        {
                            type: "divider"
                        },
                        {
                            type: "list-item",
                            text: "Mi Cuenta",
                            target: "/registroProfesional"
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "list-item",
                            text: "Cerrar Sessión",
                            target: "/logout"
                        }
                    ]
                },
            }
            return headerMenu[user.rol];
        } else {
            return {
                image: "/img/avatar-6.jpg",
                title: "Guest",
                subTitle: "Sin Iniciar Sesión",
                list: [
                    {
                        type: "divider",
                    },
                    {
                        type: "list-item",
                        text: "Login",
                        target: "/login"
                    }
                ]
            };
        }
    }
    this.validatePageAccess = function (rol) {
        return function (req, res, next) {
            let user = self.decryptToken(req);
            if (rol !== user.rol) res.redirect('/login');
            else next();
        }
    }
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
            pool.query('CALL pa_filtrar_Profesionales(?, ?, ?, ?, ?);', [filtro[0], filtro[1], filtro[2], filtro[3], filtro[4]], (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
    this.getVacantes = () => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_traer_todas_Vacantes();', (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
    this.getFiltroVacantes = (filtro) => {
        return new Promise((resolve, reject) => {
            pool.query('CALL pa_filtrar_Vacantes(?,?,?,?)', [filtro[0], filtro[1], filtro[2], filtro[3]], (error, rows) => {
                if (error) reject(error);
                resolve(rows)
            })
        })
    }
}
module.exports = new UserServices();
