const { response } = require("express");
//* lo de arriba es para tener el intellisense
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);
    //^Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //*Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mesg: "Por favor comuniquese con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario y/o contraseña incorrectos",
      });
    }

    //confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mesg: "Por favor comuniquese con el administrador",
    });
  }

  res.json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const revalidarToken = async (req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  const token =  await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
