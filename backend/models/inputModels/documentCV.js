const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let DocumentCVSchema = new Schema({
    document_name: { type: String },
    document_code: { type: String },
    document_link: { type: String },
    status: { type: Number },
    user_id: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});

// Export the model
module.exports = mongoose.model('documentCV', DocumentCVSchema, "documentCV");