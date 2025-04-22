const pool = require('../db');

const getPollutants = async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, code, name, unit FROM pollutants`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server la /pollutants' });
  }
};

module.exports = { getPollutants };
