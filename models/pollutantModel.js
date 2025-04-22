const pool = require('../db');

const getPollutants = async () => {
  const result = await pool.query(`
    SELECT id, code, name, unit FROM pollutants ORDER BY id
  `);
  return result.rows;
};

module.exports = { getPollutants };
