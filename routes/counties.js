const express = require("express");
const { getCountyFromRegion } = require("../controllers/countyController");

const router = express.Router();

router.get("/region/:id/county", getCountyFromRegion);

module.exports = router;
