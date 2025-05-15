const sql = require("../db.js");

const getAnimatedHeatmap = async ({ pollutant_id, from, to }) => {
  const result = await sql`
    SELECT 
      DATE(m.timestamp) AS day,
      r.id,
      r.name,
      MAX(m.value) AS value,
      ST_AsGeoJSON(r.geom) AS geometry
    FROM measurements m
    JOIN regions r ON r.id = m.region_id
    WHERE m.pollutant_id = ${pollutant_id}
      AND m.timestamp BETWEEN ${from} AND ${to}
    GROUP BY day, r.id, r.name, r.geom
    ORDER BY day, r.id;
  `;
  return result;
};

module.exports = { getAnimatedHeatmap }
