const { validationResult } = require('express-validator');


const validarCampos = async(req, res, next) => {

    const errors = validationResult(req);

    // Si hay errores entonces mandamos los errores encontrados por el express validator
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Si ya no hay nada por ejecutar pasa al siguiente campo
    next();
}

module.exports = {
    validarCampos
}