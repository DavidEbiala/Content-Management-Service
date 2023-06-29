const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    dialect: 'mysql',
    database: process.env.DB_NAME,
  });
  
  module.exports = connection;