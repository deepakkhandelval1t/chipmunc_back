module.exports = (db, cb) => {
    db.define("user_languages", {
        user_id: Number,
        name: String,
        proficency_level: String,
        can_read: String,
        can_write: String,
        can_speak: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
