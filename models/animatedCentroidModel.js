const sql = require("../db.js");

const getCentroidsOverTime = async ({ pollutant_id, from, to }) => {
  const result = await sql`
    SELECT DISTINCT ON (day)
      DATE(m.timestamp) AS day,
      r.id,
      r.name,
      MAX(m.value) OVER (PARTITION BY DATE(m.timestamp)) AS max_value,
      ST_AsGeoJSON(ST_Centroid(r.geom)) AS centroid
    FROM measurements m
    JOIN regions r ON r.id = m.region_id
    WHERE m.pollutant_id = ${pollutant_id}
      AND m.timestamp BETWEEN ${from} AND ${to}
    ORDER BY day, m.value DESC;
  `;
  return result;
};

module.exports = { getCentroidsOverTime };
