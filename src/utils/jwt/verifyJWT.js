const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports = (token, options = {}) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, JWT_SECRET, options, (error, decoded) =>
      (error ? reject(error) : resolve(decoded))
    )
  );
