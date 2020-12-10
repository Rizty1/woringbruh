const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.send({
  message: "Hello World!"
}));

module.exports = route;
