const crypto = require("crypto");

module.exports = (size = 1) =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(size, (error, buffer) =>
      (error ? reject(error) : resolve(buffer.toString("hex")))
    )
  );
