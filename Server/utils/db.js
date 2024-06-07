
import mysql from 'mysql2/promise';

const con = mysql.createPool({
  host: process.env.DATA_HOST,
  user: process.env.DATA_USER,
  password: process.env.DATA_PASSWORD,
  database: process.env.DATA_DATABASE,
  waitForConnections: true, // Wait for available connection
  connectionLimit: 10, // Limit on concurrent connections
  queueLimit: 0 // No limit on queued requests
});

(async () => {
  try {
    const connection = await con.getConnection();
    console.log("Connected to MySQL using con");
    // Use the connection object for your database operations
    await connection.query("SELECT 1"); // Example query
    await connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err.code);
  }
})();

export default con;