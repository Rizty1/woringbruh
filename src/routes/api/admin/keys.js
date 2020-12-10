const { Router } = require("express");

const generate = require("@routes/api/admin/keys/generate");
const index = require("@routes/api/admin/keys/index");
const remove = require("@routes/api/admin/keys/remove");
const revoke = require("@routes/api/admin/keys/revoke");
const purge = require("@routes/api/admin/keys/purge");

const route = Router();

route.use(generate);
route.use(index);
route.use(remove);
route.use(revoke);
route.use(purge);

module.exports = route;
