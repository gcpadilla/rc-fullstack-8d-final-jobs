const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const offerController = require('../controllers/offerController');

//CREAR OFERTA
router.post('/', [
  body('title', 'Debe incluir un titulo').notEmpty(),
  body('summary', 'Debe incluir un resumen').notEmpty(),
  body('description', 'Debe incluir una descripción').notEmpty(),
  body('profession', 'Debe incluir una profesión').notEmpty(),
  body('workplace', 'Ddebe incluir lugar de trabajo').notEmpty(),
  body('quota', 'Debe agregar un cupo').notEmpty(),
  ], offerController.createOffer);

module.exports = router;
