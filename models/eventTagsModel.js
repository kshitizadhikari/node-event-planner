const pool = require("../config/db");

// Assign tag to an event
async function assignTagsToEvent(event_id, tag_ids) {
  const values = tag_ids.map((tag_id, i) => `($1, $${i + 2})`).join(", ");
  const result = await pool.query(
    `INSERT INTO event_tags (event_id, tag_id)
    VALUES ${values}
    ON CONFLICT DO NOTHING
    RETURNING *`,
    [event_id, ...tag_ids]
  );
  return result.rows;
}

// Remove tags from an event
async function removeTagsFromAnEvent(event_id, tag_ids) {
  if (!tag_ids || tag_ids.length === 0) return [];

  // Create placeholders for parameterized query
  const placeholders = tag_ids.map((_, i) => `$${i + 2}`).join(", ");

  const result = await pool.query(
    `
    DELETE FROM event_tags
    WHERE event_id = $1 AND tag_id IN (${placeholders})
    RETURNING *
    `,
    [event_id, ...tag_ids]
  );

  return result.rows; // returns deleted rows
}

module.exports = {
  assignTagsToEvent,
  removeTagsFromAnEvent,
};
