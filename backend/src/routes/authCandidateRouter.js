const express = require('express');
const router = express.Router(); 

const candidateController = require('../controllers/authCandidateController')

router.get('/', candidateController.getCandidate)

module.exports = router;