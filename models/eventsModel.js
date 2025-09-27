const pool = require("../config/db");

// Create a new event
async function createEvent(
  title,
  description,
  date_time,
  location,
  type,
  user_id
) {
  const result = await pool.query(
    `INSERT INTO events (title, description, date_time, location, type, user_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, date_time, location, type, user_id]
  );
  return result.rows[0];
}

// Update an existing event (only by ID)
async function updateEvent(
  id,
  title,
  description,
  date_time,
  location,
  type,
  user_id
) {
  const result = await pool.query(
    `UPDATE events
     SET title = $1,
         description = $2,
         date_time = $3,
         location = $4,
         type = $5
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [title, description, date_time, location, type, id, user_id]
  );
  return result.rows[0];
}

// Get a single event by ID
async function getEvent(id) {
  const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return result.rows[0];
}

// Delete an event (only by the owner)
async function deleteEvent(id, user_id) {
  const result = await pool.query(
    `DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
}

// Get all events (can add filters later)
async function getEvents() {
  const result = await pool.query(
    `SELECT * FROM events ORDER BY date_time ASC`
  );
  return result.rows;
}

module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  getEvents,
};
