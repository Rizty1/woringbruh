const bodyParser = require("body-parser");

const { Router } = require("express");
const { WEBSITE } = process.env;

const admin = require("@routes/api/admin");
const index = require("@routes/api/index");
const stock = require("@routes/api/stock");
const upgrade = require("@routes/api/upgrade");
const details = require("@routes/api/details");

const route = Router();

route.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", WEBSITE.split("//")[1]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

route.use(bodyParser.json({
    limit: "50mb"
}));

route.use("/admin", admin);

route.use(index);
route.use(stock);
route.use(upgrade);
route.use(details);

module.exports = route;