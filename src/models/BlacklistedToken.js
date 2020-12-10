const mongoose = require("mongoose");

const { ERRORS: { TOKEN } } = require("@src/constants");

const blacklistedTokenSchema = new mongoose.Schema({
  loggedOutOn: {
    default: () => new Date(),
    type: Date
  },
  token: {
    required: TOKEN.MISSING,
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
