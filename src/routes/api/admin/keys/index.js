const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const { ERRORS: { PAGINATION } } = require("@src/constants");

const Key = require("@models/Key");

const route = Router();

route.get("/", async (req, res, next) => {
  const limit = req.query.limit ? Math.min(Math.max(req.query.limit, 0), 50) : 50;
  const skip = req.query.skip ? Math.max(req.query.skip, 0) : 0;

  if (Number.isNaN(limit)) return next(createError(BAD_REQUEST, PAGINATION.LIMIT_NAN));
  if (Number.isNaN(skip)) return next(createError(BAD_REQUEST, PAGINATION.SKIP_NAN));

  try {
    const [keys, total] = await Promise.all([
      Key
        .find({ used: false }, {
          _id: false,
          createdAt: true,
          value: true
        })
        .limit(limit)
        .skip(skip)
        .exec(),

      Key
        .estimatedDocumentCount()
        .exec()
    ]);

    res.send({
      limit,
      keys,
      skip,
      total
    });
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
