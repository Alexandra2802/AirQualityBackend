const { getAnimatedHeatmap } = require( "../models/animatedHeatmapModel.js");

const getAnimatedHeatmapController = async (req, res) => {
  const { pollutant_id } = req.params;
  const { from, to } = req.query;

  try {
    const rows = await getAnimatedHeatmap({ pollutant_id, from, to });

    // Grupare pe zi
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.day]) grouped[row.day] = [];
      grouped[row.day].push({
        id: row.id,
        name: row.name,
        value: parseFloat(row.value),
        geometry: row.geometry,
      });
    }

    res.json(grouped);
  } catch (err) {
    console.error("Eroare heatmap per zi:", err);
    res.status(500).json({ message: "Eroare la generarea datelor animate" });
  }
};

module.exports = { getAnimatedHeatmapController };
