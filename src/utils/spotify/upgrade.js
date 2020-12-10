const {
  jar
} = require("request-promise-native");

const request = require("@utils/requestWithRetries");

const consola = require('consola')

const GET_FAMILY_PLAN = "https://www.spotify.com/us/home-hub/api/v1/family/home/";
const LOGIN_GET = "https://accounts.spotify.com/en/login";
const LOGIN_POST = "https://accounts.spotify.com/api/login";
const UPDATE_ADDRESS_POST = "https://www.spotify.com/uk/home-hub/api/v1/family/address/verify/"
const UPDATE_ADDRESS_PATCH = "https://www.spotify.com/us/home-hub/api/v1/family/home/"
const UPDATE_ADDRESS_THREE = "https://www.spotify.com/us/home-hub/api/v1/family/home/onboard/"

const __BON = "MHwwfDU5MDkxODg3N3wyNDgxODU5MjgzNHwxfDF8MXwx";

const HEADERS = {
  Accept: "application/json, text/plain, */*",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
};

module.exports = async (username, password) => {
  const cookies = jar();

  // Get csrf token
  await request({
    headers: HEADERS,
    jar: cookies,
    method: "HEAD",
    uri: LOGIN_GET
  });

  const csrfToken = cookies
    .getCookies(LOGIN_GET)
    .find(({
      key
    }) => key === "csrf_token");

  if (!csrfToken) throw new Error("Cannot get csrf token for login!");

  // Login to get authentication cookies
  const login = await request({
    uri: LOGIN_POST,
    method: "POST",
    jar: cookies,
    headers: {
      ...HEADERS,
      // Some constant that spotify has in the cookies or else it throws invalid credentials
      Cookie: `__bon=${__BON};`
    },
    form: {
      csrf_token: csrfToken.value,
      password,
      remember: true,
      username
    }
  }).catch((error) => error);

  // Can't login? Then its a dead account
  if (login.error) {
    const {
      response
    } = login.error;

    if (response) {
      if (response.body === "{\"error\":\"errorInvalidCredentials\"}") {
        return {
          dead: true,
          used: false
        };
      } else {
        consola.error(new Error(`Error (1): ${response.body}: ${response}`));
      }

      throw new Error(response.body);
    }

    throw new Error(login.error);
  }

  const plan = await request({
    headers: HEADERS,
    jar: cookies,
    json: true,
    uri: GET_FAMILY_PLAN
  }, {
    attempts: 15,
    validator: (response) => !response.error
  }).catch(error => ({
    error
  }));

  if (plan === false) {
    return {
      dead: true,
      used: false
    };
  }

  if (plan.error) {
    throw new Error("Failed to get family plan data!");
  }

  // User doesn't have a family plan
  if (plan.planType !== "family") {
    return {
      dead: true,
      used: false
    };
  }

  const loggedInUser = plan.members.find(m => m.isLoggedInUser === true)

  // Family plan does not have remaining free slots
  if (!plan.accessControl.planHasFreeSlots) {
    return {
      dead: true,
      used: false
    };
  }

  // Address has not been set to the family plan
  if (plan.onboardingState !== "finished" || !plan.address) {
    if (!loggedInUser.isMaster) {
      return {
        dead: true,
        used: false
      };
    }

    await request({
      headers: HEADERS,
      jar: cookies,
      json: true,
      method: "POST",
      body: {
        "address": "Pringle Street, Kingston, PA, USA",
        "placeId": "EiFQcmluZ2xlIFN0cmVldCwgS2luZ3N0b24sIFBBLCBVU0EiLiosChQKEgnpvAJXpxDFiRETVOzQx6LraxIUChIJla-ztBIaxYkR2IYLacUTH1w",
        "isMaster": true
      },
      uri: UPDATE_ADDRESS_POST
    }, {
      attempts: 15,
      validator: (response) => !response.error
    }).catch((error) => {
      error
    });

    await request({
      headers: HEADERS,
      jar: cookies,
      json: true,
      method: "PATCH",
      body: {
        "address": "Pringle St, Kingston, PA 18704, USA",
        "placeId": "Eh1QcmluZ2xlIFN0LCBLaW5nc3RvbiwgUEEsIFVTQSIuKiwKFAoSCem8AlenEMWJERNU7NDHoutrEhQKEgmVr7O0EhrFiRHYhgtpxRMfXA"
      },
      uri: UPDATE_ADDRESS_PATCH
    }, {
      attempts: 15,
      validator: (response) => !response.error
    }).catch((error) => {
      error
    });

    await request({
      headers: HEADERS,
      jar: cookies,
      json: true,
      method: "POST",
      body: {
        "address": "Pringle Street, Kingston, PA, USA",
        "placeId": "EiFQcmluZ2xlIFN0cmVldCwgS2luZ3N0b24sIFBBLCBVU0EiLiosChQKEgnpvAJXpxDFiRETVOzQx6LraxIUChIJla-ztBIaxYkR2IYLacUTH1w",
        "isMaster": true
      },
      uri: UPDATE_ADDRESS_THREE
    }, {
      attempts: 15,
      validator: (response) => !response.error
    }).catch((error) => {
      error
    });
    if (!plan.inviteToken) return {
      dead: true,
      used: false
    }
    else return {
      address: "Pringle Street, Kingston, PA, USA",
      dead: false,
      inviteToken: plan.inviteToken,
      inviteURL: `https://www.spotify.com/us/family/join/invite/${plan.inviteToken}`,
      used: true
    };
  }

  // Address update required
  if (plan.accessControl.addressUpdateRequired) {
    return {
      dead: true,
      used: false
    };
  }
  if (!plan.inviteToken) {
    return {
      dead: true,
      used: false
    }
  }

  return {
    address: plan.address,
    dead: false,
    inviteToken: plan.inviteToken,
    inviteURL: `https://www.spotify.com/us/family/join/invite/${plan.inviteToken}`,
    used: true
  };
};