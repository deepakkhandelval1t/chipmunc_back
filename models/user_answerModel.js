module.exports = (db, cb) => {
    db.define("user_answer", {
          user_id: Number,
          user_answercol: String,
          id: Number,
          ques_id: Number
    });
  }