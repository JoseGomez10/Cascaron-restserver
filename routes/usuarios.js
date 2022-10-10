const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

// El tercer campo que se envio es un middleware para la validacion del correo
router.post('/',[
    // Con el not().isEmpty() le decimos que no debe de estar vacio
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    // Le decimos que la contraseña debe de ser al menos de 6 caracteres
    check('contraseña', 'La contraseña debe de ser de mas de 6 letras').isLength({min: 6}),

    // Le especificamos que sea un correo valido
    check('correo', 'El correo no es valido').isEmail(),

    // Verifica que el correo no exista
    check('correo').custom(emailExiste),

    // Le indicamos que debe de entrar en unos de esos dos roles especificados
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    // Valida el rol desde la BD
    check('rol').custom(esRolValido),

    // Valida si hay algun error anteriormente sino continua
    validarCampos
], usuariosPost);

router.put('/:id', [
    // Verifica si el ID es valido, tiene que se un ID valido de Mongo
    check('id', 'No es un ID valido').isMongoId(),

    // Verifica si existe un usuario con el ID
    check('id').custom(existeUsuarioPorId),

    // Verifica si el rol insertado por el usuario es valido
    check('rol').custom(esRolValido),

    // Valida si hay algun error anteriormente sino continua
    validarCampos
], usuariosPut);

router.delete('/:id', [
    // Verifica si el ID es valido, tiene que se un ID valido de Mongo
    check('id', 'No es un ID valido').isMongoId(),

    // Verifica si existe un usuario con el ID
    check('id').custom(existeUsuarioPorId),

    // Valida si hay algun error anteriormente sino continua
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;