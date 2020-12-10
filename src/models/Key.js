const mongoose = require("mongoose");

const { ERRORS } = require("@src/constants");

const keySchema = new mongoose.Schema({
  createdAt: {
    default: () => new Date(),
    type: Date
  },
  warrantyKey: {
    default: true,
    type: Boolean
  },
  replacements: {
    default: 0,
    type: Number
  },
  explicitAdminPermission: {
    default: false,
    type: Boolean
  },
  spotifyUser: {
    default: null,
    type: String
  },
  used: {
    default: false,
    type: Boolean
  },
  value: {
    maxlength: 1024,
    minlength: 1,
    required: ERRORS.KEY.MISSING,
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Key", keySchema);