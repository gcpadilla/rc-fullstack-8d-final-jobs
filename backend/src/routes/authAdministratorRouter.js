const express = require('express');
const router = express.Router(); 

const administratorController = require('../controllers/authAdministratorController')

router.get('/', administratorController.getAdministrator)

module.exports = router;