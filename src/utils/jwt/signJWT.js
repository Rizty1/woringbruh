const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports = (payload = {}, options = {}) =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, JWT_SECRET, options, (error, token) =>
      (error ? reject(error) : resolve(token))
    )
  );
