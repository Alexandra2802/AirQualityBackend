const pool = require('../db');

const getPollutants = async () => {
  const result = await pool.query(`
    SELECT id, code, name, unit FROM pollutants ORDER BY id
  `);
  return result.rows;
};

const getPollutantById = async ({id}) => {
  const result = await pool.query(`
    SELECT id, code, name, unit FROM pollutants WHERE id = $1 ORDER BY id
  `,[id]);
  
  return result.rows[0];
};

module.exports = { getPollutants, getPollutantById };