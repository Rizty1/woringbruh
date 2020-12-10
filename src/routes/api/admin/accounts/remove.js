const createError = require("http-errors");

const { Router } = require("express");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require("http-status-codes");

const { ERRORS: { COUNTRY, PASSWORD, USERNAME } } = require("@src/constants");

const Country = require("@models/Country");

const route = Router();

route.delete("/remove", async (req, res, next) => {
  const { country, password, username } = req.body;

  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));
  if (!password) return next(createError(BAD_REQUEST, PASSWORD.MISSING));
  if (!username) return next(createError(BAD_REQUEST, USERNAME.MISSING));

  try {
    const countryExists = await Country.exists({ name: country });
    if (!countryExists) return next(createError(NOT_FOUND, COUNTRY.NOT_FOUND));

    await Country.updateOne(
      { name: country },
      {
        $pull: {
          accounts: {
            password,
            username
          }
        }
      },
      { runValidators: true }
    );

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
