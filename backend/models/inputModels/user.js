const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let UserSchema = new Schema({
    user_name: { type: String, max: 10 },
    password: { type: String, max: 50 },
    full_name: { type: String, max: 50 },
    email: { type: String, max: 50 },
    dob: { type: Date },
    address: { type: String },
    gender: { type: Number },
    admin: { type: Boolean },
    active: { type: Boolean },
    role_code: { type: String },
    phone: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
    image: { type: String },
    isVIP: { type: Boolean },
    company_code: { type: String },
});

// Export the model
module.exports = mongoose.model('user', UserSchema, "user");