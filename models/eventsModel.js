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
// Get a single event by ID with tags
async function getEvent(id) {
  const result = await pool.query(
    `
    SELECT e.*,
           COALESCE(
             JSON_AGG(
               JSON_BUILD_OBJECT('id', t.id, 'name', t.name)
             ) FILTER (WHERE t.id IS NOT NULL),
             '[]'
           ) AS tags
    FROM events e
    LEFT JOIN event_tags et ON e.id = et.event_id
    LEFT JOIN tags t ON et.tag_id = t.id
    WHERE e.id = $1
    GROUP BY e.id
    `,
    [id]
  );

  return result.rows[0];
}

async function getUserEvents(user_id) {
  const result = await pool.query(`SELECT * FROM events WHERE user_id = $1`, [
    user_id,
  ]);
  return result.rows;
}

// Delete an event (only by the owner)
async function deleteEvent(id, user_id) {
  const result = await pool.query(
    `DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
}

// Get all events with tags
async function getEvents() {
  const result = await pool.query(
    `
    SELECT e.*,
           COALESCE(
             JSON_AGG(
               JSON_BUILD_OBJECT('id', t.id, 'name', t.name)
             ) FILTER (WHERE t.id IS NOT NULL),
             '[]'
           ) AS tags
    FROM events e
    LEFT JOIN event_tags et ON e.id = et.event_id
    LEFT JOIN tags t ON et.tag_id = t.id
    GROUP BY e.id
    ORDER BY e.date_time ASC
    `
  );
  return result.rows;
}

// Get past or upcoming events with tags
async function getEventsByDate(type) {
  let comparator, order;

  if (type === "past") {
    comparator = "<";
    order = "DESC";
  } else if (type === "upcoming") {
    comparator = ">=";
    order = "ASC";
  } else {
    throw new Error("Invalid type. Use 'past' or 'upcoming'.");
  }

  const result = await pool.query(
    `
    SELECT e.*,
           COALESCE(
             JSON_AGG(
               JSON_BUILD_OBJECT('id', t.id, 'name', t.name)
             ) FILTER (WHERE t.id IS NOT NULL),
             '[]'
           ) AS tags
    FROM events e
    LEFT JOIN event_tags et ON e.id = et.event_id
    LEFT JOIN tags t ON et.tag_id = t.id
    WHERE e.date_time ${comparator} $1
    GROUP BY e.id
    ORDER BY e.date_time ${order}
    `,
    [new Date()]
  );

  return result.rows;
}

async function getEventsByTags(tagNames) {
  if (!Array.isArray(tagNames) || tagNames.length === 0) return [];

  const placeholders = tagNames.map((_, i) => `$${i + 1}`).join(", ");

  const result = await pool.query(
    `
    SELECT e.*,
           COALESCE(
             JSON_AGG(
               JSON_BUILD_OBJECT('id', t.id, 'name', t.name)
             ) FILTER (WHERE t.id IS NOT NULL),
             '[]'
           ) AS tags
    FROM events e
    JOIN event_tags et ON e.id = et.event_id
    JOIN tags t ON et.tag_id = t.id
    WHERE t.name IN (${placeholders})
    GROUP BY e.id
    ORDER BY e.date_time ASC
    `,
    tagNames
  );

  return result.rows;
}

module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  getEvents,
  getEventsByDate,
  getUserEvents,
  getEventsByTags,
};
