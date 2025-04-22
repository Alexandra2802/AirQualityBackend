const pool = require('../db');

const getRegions = async () => {
  const result = await pool.query(`
    SELECT id, name, ST_AsGeoJSON(geom) AS geometry FROM regions ORDER BY id
  `);
  return result.rows;
};

module.exports = { getRegions };
