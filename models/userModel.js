module.exports = (db, cb) => {
  db.define("users", {
    role_id: Number,
    email: String,
    password: String,
    verificationtoken : String,
    confirm : Boolean ,
    status: String,
    created_by: Number,
    created_at: Date,
    modified_by: Number,
    modified_at: Date,
    is_deleted: Boolean,
    is_blocked: Boolean
  });
}