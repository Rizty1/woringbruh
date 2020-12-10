const mongoose = require("mongoose");

const { ERRORS } = require("@src/constants");

const upgradeLogSchema = new mongoose.Schema({
  country: {
    required: ERRORS.COUNTRY.MISSING,
    type: String
  },
  email: {
    type: String,
  },
  familyAccount: {
    address: {
      required: "Family account address is missing!",
      type: String
    },
    inviteURL: {
      required: "Family account invite URL is missing!",
      type: String
    },
    password: {
      required: ERRORS.PASSWORD.MISSING,
      type: String
    },
    username: {
      required: ERRORS.USERNAME.MISSING,
      type: String
    }
  },
  ip: {
    required: ERRORS.IP.MISSING,
    type: String
  },
  key: {
    maxlength: 1024,
    minlength: 1,
    required: ERRORS.KEY.MISSING,
    type: String
  },
  upgradedAt: {
    default: () => new Date(),
    type: Date
  }
});

module.exports = mongoose.model("UpgradeLog", upgradeLogSchema);
