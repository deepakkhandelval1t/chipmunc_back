module.exports = (db, cb) => {
    db.define("ques_answer", {
          questions: String,
          id: Number,
          answers: String,
          type_ques: String
    });
  }