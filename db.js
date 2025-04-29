// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// module.exports = pool;

require('dotenv').config();
const postgres = require('postgres'); 

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

module.exports = sql;
