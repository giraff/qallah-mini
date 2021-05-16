/**database.js */
const mysql = require('mysql');
import config from './config/index';

const { 
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DATABASE
} = config;

// createPool: mysql(mariadb) DB와 커넥션을 시켜줄 부품(pool)을 만든다.
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  connectionLimit: 4,
});

module.exports = pool;
