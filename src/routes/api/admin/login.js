const bcrypt = require("bcrypt");
const createError = require("http-errors");

const { Router } = require("express");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require("http-status-codes");

const { ERRORS: { LOGIN, PASSWORD, USERNAME } } = require("@src/constants");

const Admin = require("@models/Admin");

const signJWT = require("@utils/jwt/signJWT");

const route = Router();

route.post("/login", async (req, res, next) => {
  if (req.cookies.token) return res.end();
  const { password, username } = req.body;

  if (!password) return next(createError(BAD_REQUEST, PASSWORD.MISSING));
  if (!username) return next(createError(BAD_REQUEST, USERNAME.MISSING));

  try {
    const adminExists = await Admin.exists({ username });
    if (!adminExists) return next(createError(UNAUTHORIZED, LOGIN.INVALID_CREDENTIALS));

    const admin = await Admin.findOne({ username });

    const passwordsMatch = await bcrypt.compare(password, admin.password);
    if (!passwordsMatch) return next(createError(UNAUTHORIZED, LOGIN.INVALID_CREDENTIALS));

    const token = await signJWT(
      { id: admin._id, username: admin.username },
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
      })
      .send({
        accessToken: token
      });
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = route;
