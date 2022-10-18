const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true    //Que sea un correo unico
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']    //Validar contra alguna numeracion
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Remover la contraseña y el __v para que no sean visualizados en la res del JSON al crear el usuario
UsuarioSchema.methods.toJSON = function() {
    const {__v, contraseña, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
