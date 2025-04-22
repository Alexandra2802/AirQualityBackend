const pollutantModel = require('../models/pollutantModel');

const getPollutants = async (req, res) => {
  try {
    const results = await pollutantModel.getPollutants();
    res.json(results);
  } catch (err) {
    console.error('Eroare la /pollutants:', err);
    res.status(500).json({ error: 'Eroare internă la /pollutants' });
  }
};

module.exports = { getPollutants };
