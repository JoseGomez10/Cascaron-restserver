const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res=response) => {

    const {correo, contraseña} = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validContraseña = bcrypt.compareSync(contraseña, usuario.contraseña);
        if (!validContraseña) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - contraseña'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
}

module.exports = {
    login
}