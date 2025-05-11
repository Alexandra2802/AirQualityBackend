const sql = require('../db');

//valoarea maxima a poluantului per regiune
const getHeatmapData = async ({ pollutant_id, from, to }) => {
  const result = await sql`
    SELECT 
      r.id,
      r.name,
      MAX(m.value) AS value,
      ST_AsGeoJSON(r.geom) AS geometry
    FROM measurements m
    JOIN regions r ON m.region_id = r.id
    WHERE m.pollutant_id = ${pollutant_id}
      AND m.timestamp BETWEEN ${from} AND ${to}
    GROUP BY r.id, r.name, r.geom
  `;

  return result;
};

module.exports = { getHeatmapData };
