const mongoose = require("mongoose");

module.exports = class {

  static generateUniqueCode() {
    return new mongoose.Types.ObjectId().toString();
  }

}
