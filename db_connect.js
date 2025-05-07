require("dotenv").config();
const pg = require("pg");
const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: process.env.PASSWORD_DB,
  host: "localhost",
  port: 5432,
  database: "test_cd_comps_singles_insert",
});

module.exports = pool;
