const pool = require('../db');

const getRegions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, ST_AsGeoJSON(geom) as geometry FROM regions
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server la /regions' });
  }
};

module.exports = { getRegions };
