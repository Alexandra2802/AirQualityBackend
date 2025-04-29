const sql = require('../db');

const getPollutants = async () => {
  const result = await sql`
    SELECT id, code, name, unit FROM pollutants ORDER BY id
  `;
  return result;
};

const getPollutantById = async ({ id }) => {
  const result = await sql`
    SELECT id, code, name, unit FROM pollutants WHERE id = ${id} ORDER BY id
  `;
  return result[0]; 
};

module.exports = { getPollutants, getPollutantById };
