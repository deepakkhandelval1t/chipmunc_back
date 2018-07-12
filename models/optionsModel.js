module.exports = (db, cb) => {
    db.define("options", {
        id: Number,
        option_no1: String,
        option_no2: String,
        option_no3: String,
        option_no4: String,
        ques_id: Number
    });
}