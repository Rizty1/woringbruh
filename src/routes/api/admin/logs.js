const { Router } = require("express");

const index = require("@routes/api/admin/logs/index");
const remove = require("@routes/api/admin/logs/remove");
const search = require("@routes/api/admin/logs/search");

const route = Router();

route.use(index);
route.use(remove);
route.use(search);

module.exports = route;
