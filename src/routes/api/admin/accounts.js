const { Router } = require("express");

const add = require("@routes/api/admin/accounts/add");
const index = require("@routes/api/admin/accounts/index");
const remove = require("@routes/api/admin/accounts/remove");

const route = Router();

route.use(add);
route.use(index);
route.use(remove);

module.exports = route;
