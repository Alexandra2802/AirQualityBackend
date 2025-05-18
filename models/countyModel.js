const sql = require("../db.js");

const getCountyByRegionId = async (regionId) => {
  const result = await sql`
    SELECT c.name, c.code
    FROM counties c
    JOIN regions r ON ST_Contains(c.geom, ST_Centroid(r.geom))
    WHERE r.id = ${regionId}
    LIMIT 1;
  `;
  return result[0]; 
};

module.exports = { getCountyByRegionId };
