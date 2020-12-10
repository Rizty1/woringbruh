const { Router } = require("express");

const route = Router();

route.get("/logging", (_, res) => res.render("admin/logging"));

module.exports = route;