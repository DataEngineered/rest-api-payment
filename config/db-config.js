require('dotenv');
const mysql = require('mysql2');

// dotenv.config({path: "../.env"});

const dbConfigPool = mysql.createPool(
    {
        host: process.env.DB_HOST_PROD,
        user: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_NAME_PROD,
        // host: "103.184.19.13",
        // user: "itkiosnetdev",
        // password: "garuda@2022!",
        // database: "payment"
    }
)

module.exports = dbConfigPool;