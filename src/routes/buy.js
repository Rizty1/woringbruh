const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.redirect(res.app.settings.BUY_LINK || "/"));

module.exports = route;
