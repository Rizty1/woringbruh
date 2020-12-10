const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.render("admin"));

module.exports = route;