const express = require("express");
const { getImpactHeatmapController } = require("../controllers/impactController");

const router = express.Router();

router.get("/impact-heatmap/:pollutant_id", getImpactHeatmapController);

module.exports = router;
