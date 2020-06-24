'use strict'

const { promiseImpl } = require('ejs');

const pool=require('../models/pool')();
module.exports={
        getAll: ()=>{
            return new Promise((resolve, reject)=>{
                pool.query('select * from Login', (error, rows)=>{
                    if(error) reject(error);
                    resolve(rows)
                    console.log(rows[0].email)
                })
            })  
        },

        ObtenerUsuario: (email)=>{
            return new Promise((resolve, reject)=>{
                pool.query('select * from Login where email =?', email, (err, rows)=>{
                    if (err) reject(err);
                    resolve(rows[0])
                });
            });
        },
        RegistrarEmpresa:({email, rol, pass, nombre, ubicacion, descripcion, telefono, web})=>{
            return new Promise((resolve, reject)=>{
                pool.query('insert into Login (email, password, rol) values(?,?,?)', [email, pass, rol], (err, result)=>{
                    if(err) reject(err);
                    if (result){
                        pool.query('insert into Empresas (nombre_empresa, ubicacion_empresa, descripcion_empresa, telefono_empresa, email_empresa,pagina_web, rol) values(?,?,?,?,?,?,?)', [nombre, ubicacion, descripcion,telefono,email,web,rol], (error, results)=>{
                            if(error) reject(error);
                            if(results){
                                resolve(result)
                            }
                        })
                    }
                })
            })
        }, 
        RegistrarProfesional:({email, rol, pass, nombre, apellido, direccion, edad, sexo, telefono, descripcion, experiencia, nivelAcademico, destacado})=>{
            return new Promise((resolve, reject)=>{
                pool.query('insert into Login (email, password, rol) values(?,?,?)', [email, pass, rol], (err, result)=>{
                    if(err) reject(err);
                    if (result){
                        pool.query('insert into Profesionales (nombre_profesional, apellido_profesional, direccion, edad, sexo, telefono_profesional, email_profesional, descripcion_profesional, experiencia, nivel_academico, rol, destacado) values(?,?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellido, direccion, edad, sexo,telefono, email,descripcion,experiencia,nivelAcademico,rol,destacado], (error, results)=>{
                            if(error) reject(error);
                            if(results){
                                resolve(result)
                            }
                        })
                    }
                })
            })
        }, 
}