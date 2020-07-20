const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const candidateModel = require("../models/candidateModel");

//crear candidato
exports.createCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_exists = await candidateModel.findOne({ username: body.username });
  let email_exists = await candidateModel.findOne({ email: body.email });
  let dni_exists = await candidateModel.findOne({ dni: body.dni });
  if (user_exists) {
    return res.status(400).json({ message: "Usuario ya existe..." });
  }
  if (email_exists) {
    return res.status(400).json({ message: "email ya existe..." });
  }
  if (dni_exists) {
    return res.status(400).json({ message: "dni ya existe..." });
  }

  const candidateData = {
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    dni: body.dni,
    age: body.age,
    profession: body.profession,
    publicationdate: body.publicationdate,
    postulantRef: body.postulantRef,
    token: [],
  };

  const salt = await bcryptjs.genSalt(10);
  candidateData.password = await bcryptjs.hash(body.password, salt);

  const user = new candidateModel(candidateData);

  try {
    await user.save();
    res.send({ message: "Se registro usuario correctamente.." });
    console.log("se registro nuevo usuerio");
  } catch (err) {
    console.log("error al registrar candidate");
    res.status(500).send(err);
  }
};

//loguear candidato
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_in_db = await candidateModel.findOne({ username: body.username });
  if (!user_in_db) {
    return res.status(400).json({ message: "Credenciales no validas." });
  }

  const passCheck = await bcryptjs.compare(body.password, user_in_db.password);
  if (!passCheck) {
    return res.status(400).json({ message: "Credenciales no validas." });
  }

  const jwt_payload = {
    user: {
      id: user_in_db.id,
      username: user_in_db.username,
      role: user_in_db.role,
    },
  };

  try {
    // const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, {
    // expiresIn: process.env.TOKEN_EXP_TIME,
    // });
    const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET);
    user_in_db.token.push(token);
    //user_in_db.token = [token];
    await candidateModel.update({ username: user_in_db.username }, user_in_db);
    res.send({
      message: "Se logueo perfecto",
      token,
      role: user_in_db.role,
      username: user_in_db.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR DE LOGIN.", error });
  }
};

//desloguear candidato
exports.logout = async (req, res) => {
  try {
    await candidateModel.updateOne(
      { _id: res.locals.user.id },
      { $set: { token: [] } }
    );

    res.json({ message: "Se deslogueo perfecto" });
  } catch (error) {
    res.status(500).send({ message: "ERROR DE LOGOUT.", error });
  }
};

//actualizar datos de candidato
exports.updateCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (!res.locals.user.id) {
    return res.status(404).json({ message: "No se encontro candidato..." });
  }

  const { body } = req;

  const user_in_db = await candidateModel
    .find()
    .or({ username: body.username })
    .or({ email: body.email })
    .or({ dni: body.dni });

  const cantidad = user_in_db.length;

  if (cantidad > 1) {
    return res
      .status(400)
      .json({ message: "Nombre de usuario, email, o dni ya existen" });
  }

  try {
    const userNew = {
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      email: body.email,
      dni: body.dni,
      age: body.age,
      profession: body.profession,
    };
    const salt = await bcryptjs.genSalt(10);
    userNew.password = await bcryptjs.hash(body.password, salt);

    const user = await candidateModel.findByIdAndUpdate(
      res.locals.user.id,
      userNew,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    let userNewData = await candidateModel.findOne(
      { _id: res.locals.user.id },
      "-_id -role -token -password"
    );
    res.send({
      message: "Se actualizaron tus datos correctamente...",
      userNewData,
    });
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar ...." });
  }
};

//borrar candidato
exports.deleteCandidate = async (req, res) => {
  try {
    if (!res.locals.user.id) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    const user = await candidateModel.findByIdAndDelete(res.locals.user.id);

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    return res.status(200).send({ message: "Candidato Eliminado ..." });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar candidato ..." });
  }
};

//get candidate
exports.editCandidate = async (req, res) => {
  try {
    if (!res.locals.user.id) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    const user = await candidateModel.findById(
      res.locals.user.id,
      "-postulateRef -role -token -_id -publicationdate"
    );

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
