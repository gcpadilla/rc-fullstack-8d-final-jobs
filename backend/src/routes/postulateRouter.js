const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const postulateController = require('../controllers/postulateController');

//CREAR POSTULACION
router.post('/', [
  body('intendedsalary', 'Incluir salario pretendido').notEmpty(),
  body('experiences', 'Debe ingresar experiencia').notEmpty(),
  body('studies', 'Debe incluir estudios').notEmpty(),
  body('emailcandidate', 'El email no puede ser nulo').notEmpty(),
  body('emailcandidate', 'Debe ser un email valido').isEmail(),
  ], postulateController.createPostulate);

module.exports = router;
