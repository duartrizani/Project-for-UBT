
import mysql from 'mysql2/promise';

const sup = mysql.createPool({
  host: process.env.DATA_HOST_SUPER,
  user: process.env.DATA_USER_SUPER,
  password: process.env.DATA_PASSWORD_SUPER,
  database: process.env.DATA_DATABASE_SUPER,
  waitForConnections: true, // Wait for available connection
  connectionLimit: 10, // Limit on concurrent connections
  queueLimit: 0 // No limit on queued requests
});

(async () => {
  try {
    const connection = await sup.getConnection();
    console.log("Connected to MySQL using sup");
    // Use the connection object for your database operations
    await connection.query("SELECT 1"); // Example query
    await connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err.code);
  }

})();

export default sup;