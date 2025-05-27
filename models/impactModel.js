const sql = require("../db.js");

const getImpactHeatmap = async ({ pollutant_id, from, to }) => {
  const result = await sql`
  SELECT 
    c.id AS county_id,
    c.name AS county_name,
    c.code,
    c.population,
    (c.population / (ST_Area(c.geom::geography) / 1000000)) AS density,
    AVG(m.value) AS avg_pollution,
    AVG(m.value) * c.population * (c.population / (ST_Area(c.geom::geography) / 1000000)) AS impact_index,
    ST_AsGeoJSON(c.geom) AS geometry
  FROM counties c
  JOIN regions r ON ST_Contains(c.geom, ST_Centroid(r.geom))
  JOIN measurements m ON m.region_id = r.id
  WHERE m.pollutant_id = ${pollutant_id}
    AND m.timestamp BETWEEN ${from} AND ${to}
  GROUP BY c.id, c.name, c.code, c.population, c.geom
  ORDER BY impact_index DESC;
`;

  return result;
};

module.exports = { getImpactHeatmap };
