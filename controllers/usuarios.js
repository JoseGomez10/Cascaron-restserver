const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    // Buscador de usuarios con limite
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    
    //const usuarios = await Usuario.find(query)
    //    .skip(Number(desde))
    //    .limit(Number(limite));

    // Saber cuantos usuarios hay en mi BD
    // const total = await Usuario.countDocuments(query);

    // Arreglo de promesas que se procesan simultaneamente
    // En la desestructuracion el primer nombre es para la primer promesa y asi sucesivamente 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.contraseña = bcrypt.hashSync(usuario.contraseña, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto } = req.body;

    // Validar contra BD
    if (resto.contraseña) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.contraseña = bcrypt.hashSync(resto.contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // Fisicamente lo borramos de la BD
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);

    /* Muestra el usuario eliminado y el usuario autenticado
    const usuarioAuntenticado = req.usuario;
    res.json({usuario, usuarioAuntenticado});
    */
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}