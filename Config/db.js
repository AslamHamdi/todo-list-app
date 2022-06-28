require('dotenv').config({path: __dirname + '../../.env'})
const mysql = require('mysql2')

// Developmnet DB Config
// const pool = mysql.createPool({
//     multipleStatements: true, 
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
// })


// Production DB config
const pool = mysql.createPool({
    multipleStatements: true, 
    host: process.env.DB_HOST_PROD,
    user: process.env.DB_USER_PROD,
    database: process.env.DB_NAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
})

module.exports = pool.promise();
