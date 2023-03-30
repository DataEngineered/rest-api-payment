require('dotenv');
const mysql = require('mysql2');

const dbConfigPool = mysql.createPool(
    {
        host: process.env.DB_HOST_PROD,
        user: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_NAME_PROD
    }
)

module.exports = dbConfigPool;