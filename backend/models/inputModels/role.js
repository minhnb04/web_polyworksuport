const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let RoleSchema = new Schema({
    role_code: { type: String },
    role_name: { type: String },
});

// Export the model
module.exports = mongoose.model('role', RoleSchema, "role");