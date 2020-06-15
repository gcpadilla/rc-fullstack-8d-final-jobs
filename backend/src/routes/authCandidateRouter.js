const express = require('express');
const { body } = require('express-validator');
const authorize = require('../middlewares/authorizeCandidate');
const router = express.Router();

const candidateController = require('../controllers/authCandidateController');

//CREAR USUARIO
router.post('/', [
  body('firstname', 'El nombre no puede ser nulo').notEmpty(),
  body('lastname', 'El apellido no puede ser nulo').notEmpty(),
  body('username', 'El usuario no puede ser nulo').notEmpty(),
  body('email', 'El email no puede ser nulo').notEmpty(),
  body('email', 'Debe ser un email valido').isEmail(),
  body('password', 'Password no puede ser nulo').notEmpty(),
  body('password', 'debe contener al menos un núnero').matches(/\d/),
  body('password', 'debe incluir de 8 a 32 caracteres').isLength({ min: 8, max: 32 }),
  body('age', 'La edad no puede ser nula').notEmpty(),
  ], candidateController.createCandidate);

//LOGUEAR USUARIO
router.post('/login', [
  body('username', 'El usuario no puede ser nulo').notEmpty(),
  body('password', 'Password no puede ser nulo').notEmpty()
  ], candidateController.login);

//DESCONECTAR USUARIO
router.get('/logout', authorize, candidateController.logout);

module.exports = router;
