require('dotenv').config();
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL + '?sslmode=require');


module.exports = sql;
