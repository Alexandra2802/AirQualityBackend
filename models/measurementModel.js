const sql = require('../db');

const getMeasurements = async (filters) => {
  const { region_id, pollutant_id, from, to } = filters;

  const conditions = [];

  if (region_id) {
    conditions.push(sql`region_id = ${region_id}`);
  }

  if (pollutant_id) {
    conditions.push(sql`pollutant_id = ${pollutant_id}`);
  }

  if (from && to) {
    conditions.push(sql`timestamp BETWEEN ${from} AND ${to}`);
  } else if (from) {
    conditions.push(sql`timestamp >= ${from}`);
  } else if (to) {
    conditions.push(sql`timestamp <= ${to}`);
  }

  let query = sql`SELECT * FROM measurements`;

  if (conditions.length > 0) {
    const whereClause = conditions.reduce((acc, curr, index) => {
      return index === 0 ? sql`${curr}` : sql`${acc} AND ${curr}`;
    }, sql``);
    query = sql`${query} WHERE ${whereClause}`;
  }

  query = sql`${query} ORDER BY timestamp DESC LIMIT 100`;

  const result = await query;
  return result; // rezultatul este deja un array
};

const getDailyAvgByPollutant = async ({ region_id, pollutant_id, from, to }) => {
  let query = sql`
    SELECT DATE(timestamp) as day, ROUND(AVG(value)::numeric, 6) as avg
    FROM measurements
    WHERE pollutant_id = ${pollutant_id}
      AND timestamp BETWEEN ${from} AND ${to}
  `;

  if (region_id) {
    query = sql`${query} AND region_id = ${region_id}`;
  }

  query = sql`${query} GROUP BY day ORDER BY day`;

  const result = await query;
  return result;
};

const getPollutionCentroid = async ({ pollutant_id, from, to }) => {
  const result = await sql`
    SELECT 
      r.id,
      r.name,
      MAX(m.value) AS max_value,
      ST_AsGeoJSON(ST_Centroid(r.geom)) AS centroid
    FROM measurements m
    JOIN regions r ON m.region_id = r.id
    WHERE m.pollutant_id = ${pollutant_id}
      AND m.timestamp BETWEEN ${from} AND ${to}
    GROUP BY r.id, r.name, r.geom
    ORDER BY max_value DESC
    LIMIT 1
  `;

  return result[0]; // întotdeauna 1 singur rezultat
};

module.exports = {
  getMeasurements,
  getDailyAvgByPollutant,
  getPollutionCentroid
};
