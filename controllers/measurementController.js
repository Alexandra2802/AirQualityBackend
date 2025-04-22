const measurementModel = require('../models/measurementModel');

const getMeasurements = async (req, res) => {
  try {
    const filters = {
      region_id: req.query.region_id,
      pollutant_id: req.query.pollutant_id,
      from: req.query.from,
      to: req.query.to
    };

    const results = await measurementModel.getMeasurements(filters);
    res.json(results);
  } catch (err) {
    console.error('Eroare în controller:', err);
    res.status(500).json({ error: 'Eroare internă server' });
  }
};

module.exports = { getMeasurements };
