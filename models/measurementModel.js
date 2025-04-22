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

module.exports = { getMeasurements };
