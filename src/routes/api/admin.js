const bodyParser = require("body-parser");
const createError = require("http-errors");

const { Router } = require("express");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require("http-status-codes");

const { ERRORS: { TOKEN } } = require("@src/constants");

const BlacklistedToken = require("@models/BlacklistedToken");

const accounts = require("@routes/api/admin/accounts");
const countries = require("@routes/api/admin/countries");
const keys = require("@routes/api/admin/keys");
const logs = require("@routes/api/admin/logs");
const login = require("@routes/api/admin/login");
const logout = require("@routes/api/admin/logout");
const settings = require("@routes/api/admin/settings");

const verifyJWT = require("@utils/jwt/verifyJWT");

const route = Router();

route.use(bodyParser.json());

route.use(login);
route.use(logout);

// Check if JWT token is blacklisted, i.e. logged out
route.use((req, _, next) => {
  const { token } = req.cookies;
  if (!token) return next(createError(BAD_REQUEST, TOKEN.MISSNG));

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

route.use("/accounts", accounts);
route.use("/countries", countries);
route.use("/keys", keys);
route.use("/logs", logs);
route.use("/settings", settings);

module.exports = route;
