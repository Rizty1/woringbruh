const { Router } = require("express");

const route = Router();

route.get("/help", (_, res) => res.redirect("https://spotify.hacks.network"));

module.exports = route;