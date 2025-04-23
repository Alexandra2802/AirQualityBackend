const pool = require('../db');

const getMeasurements = async (filters) => {
  const { region_id, pollutant_id, from, to } = filters;

  let conditions = [];
  let values = [];

  if (region_id) {
    conditions.push(`region_id = $${values.length + 1}`);
    values.push(region_id);
  }

  if (pollutant_id) {
    conditions.push(`pollutant_id = $${values.length + 1}`);
    values.push(pollutant_id);
  }

  if (from && to) {
    conditions.push(`timestamp BETWEEN $${values.length + 1} AND $${values.length + 2}`);
    values.push(from);
    values.push(to);
  } else if (from) {
    conditions.push(`timestamp >= $${values.length + 1}`);
    values.push(from);
  } else if (to) {
    conditions.push(`timestamp <= $${values.length + 1}`);
    values.push(to);
  }

  let query = `SELECT * FROM measurements`;
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY timestamp DESC LIMIT 100';

  const result = await pool.query(query, values);
  return result.rows;
};

const getDailyAvgByPollutant = async ({ region_id, pollutant_id, from, to }) => {
  const result = await pool.query(`
    SELECT DATE(timestamp) as day, ROUND(AVG(value)::numeric, 6) as avg
    FROM measurements
    WHERE pollutant_id = $1
      AND timestamp BETWEEN $2 AND $3
      ${region_id ? 'AND region_id = $4' : ''}
    GROUP BY day
    ORDER BY day
  `, region_id
    ? [pollutant_id, from, to, region_id]
    : [pollutant_id, from, to]
  );

  return result.rows;
};

/**
 * Get the point in space with the highest value for a certain pollutant in a certain time period
 */
const getPollutionCentroid = async ({ pollutant_id, from, to }) => {
  const result = await pool.query(`
    SELECT 
      r.id,
      r.name,
      MAX(m.value) AS max_value,
      ST_AsGeoJSON(ST_Centroid(r.geom)) AS centroid
    FROM measurements m
    JOIN regions r ON m.region_id = r.id
    WHERE m.pollutant_id = $1
      AND m.timestamp BETWEEN $2 AND $3
    GROUP BY r.id, r.name, r.geom
    ORDER BY max_value DESC
    LIMIT 1;
  `, [pollutant_id, from, to]);

  return result.rows[0];
};

module.exports = {
  getMeasurements,
  getDailyAvgByPollutant,
  getPollutionCentroid
};

