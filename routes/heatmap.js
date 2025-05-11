const express = require('express');
const { getHeatmap } = require("../controllers/heatmapController.js");

const router = express.Router();
router.get("/heatmap/:pollutant_id", getHeatmap);

module.exports = router;
