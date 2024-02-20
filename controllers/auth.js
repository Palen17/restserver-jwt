const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require ('bcryptjs')
const {generarJwt} = require("../helpers/generar-jwt");
const login = async (req, res = response) =>{


    const {correo, password} = req.body

    try{

        //Verificar si el email existe

        const usuario = await Usuario.findOne({correo})

        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        //Si el usuario esta activo

        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no existe - estado: false'
            })
        }

        //Verificar contraseña


        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }


        //Generar el JWT

        const token = await generarJwt(usuario.id)

        res.json({
            usuario,
            token
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }


}

module.exports = {
    login
}