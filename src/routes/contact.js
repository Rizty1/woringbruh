const { Router } = require("express");

const route = Router();

route.get("/", (_, res) => res.redirect(res.app.settings.CONTACT_LINK || "/"));

module.exports = route;
