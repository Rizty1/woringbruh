const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const { ERRORS: { COUNTRY, EMAIL, KEY } } = require("@src/constants");

const upgrade = require("@helpers/upgrade");

const Key = require("@models/Key");
const UpgradeLog = require("@models/UpgradeLog");

const route = Router();

route.post("/upgrade", async (req, res, next) => {
  const { country, email, key } = req.body;

  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));
  if (!key) return next(createError(BAD_REQUEST, KEY.MISSING));

  const keyExists = await Key
    .exists({ used: false, value: key })
    .catch(error => ({ error }));

  if (!keyExists) return next(createError(BAD_REQUEST, KEY.INVALID));
  if (keyExists.error) return next(createError(INTERNAL_SERVER_ERROR, keyExists.error));

  const retries = req.app.get("UPGRADE_RETRIES");
  const result = await upgrade(country, retries).catch(error => ({
    error: createError(INTERNAL_SERVER_ERROR, error)
  }));

  if (result.error instanceof Error) return next(result.error);

  const { address, inviteToken, inviteURL, password, username } = result;

  await Promise
    .all([
      Key.updateOne({ value: key }, { used: true }),

      new UpgradeLog({
        country,
        familyAccount: {
          address,
          inviteURL,
          password,
          username
        },
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        key
      }).save()
    ])
    .then(() => {
      res.send({
        address,
        inviteToken,
        inviteURL
      });
    })
    .catch(error => next(createError(INTERNAL_SERVER_ERROR, error)));
});

module.exports = route;
