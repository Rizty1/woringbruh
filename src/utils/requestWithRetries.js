const request = require("request-promise-native");

const DEFAULT_OPTIONS = {
  attempts: 1,
  validator: () => true
};

module.exports = async (requestOptions = {}, options = DEFAULT_OPTIONS) => {
  const { attempts, validator } = options;

  for (let i = 0; i < attempts; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const response = await request(requestOptions).catch((error) => ({ error }));
    if (!validator || typeof validator !== "function") return response;
    if (validator(response)) return response;
  }

  //throw new Error(`Response has failed validator ${attempts} times`);
  return false;
};
