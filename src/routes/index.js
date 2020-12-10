const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.render("index"));

module.exports = route;
