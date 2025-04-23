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

const getDailyAvgByPollutant = async (req, res) => {
  const pollutant_id = req.params.pollutant_id;
  const { region_id, from, to } = req.query;

  if (!pollutant_id) {
    return res.status(400).json({ error: 'pollutant_id este obligatoriu.' });
  }

  if (!from || !to) {
    return res.status(400).json({ error: 'Parametrii "from" și "to" sunt obligatorii.' });
  }

  try {
    const stats = await measurementModel.getDailyAvgByPollutant({
      region_id,
      pollutant_id,
      from,
      to
    });
    res.json(stats);
  } catch (err) {
    console.error('Eroare la /stats/daily:', err);
    res.status(500).json({ error: 'Eroare server la statistici zilnice.' });
  }
};

const getPollutionCentroid = async (req, res) => {
  const pollutant_id =  req.params.pollutant_id;
  const { from, to } = req.query;

  if (!pollutant_id || !from || !to) {
    return res.status(400).json({ error: 'pollutant_id, from și to sunt obligatorii.' });
  }

  try {
    const result = await measurementModel.getPollutionCentroid({ pollutant_id, from, to });
    res.json(result);
  } catch (err) {
    console.error('Eroare la /stats/centroid:', err);
    res.status(500).json({ error: 'Eroare la calculul centrului poluării maxime.' });
  }
};

module.exports = { 
  getMeasurements, 
  getDailyAvgByPollutant, 
  getPollutionCentroid 
};
