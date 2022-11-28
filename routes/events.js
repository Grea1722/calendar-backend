const { Router } = require("express");
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt')
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos')

const {obtenerEventos,crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events');
const { isDate } = require("../helpers/isDate");

router.use(validarJWT);

router.get('/', obtenerEventos);

router.post('/create', [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha final es obligatoria').custom( isDate ),
    validarCampos
], crearEvento);

router.put('/:id', [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha final es obligatoria').custom( isDate ),
    validarCampos
], actualizarEvento);

router.delete('/:id', [], eliminarEvento);


module.exports = router;
