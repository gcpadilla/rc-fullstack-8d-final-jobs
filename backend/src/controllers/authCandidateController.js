const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const candidateModel = require('../models/candidateModel');

//crear usuario
exports.createCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_exists = await candidateModel.findOne({ username: body.username });
  let email_exists = await candidateModel.findOne({ email: body.email });
  let dni_exists = await candidateModel.findOne({ dni: body.dni });
  if (user_exists ) {
    return res.status(400).json({ message: 'Usuario ya existe...'});
  }
  if (email_exists) {
    return res.status(400).json({ message: 'email ya existe...'});
  }
  if (dni_exists) {
    return res.status(400).json({ message: 'dni ya existe...'});
  }

  const userData = {
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    dni:body.dni,
    age:body.age,
    __idpostulation:000,
    token: []
  };

  const salt = await bcryptjs.genSalt(10);
  userData.password = await bcryptjs.hash(body.password, salt);

  const user = new candidateModel(userData);

  try {
    await user.save();
    res.send({ message: 'Se registro usuario correctamente..' });
    console.log("se registro nuevo usuerio")
  } catch (err) {
    console.log("error al registrar candidate")
    res.status(500).send(err);
  }
}

//loguear usuario
exports.login = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { body } = req;
  
  let user_in_db = await candidateModel.findOne({ username: body.username });
  if (!user_in_db) {
    return res.status(400).json({ message: 'Credenciales no validas.'});
  }
  
  const passCheck = await bcryptjs.compare(body.password, user_in_db.password);
  if (!passCheck) {
    return res.status(400).json({ message: 'Credenciales no validas.'});
  }

  const jwt_payload = {
    user: {
      id: user_in_db.id,
      username: user_in_db.username
    }
  };
  
  try {
    const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXP_TIME });
    user_in_db.token = [ token ];
    await candidateModel.update({ username: user_in_db.username }, user_in_db);
    res.send({ message: 'Se logueo perfecto', token });
  } catch (error) {
    return res.status(500).json({ message: 'ERROR DE LOGIN.', error });
  }
}

//desloguear usuario
exports.logout = async (req, res) => {

  try {

    await candidateModel.updateOne({ _id: res.locals.user.id }, { $set: { token: [] } });

    res.json({ message: 'Se deslogueo perfecto' });

  } catch (error) {
    res.status(500).send({ message: 'ERROR DE LOGOUT.', error });
  }
}