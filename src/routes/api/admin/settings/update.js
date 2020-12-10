const fs = require("fs");
const path = require("path");
const util = require("util");

const createError = require("http-errors");

const { Router } = require("express");
const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const route = Router();

const SETTINGS_PATH = path.join(__dirname, "../../../../../settings.json");

route.patch("/update", async (req, res, next) => {
  try {
    await readFile(SETTINGS_PATH)
      .then(JSON.parse)
      .then(settings => writeFile(
        SETTINGS_PATH,
        JSON.stringify(Object.assign(settings, req.body), null, 2))
      );
  } catch (error) {
    return next(createError(INTERNAL_SERVER_ERROR, error));
  }

  for (const [key, value] of Object.entries(req.body)) {
    req.app.set(key, value)
  }

  res.send(req.app.settings)
});

module.exports = route;
