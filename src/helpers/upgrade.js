const createError = require("http-errors");
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require("http-status-codes");

const { ERRORS: { COUNTRY, UPGRADE } } = require("@src/constants");

const Country = require("@models/Country");

const upgrade = require("@utils/spotify/upgrade");

const UPGRADE_RETRIES = Number(process.env.UPGRADE_RETRIES) || 25;

const makeError = (statusCode, error) => ({ error: createError(statusCode, error) });

module.exports = async (country, retries = UPGRADE_RETRIES) => {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const accounts = await Country
      .findOne({ name: country })
      .then(country => country ? country.accounts : null)
      .catch(error => ({ error }));

    if (!accounts) return makeError(NOT_FOUND, COUNTRY.NOT_FOUND);
    if (accounts.error) return makeError(INTERNAL_SERVER_ERROR, accounts.error);

    const account = accounts.find(({ dead, used }) => !dead && !used);
    if (!account) return makeError(NOT_FOUND, UPGRADE.OUT_OF_STOCK);

    const { password, username } = account;
    const result = await upgrade(username, password);

    await Country.updateMany(
      {},
      { $set: { "accounts.$[user].dead": result.dead, "accounts.$[user].used": result.used } },
      { arrayFilters: [{ "user.username": username }] }
    );

    if (!result.dead) {
      return {
        ...result,
        password,
        username
      };
    }
  }

  return makeError(NOT_FOUND, UPGRADE.EXCEEDED_MAXIMUM_RETRIES);
};
