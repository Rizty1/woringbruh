const createError = require("http-errors");
const { Router } = require("express");

const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const UpgradeLog = require("@models/UpgradeLog");

const route = Router();

route.get("/", async (req, res, next) => {
    
    try {
        const logs = await UpgradeLog.find().exec();

        res.send({
            logs
        });
    } catch (error) {
        next(createError(INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = route;
