module.exports = (db, cb) => {
    db.define("user_logins", {
        user_id: Number,
        ip_address: String,
        is_login: String,
        origin: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
