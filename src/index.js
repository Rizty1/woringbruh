require("dotenv").config();
require("module-alias/register");

const consola = require("consola");
const mongoose = require("mongoose");

const settings = require("../settings.json");

const App = require("@structures/App");

const {
  DB_NAME = "spotify-shop",
  DB_URL = "mongodb://localhost:27017",
  PORT = 80,
} = process.env;

const DB_POOL_SIZE = Number(process.env.DB_POOL_SIZE) || 10;

(async () => {
  await mongoose.connect(`${DB_URL}/${DB_NAME}`, {
    poolSize: DB_POOL_SIZE,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  consola.success(`Connected to MongoDB on ${DB_URL}/${DB_NAME}`);

  await new App(settings).listen(PORT);

  consola.success(`Listening on port ${PORT}...`);
})();
