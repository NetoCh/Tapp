'use strict'
const user=require('../services/user');
const { render } = require('ejs');
const bcrypt = require('bcrypt')
module.exports={
    TraerLogin: async(req, res)=>{
        const users = await user.getAll();
        res.json(users);
    },

    RegistrarEmpresa: async(req, res)=>{
        try{
            req.body.pass = bcrypt.hashSync(req.body.pass, 12)
            console.log(req.body.pass)
            req.body.rol=1;
            console.log(req.body)
            const users = await user.RegistrarEmpresa(req.body)
            res.json(users)
            console.log(res.json(users))
        }
        catch(err){
            console.log(err)
        }
        
    },
    RegistrarProfesional: async(req,res)=>{

    }
}