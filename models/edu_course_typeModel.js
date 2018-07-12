module.exports = (db, cb) => {
    db.define("edu_course_types", {
        name: String,  
        status: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
