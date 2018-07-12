module.exports = (db, cb) => {
    db.define("edu_specializations", {
        edu_course_id:Number,
        name: String,
        status: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
