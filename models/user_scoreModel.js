module.exports = (db, cb) => {
    db.define("score", {
        id: Number,
        marks_scored: String,
        max_marks: String
    });
  }