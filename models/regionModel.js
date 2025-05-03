const sql = require('../db');

const getRegions = async () => {
  const result = await sql`
    SELECT id, name, ST_AsGeoJSON(geom) AS geometry FROM regions ORDER BY id
  `;
  return result;
};

module.exports = { getRegions };

