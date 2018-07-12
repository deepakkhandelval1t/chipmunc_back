module.exports = (db, cb) => {
    db.define("questions", {
        id: Number,
        question: String,
        levels: String,
        type_ques: String
    });
    
  }