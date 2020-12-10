const createError = require("http-errors");

const { Router } = require("express");
const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const { ERRORS: { COUNTRY } } = require("@src/constants");

const Country = require("@models/Country");

const route = Router();

route.post("/add", async (req, res, next) => {
  const { country } = req.body;
  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));

  try {
    const countryAlreadyExists = await Country.exists({ name: country });
    if (countryAlreadyExists) return next(createError(CONFLICT, COUNTRY.ALREADY_EXISTS));

    await new Country({ name: country }).save();

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
