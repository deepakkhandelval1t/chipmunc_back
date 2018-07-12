module.exports = (db, cb) => {
    db.define("user_employments", {
        user_id: Number,
        is_current_company: String,
        designation: String,
        company_name: String,
        worked_month_from: Number,
        worked_year_from: Number,
        worked_month_to: Number,
        worked_year_to: Number,
        description: String,
        created_by: Number,
        modified_by: Number,
        modified_at: Date
    });
  }
