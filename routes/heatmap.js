const express = require('express');
const { getHeatmap } = require("../controllers/heatmapController.js");

const router = express.Router();
router.get("/:pollutant_id", getHeatmap);

module.exports = router;
