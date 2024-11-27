const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });


// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true, // Wait for connections when the pool is full
    connectionLimit: 10,      // Maximum number of connections
    queueLimit: 0,            // Unlimited requests in the queue
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
module.exports = pool;