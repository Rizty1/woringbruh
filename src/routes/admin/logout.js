const { Router } = require("express");

const route = Router();

route.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/login");
});

module.exports = route;