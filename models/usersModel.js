const pool = require("../config/db");

async function createUser(first_name, last_name, username, hashedPassword) {
  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, username",
      [first_name, last_name, username, hashedPassword]
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}
async function getUserByName(username) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, getUserByName };
