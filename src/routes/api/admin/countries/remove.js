const createError = require("http-errors");

const { Router } = require("express");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require("http-status-codes");

const { ERRORS: { COUNTRY } } = require("@src/constants");

const Country = require("@models/Country");

const route = Router();

route.delete("/remove", async (req, res, next) => {
  const { country } = req.body;
  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));

  try {
    const countryExists = await Country.exists({ name: country });
    if (!countryExists) return next(createError(NOT_FOUND, COUNTRY.NOT_FOUND));

    await Country.deleteOne({ name: country });

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
