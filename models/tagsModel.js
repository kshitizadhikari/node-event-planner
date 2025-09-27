const pool = require("../config/db");

async function createTag(name) {
  const result = await pool.query(
    `INSERT INTO tags (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return result.rows[0];
}

async function getTags() {
  const result = await pool.query(`SELECT * from tags`);
  return result.rows;
}

async function deleteTag(id) {
  const result = await pool.query(
    `DELETE FROM tags WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createTag,
  getTags,
  deleteTag,
};
