/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require("../controllers/auth");


router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    //middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  loginUsuario
);

router.get("/renew",validarJWT, revalidarToken);

module.exports = router;
