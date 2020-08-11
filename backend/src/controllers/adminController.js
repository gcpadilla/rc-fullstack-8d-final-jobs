const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../models/administratorModel');


//primer inicio, administrador 0
exports.thereIsAnAdmin = async (req, res) => {
  
  let isAdmin = await adminModel.countDocuments()
  if (isAdmin > 0 ) {
    return res.status(200).json({ message: 'Existe'});
  }
  
  const adminData = {
    username: 'Administrador0',
    password: 'Administrador0',
    token: []
  };

  const salt = await bcryptjs.genSalt(10);
  adminData.password = await bcryptjs.hash(adminData.password, salt);

  const user = new adminModel(adminData);

  try {
    await user.save();
    res.send({ 
      title: 'Bienvenido',
html: `<h3>Es el primer inicio de la aplicación. Para comenzar, ingresa los siguientes datos: </h3>
<p>Username: Administrador0</p>
<p>password: Administrador0</p>
<h3>¡Muchas Gracias!</h3>`, });
  } catch (error) {
    return res.status(500).json({ message: "ERROR DE INICIO.", error });
  }
}

//crear usuario admin
exports.createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_exists = await adminModel.findOne({ username: body.username });
  if (user_exists) {
    return res.status(400).json({ message: 'Usuario ya existe...'});
  }

  const adminData = {
    username: body.username,
    token: []
  };

  const salt = await bcryptjs.genSalt(10);
  adminData.password = await bcryptjs.hash(body.password, salt);

  const user = new adminModel(adminData);

  try {
    await user.save();
    res.send({ message: 'Se registró usuario correctamente..' });
  } catch (err) {
    res.status(500).send(err);
  }

}

//actualizar datos de admin
exports.updateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (!res.locals.user.id) {
    return res.status(404).json({ message: "No se encontro administrador..." });
  }

  const { body } = req;

  const user_in_db = await adminModel
    .find({ username: body.username })

  const cantidad = user_in_db.length;

  if (cantidad > 1) {
    return res
      .status(400)
      .json({ message: "Ya existe un administrador con ese nombre . . ." });
  }

  try {
    const userNew = {
      username: body.username,
    };
    const salt = await bcryptjs.genSalt(10);
    userNew.password = await bcryptjs.hash(body.password, salt);

    const user = await adminModel.findByIdAndUpdate(
      res.locals.user.id,
      userNew,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    let userNewData = await adminModel.findOne(
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

//loguear usuario admin
exports.login = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { body } = req;
  
  let user_in_db = await adminModel.findOne({ username: body.username });
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
      username: user_in_db.username,
      role: user_in_db.role
    }
  };
  
  try {
    const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXP_TIME });
    //const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET);
    //user_in_db.token.push(token)
    user_in_db.token = [ token ];
    await adminModel.update({ username: user_in_db.username }, user_in_db);
    res.send({ message: 'Se logueo perfecto', token, role: user_in_db.role, username: user_in_db.username});
  } catch (error) {
    return res.status(500).json({ message: "Se ha producido un error al Iniciar Sesión", error });
  }
}

//desloguear usuario admin
exports.logout = async (req, res) => {

  try {

    await adminModel.updateOne({ _id: res.locals.user.id }, { $set: { token: [] } });

    res.json({ message: 'Se ha cerrado sesión.' });

  } catch (error) {
    res.status(500).send({ message: 'Se ha producido un error al cerrar sesión.', error });
  }

}
