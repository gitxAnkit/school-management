const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

});

// Test the connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MySQL database");
        connection.release();
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
})();

module.exports = { pool };