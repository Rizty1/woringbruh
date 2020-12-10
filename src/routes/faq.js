const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.render("faq"));

module.exports = route;
