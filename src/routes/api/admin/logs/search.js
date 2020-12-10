const createError = require("http-errors");
const { Router } = require("express");

const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

const UpgradeLog = require("@models/UpgradeLog");

const route = Router();

route.get("/search", async (req, res, next) => {
    const { q } = req.query;
    try {
        const logs = await UpgradeLog.find(
            { used: false },
            { _id: false, createdAt: true }
        ).exec();

        res.send({
            logs: logs.filter(
                x => Object.values(x).join("").includes(q)
            )
        });
    } catch (error) {
        next(createError(INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = route;
