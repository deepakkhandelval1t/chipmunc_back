module.exports = (db, cb) => {
    db.define("user_educations", {
        user_id: Number,
        edu_course_type_id: Number,
        edu_course_id: Number,
        edu_specialization_id: Number,
        institute_name: String,
        course_mode: String,
        grade: String,
        passing_year: Number,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
  