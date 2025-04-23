const express = require('express');
const router = express.Router();
const { getMeasurements, getDailyAvgByPollutant, getPollutionCentroid } = require('../controllers/measurementController');

router.get('/', getMeasurements);
router.get('/stats/daily/:pollutant_id', getDailyAvgByPollutant);
router.get('/stats/centroid/:pollutant_id', getPollutionCentroid);

module.exports = router;
