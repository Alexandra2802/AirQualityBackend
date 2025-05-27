const { getImpactHeatmap } = require("../models/impactModel");

const getImpactHeatmapController = async (req, res) => {
  const { pollutant_id } = req.params;
  const { from, to } = req.query;

  try {
    const rows = await getImpactHeatmap({ pollutant_id, from, to });

    const values = rows.map(row => parseFloat(row.impact_index));
    const min = Math.min(...values);
    const max = Math.max(...values);

    const features = rows.map((row) => {
      const impact = parseFloat(row.impact_index);
      // const scaled =  Math.sqrt(impact);
      const normalized = max !== min ? ((impact - min) / (max - min)) * 100 : 0;

      return {
        type: "Feature",
        geometry: JSON.parse(row.geometry),
        properties: {
          county_id: row.county_id,
          name: row.county_name,
          code: row.code,
          population: row.population,
          density: row.density,
          avg_pollution: parseFloat(row.avg_pollution),
          impact_index: impact,
          normalized_index: Math.round(normalized * 100) / 100
        },
      };
    });

    res.json({
      type: "FeatureCollection",
      features,
    });
  } catch (err) {
    console.error("Eroare heatmap impact populație:", err);
    res.status(500).json({ message: "Eroare server la calculul impactului" });
  }
};

module.exports = {getImpactHeatmapController}