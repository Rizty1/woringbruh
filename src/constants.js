const ERRORS = {
  BUY_LINK: {
    MISSING: "Buy link is missing!"
  },

  CONTACT_LINK: {
    MISSING: "Contact link is missing!"
  },

  COUNTRY: {
    ALREADY_EXISTS: "Country already exists!",
    INVALID: "Invalid country provided!",
    MISSING: "Country not provided!",
    NOT_FOUND: "Country not found!"
  },

  EMAIL: {
    MISSING: "Email not provided!"
  },

  IP: {
    MISSING: "IP not provided!"
  },

  KEY: {
    INVALID: "You must proivde a valid key!",
    MISSING: "You must provide a key!"
  },

  LOGIN: {
    INVALID_CREDENTIALS: "Invalid login credentials!"
  },

  PAGINATION: {
    LIMIT_NAN: "Limit must be a number!",
    SKIP_LESS_THAN_ONE: "Skip must be a number greater than or equal to 1!",
    SKIP_NAN: "Skip must be a number!"
  },

  PASSWORD: {
    MISSING: "You must provide a password!",
  },

  SPOTIFY_BEARER: {
    INVALID: "Spotify bearer token is invalid! Please sign in with Spotify again.",
    MISSING: "Spotify bearer token is missing! Please sign in with Spotify.",
  },

  TOKEN: {
    MISSNG: "No token provided!",
    INVALID: "Invalid token!"
  },

  UPGRADE: {
    EXCEEDED_MAXIMUM_RETRIES: "Upgrade retries has been exceeded, please try again!",
    INVALID_INVITEE_EMAIL: "Invalid invitee email!",
    MISSING_INVITEE_EMAIL: "Invitee email not provided!",
    OUT_OF_STOCK: "Sorry, we have ran out of stock!"
  },

  USERNAME: {
    MISSING: "You must provide an username!"
  },

  WARRANTY: {
    ALREADY_PREMIUM: "You are already premium!",
    EXCEEDED_REPLACEMENTS: "Your key has exceeded the maximum replacements!",
    NO_PREVIOUS_UPGRADE: "You must upgrade your account first before claiming warranty!",
    USER_NOT_MATCHING: "The user you upgraded does not match the current Spotify user that is signed in!"
  }
};

module.exports = {
  ERRORS
};
