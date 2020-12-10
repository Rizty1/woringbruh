const createError = require("http-errors");

const { Router } = require("express");

const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} = require("http-status-codes");

const { ERRORS: { TOKEN } } = require("@src/constants")

const accounts = require("@routes/admin/accounts");
const help = require("@routes/admin/help");
const index = require("@routes/admin/index");
const keys = require("@routes/admin/keys");
const logging = require("@routes/admin/logging");
const checker = require("@routes/admin/checker");
const login = require("@routes/admin/login");
const logout = require("@routes/admin/logout");

const BlacklistedToken = require("@models/BlacklistedToken");
const verifyJWT = require("@utils/jwt/verifyJWT");

const route = Router();

route.use(login);

route.use((req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.redirect("/admin/login");

  BlacklistedToken
    .exists({ token })
    .then((blacklisted) => {
      if (blacklisted) return next(createError(BAD_REQUEST, TOKEN.INVALID));

      verifyJWT(token)
        .then(() => next())
        .catch(() => next(createError(UNAUTHORIZED, TOKEN.INVALID)));
    })
    .catch(error => next(createError(INTERNAL_SERVER_ERROR, error)));
});

route.use(accounts);
route.use(help);
route.use(index);
route.use(keys);
route.use(logging);
route.use(checker);
route.use(logout);

module.exports = route;
