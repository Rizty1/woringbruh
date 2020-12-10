const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { ERRORS: { KEY } } = require("@src/constants");

const UpgradeLog = require("@models/UpgradeLog");

const route = Router();

route.post("/details", async (req, res, next) => {
  const { key } = req.body;
  if (!key) return next(createError(BAD_REQUEST, KEY.MISSING));

  const keyExists = await UpgradeLog.exists({
    key
  }).catch(error => ({
    error
  }));

  if (!keyExists) return next(createError(BAD_REQUEST, KEY.INVALID));
  if (keyExists.error)
    return next(createError(INTERNAL_SERVER_ERROR, keyExists.error));

  try {
    let details = await UpgradeLog.findOne({ key });
    if (!details) return next(createError(BAD_REQUEST, KEY.INVALID));
    else {
      let {familyAccount : {address, inviteURL} } = details;
      res.send({
        address,
        inviteURL
      });
    }
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
