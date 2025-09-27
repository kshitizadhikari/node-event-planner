const pool = require("../config/db");

async function up() {
  await pool.query(`
    ALTER TABLE events
    ALTER COLUMN user_id SET NOT NULL;
  `);
  console.log("✅ Migration applied: user_id is now required in events table");
}

async function down() {
  await pool.query(`
    ALTER TABLE events
    ALTER COLUMN user_id DROP NOT NULL;
  `);
  console.log("↩️ Migration rolled back: user_id is now nullable");
}

// Run migration if called directly
if (require.main === module) {
  up()
    .catch((err) => console.error(err))
    .finally(() => pool.end());
}

module.exports = { up, down };
