const createError = require("http-errors");

const { Router } = require("express");
const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const Country = require("@models/Country");

const route = Router();

route.get("/stock", (_, res, next) => {
  Country
    .find()
    .exec()
    .then((countries) => {
      const stock = countries.map((country) => ({
        name: country.name,
        stock: country.accounts.filter(({ dead, used }) => !dead && !used).length
      }));
  
      res.send({
        stock,
        total: countries.length
      });
    })
    .catch(error => next(createError(INTERNAL_SERVER_ERROR, error)));
});

module.exports = route;
