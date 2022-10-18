const {Router} = require('express');
const { check } = require('express-validator');

const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post('/login', [
    // Le especificamos que el correo debe ser obligatorio
    check('correo', 'El correo es obligatorio').isEmail(),

    // Indicamos que es necesario una contraseña
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),

    validarCampos
],login);

module.exports = router;