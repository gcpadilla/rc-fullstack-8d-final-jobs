const express = require('express');
const router = express.Router(); 

const postulateController = require('../controllers/postulateController')

router.get('/', postulateController.getPostulate)

module.exports = router;