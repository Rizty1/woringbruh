const { Router } = require("express");

const route = Router();

route.get("/checker", (_, res) => res.render("admin/checker"));

module.exports = route;