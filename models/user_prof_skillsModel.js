module.exports = (db, cb) => {
    db.define("user_prof_skills", {
        user_id: Number,
        prof_skill_id: Number,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
