const mongoose = require("mongoose");

const { ERRORS: { PASSWORD, USERNAME } } = require("@src/constants");

const adminSchema = new mongoose.Schema({
  createdOn: {
    default: () => new Date(),
    type: Date
  },
  password: {
    maxlength: 512,
    minlength: 1,
    required: PASSWORD.MISSING,
    type: String
  },
  username: {
    maxlength: 64,
    minlength: 1,
    required: USERNAME.MISSING,
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);
