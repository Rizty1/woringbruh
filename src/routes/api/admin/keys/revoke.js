const createError = require("http-errors");
const { Router } = require("express");

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes");

const { ERRORS: { KEY } } = require("@src/constants");

const Key = require("@models/Key");

const route = Router();

route.post("/revoke", async (req, res, next) => {
  return res.send({title: "Error", content: "This only applies to the warranty addon"})
  /*
  const { key } = req.body;
  if (!key) return next(createError(BAD_REQUEST, KEY.MISSING));

  try {
    const keyExists = await Key.exists({ value: key });
    if (!keyExists) return next(createError(BAD_REQUEST, KEY.INVALID));
    /*
    const { explicitAdminPermission } = await Key.findOne({ value: key });
    if (explicitAdminPermission) {
        await Key.updateOne({ value: key }, { explicitAdminPermission: false });
        let c = `The key ${key} is now revoked and cannot be used more then the replacement limit.`;
        return res.send({title: "Revoked", content: c})
    } else {
        await Key.updateOne({ value: key }, { explicitAdminPermission: true });
        let c = `The key ${key} is now unrevoked and cannot be used one more time.`;
        return res.send({title: "Un-Revoked", content: c})
    }
    
  } catch (error) {
    next(createError(INTERNAL_SERVER_ERROR, error));
  }
  */
});

module.exports = route;
