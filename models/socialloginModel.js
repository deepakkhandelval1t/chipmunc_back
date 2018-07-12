module.exports = (db, cb) => {
    db.define("sociallogin", {
        token: String,
        social_name: String,
        user_id: Number ,
        created_by : Number,
        created_at: Date,
        modified_by: Number,
        modified_at: Date,
        is_deleted: Boolean,
    });
  }