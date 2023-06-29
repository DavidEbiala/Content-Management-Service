const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'departments'
  });
  
  module.exports = connection;