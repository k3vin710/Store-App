const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  multipleStatements: true,
});

module.exports = pool.promise();
