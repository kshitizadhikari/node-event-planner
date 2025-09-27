require("dotenv").config();
const pool = require("./db");

async function init() {
  try {
    // Enable uuid-ossp extension for UUID generation
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Database initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  } finally {
    pool.end(); // close connection
  }
}

init();
