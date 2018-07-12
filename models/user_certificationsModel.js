module.exports = (db, cb) => {
    db.define("user_certifications", {
        user_id: Number,
        name: String,
        completed_month: Number,
        completed_year: Number,
        description: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
