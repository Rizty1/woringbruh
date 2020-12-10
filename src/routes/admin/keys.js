const { Router } = require("express");

const route = Router();

route.get("/keys", (_, res) => res.render("admin/keys"));

module.exports = route;