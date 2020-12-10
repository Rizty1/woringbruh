const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.send(res.app.settings));

module.exports = route;
