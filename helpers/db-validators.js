const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verifica en la BD si el rol especificado existe
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol: rol });
    if (!existeRol) {
        throw new Error('El rol no esta registrado en la BD');
    }
}

// Verificar si el correo existe
const emailExiste = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo: correo });
    if (existeCorreo) {
        throw new Error('El correo ya esta registrado');
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}