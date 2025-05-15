const express = require("express");
const { getAnimatedHeatmapController } = require("../controllers/animatedHeatmapController");

const router = express.Router();

router.get("/:pollutant_id", getAnimatedHeatmapController);

module.exports = router;
