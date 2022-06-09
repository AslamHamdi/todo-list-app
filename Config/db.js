require('dotenv').config({path: __dirname + '../../.env'})
const mysql = require('mysql2')

const pool = mysql.createPool({
    multipleStatements: true, 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

module.exports = pool.promise();
