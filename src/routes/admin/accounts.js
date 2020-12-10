const { Router } = require("express");

const route = Router();

route.get("/accounts", (_, res) => res.render("admin/accounts"));

module.exports = route;