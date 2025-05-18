const express = require("express");
const { getAnimatedCentroidController } = require("../controllers/animatedCentroidController");

const router = express.Router();

router.get("/animated-centroid/:pollutant_id", getAnimatedCentroidController);

module.exports = router;