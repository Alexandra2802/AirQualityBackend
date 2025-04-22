const express = require('express');
const router = express.Router();
const { getPollutants } = require('../controllers/pollutantController');

router.get('/', getPollutants);

module.exports = router;
