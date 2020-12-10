const { Router } = require("express");

const index = require("@routes/api/admin/settings/index");
const update = require("@routes/api/admin/settings/update");

const route = Router();

route.use(index);
route.use(update);

module.exports = route;
