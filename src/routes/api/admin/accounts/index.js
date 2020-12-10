const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require("http-status-codes");

const { ERRORS: { COUNTRY, PAGINATION } } = require("@src/constants");

const Country = require("@models/Country");

const route = Router();

route.get("/", async (req, res, next) => {
  const { country } = req.query;
  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));

  const limit = req.query.limit ? Math.min(Math.max(req.query.limit, 0), 50) : 50;
  const skip = req.query.skip ? Math.min(Math.max(req.query.skip, 0), 50) : 0;

  if (Number.isNaN(limit)) return next(createError(BAD_REQUEST, PAGINATION.LIMIT_NAN));
  if (Number.isNaN(skip)) return next(createError(BAD_REQUEST, PAGINATION.SKIP_NAN));

  try {
    const countryExists = await Country.exists({ name: country });
    if (!countryExists) return next(createError(NOT_FOUND, COUNTRY.NOT_FOUND));

    const accounts = await Country.aggregate([{
      $project: { _id: false }
    }]);


    const total = await Country
      .estimatedDocumentCount()
      .exec();

    res.send({
      accounts,
      limit,
      skip,
      total
    });
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
