const { Router } = require("express");

const route = Router();

route.get("/login", (req, res) => {
  if (req.cookies.token) res.redirect("/admin");
  else res.render("admin/login");
});

module.exports = route;