module.exports = (db, cb) => {
    db.define("edu_courses", {
        edu_course_type_id: Number,
        name: String,
        status: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
