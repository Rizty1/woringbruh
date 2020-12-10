const createError = require("http-errors");
const { Router } = require("express");

const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const Key = require("@models/Key");

const route = Router();

route.delete("/purge", async (req, res, next) => {

  try {
    await Key.deleteMany({});

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
