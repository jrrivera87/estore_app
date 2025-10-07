require('dotenv').config();
const mysql = require('mysql2');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const pool = mysql.createPool({
    host: 'localhost',
    user: dbUser,
    password: dbPassword,
    database: 'estore',
    port: 3306,
    multipleStatements: true
});

module.exports = pool;