const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let JobSchema = new Schema({
    job_code: { type: String },
    job_name: { type: String },
    description: { type: String },
    slot: { type: String },
    status: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    image: { type: String },
    salary_min: { type: Number },
    salary_max: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
    candidate: { type: String },
    technology: { type: String },
    //hình thức làm việc ("Full-time", "Part-time", "Remote", "Other")
    work_form : { type: String },
    work_place: { type: String },
    gender : { type: Number },
    experience: { type: String } ,
    benefits: { type: String },
    requirement: { type: String },
    company_code: { type: String },
});

// Export the model
module.exports = mongoose.model('job', JobSchema, "job");