const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const Key = require("@models/Key");

const generateId = require("@utils/generateId");

const route = Router();

route.post("/generate", async (req, res, next) => {
  const amount = req.body.amount ? Math.min(Math.max(req.body.amount, 0), 100) : 50;
  if (Number.isNaN(amount)) return next(createError(BAD_REQUEST, "Amount to generate must be a number!"));

  let keys = [];

  for (let i = 0; i < amount; i += 1) {
    keys.push(generateId(24));
  }

  try {
    keys = await Promise.all(keys);
    keys = keys.map((key) => ({ value: key }));

    await Key.insertMany(keys);

    res.send({ keys });
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
