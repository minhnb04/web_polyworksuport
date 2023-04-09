const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let UserJobSchema = new Schema({
    user_id: { type: String },
    cv_id: { type: String },
    job_id: { type: String },
    status: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});

// Export the model
module.exports = mongoose.model('userJob', UserJobSchema, "userJob");