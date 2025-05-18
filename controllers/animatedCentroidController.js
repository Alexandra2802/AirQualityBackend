const { getCentroidsOverTime } = require("../models/animatedCentroidModel");

const getAnimatedCentroidController = async (req, res) => {
  const { pollutant_id } = req.params;
  const { from, to } = req.query;

  try {
    const data = await getCentroidsOverTime({ pollutant_id, from, to });
    res.json(data);
  } catch (err) {
    console.error("Eroare centroid animat:", err);
    res.status(500).json({ message: "Eroare la generarea animației" });
  }
};

module.exports = { getAnimatedCentroidController };
