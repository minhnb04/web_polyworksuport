const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let CompanySchema = new Schema({
    company_code: { type: String },
    company_name: { type: String },
    description: { type: String },
    logo: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});

// Export the model
module.exports = mongoose.model('company', CompanySchema, "company");