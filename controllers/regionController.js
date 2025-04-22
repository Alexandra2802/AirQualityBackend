const regionModel = require('../models/regionModel');

const getRegions = async (req, res) => {
  try {
    const results = await regionModel.getRegions();
    res.json(results);
  } catch (err) {
    console.error('Eroare la /regions:', err);
    res.status(500).json({ error: 'Eroare internă la /regions' });
  }
};

module.exports = { getRegions };
