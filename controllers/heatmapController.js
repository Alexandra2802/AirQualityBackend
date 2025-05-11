const { getHeatmapData } = require("../models/heatmapModel.js");

const getHeatmap = async (req, res) => {
  const { pollutant_id } = req.params;
  const { from, to } = req.query;

  try {
    const data = await getHeatmapData({ pollutant_id, from, to });
    res.json(data);
  } catch (error) {
    console.error("Eroare la getHeatmap:", error);
    res.status(500).json({ message: "Eroare internă la generarea heatmap-ului" });
  }
};

module.exports = {getHeatmap};
