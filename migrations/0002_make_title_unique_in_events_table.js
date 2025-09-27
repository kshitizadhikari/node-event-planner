require("dotenv").config();
const pool = require("../config/db");

async function up() {
  try {
    await pool.query(`
      ALTER TABLE events
      ADD CONSTRAINT unique_event_title UNIQUE (title);
    `);
    console.log("✅ Migration applied: events.title is now unique");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await pool.end();
  }
}

async function down() {
  try {
    await pool.query(`
      ALTER TABLE events
      DROP CONSTRAINT IF EXISTS unique_event_title;
    `);
    console.log("↩️ Migration rolled back: events.title uniqueness removed");
  } catch (err) {
    console.error("❌ Rollback failed:", err.message);
  } finally {
    await pool.end();
  }
}

// Run migration if executed directly
if (require.main === module) {
  up()
    .catch((err) => console.error(err))
    .finally(() => pool.end());
}

module.exports = { up, down };
