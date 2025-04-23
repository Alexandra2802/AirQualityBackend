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

const getPollutantById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pollutantModel.getPollutantById({id});
    res.json(results);
  } catch (err) {
    console.error('Eroare la /pollutant:', err);
    res.status(500).json({ error: 'Eroare internă la /pollutant' });
  }
};

module.exports = { getPollutants, getPollutantById };
