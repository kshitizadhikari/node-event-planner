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
module.exports = {
  assignTagsToEvent,
};
