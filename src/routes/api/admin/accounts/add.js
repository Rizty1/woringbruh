const createError = require("http-errors");

const {
  Router
} = require("express");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND
} = require("http-status-codes");

const {
  ERRORS: {
    COUNTRY
  }
} = require("@src/constants");

const Country = require("@models/Country");

const route = Router();

route.post("/add", async (req, res, next) => {
  const {
    accounts,
    country
  } = req.body;

  if (!accounts || !accounts.length) return next(createError(BAD_REQUEST, "You must provide an array of accounts!"));
  if (!country) return next(createError(BAD_REQUEST, COUNTRY.MISSING));

  let familyAccounts = await Country.findOne({
    name: country
  });
  if (!familyAccounts) return next(createError(NOT_FOUND, COUNTRY.NOT_FOUND));
  familyAccounts = familyAccounts.accounts.map(a => {
    return {
      u: a.username,
      p: a.password
    }
  })
  // Make sure all accounts have a password and username field before continuing

  let actualAccounts = []
  for (let i = 0; i < accounts.length; i += 1) {
    const {
      password,
      username
    } = accounts[i];


    let familyAccountIndex = familyAccounts.findIndex(({
      u,
      p
    }) => u === username && p === password);

    if (username && password && familyAccountIndex > -1) actualAccounts.push(accounts[i])
  }

  try {
    const countryExists = await Country.exists({
      name: country
    });
    if (!countryExists) return next(createError(NOT_FOUND, COUNTRY.NOT_FOUND));

    await Country.updateOne({
      name: country
    }, {
      $push: {
        accounts
      }
    }, {
      runValidators: true
    });

    res.end();
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;