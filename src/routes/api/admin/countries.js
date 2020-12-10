const { Router } = require("express");

const add = require("@routes/api/admin/countries/add");
const remove = require("@routes/api/admin/countries/remove");

const route = Router();

route.use(add);
route.use(remove);

module.exports = route;
