const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const { ERRORS: { KEY } } = require("@src/constants");

const Key = require("@models/Key");

const route = Router();

route.delete("/remove", async (req, res, next) => {
  const { key } = req.body;
  if (!key) return next(createError(BAD_REQUEST, KEY.MISSING));

  try {
    const keyExists = await Key.exists({ value: key });
    if (!keyExists) return next(createError(BAD_REQUEST, KEY.INVALID));

    await Key.deleteOne({ value: key });

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
