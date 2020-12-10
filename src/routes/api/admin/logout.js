const createError = require("http-errors");
const { Router } = require("express");

const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const BlacklistedToken = require("@models/BlacklistedToken");

const route = Router();

route.get("/logout", (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    new BlacklistedToken({
      loggedOutOn: new Date(),
      token
    }).save()
      .catch((error) => next(createError(INTERNAL_SERVER_ERROR, error)));

    res.cookie("token", "", { expires: new Date(0) });
  }

  res.redirect(302, "/admin/login");
});

module.exports = route;
