const mongoose = require("mongoose");

const { ERRORS: { COUNTRY, PASSWORD, USERNAME } } = require("@src/constants");

const countrySchema = new mongoose.Schema({
  accounts: [{
    addedOn: {
      default: () => new Date(),
      type: Date
    },
    dead: {
      default: false,
      type: Boolean
    },
    password: {
      maxlength: 128,
      minlength: 1,
      required: PASSWORD.MISSING,
      type: String,
    },
    used: {
      default: false,
      type: Boolean
    },
    username: {
      maxlength: 128,
      minlength: 1,
      required: USERNAME.MISSING,
      type: String
    }
  }],
  createdAt: {
    default: () => new Date(),
    type: Date
  },
  name: {
    maxlength: 128,
    minlength: 1,
    required: COUNTRY.MISSING,
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Country", countrySchema);
