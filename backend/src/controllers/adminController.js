const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../models/administratorModel');

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
    res.send({ message: 'Se registro usuario correctamente..' });
  } catch (err) {
    res.status(500).send(err);
  }

}

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
    //const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXP_TIME });
    const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET);
    user_in_db.token = [ token ];
    await adminModel.update({ username: user_in_db.username }, user_in_db);
    res.send({ message: 'Se logueo perfecto', token, role: user_in_db.role, username: user_in_db.username});
  } catch (error) {
    return res.status(500).json({ message: 'ERROR.', error });
  }
}

//desloguear usuario admin
exports.logout = async (req, res) => {

  try {

    await adminModel.updateOne({ _id: res.locals.user.id }, { $set: { token: [] } });

    res.json({ message: 'Se deslogueo perfecto' });

  } catch (error) {
    res.status(500).send({ message: 'ERROR.', error });
  }

}
