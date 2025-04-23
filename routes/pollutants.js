const express = require('express');
const router = express.Router();
const { getPollutants, getPollutantById } = require('../controllers/pollutantController');

router.get('/', getPollutants);
router.get('/:id', getPollutantById);

module.exports = router;
