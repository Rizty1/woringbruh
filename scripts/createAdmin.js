require("dotenv").config();
require("module-alias/register");

const readline = require("readline");

const bcrypt = require("bcrypt");

const consola = require("consola");
const mongoose = require("mongoose");

const Admin = require("@models/Admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const {
  DB_NAME = "spotify-shop",
  DB_URL = "mongodb://localhost:27017"
} = process.env;

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

const ask = (query, validator) => new Promise((resolve) => {
  rl.question(`${query} `, (answer) => {
    if (!validator || typeof validator !== "function") resolve(answer);
    else if (!validator(answer)) resolve(ask(query, validator));
    else resolve(answer);
  });
});

(async () => {
  await mongoose.connect(`${DB_URL}/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const username = await ask("What should be the admin's username?", (answer) => answer.length);

  const usernameAlreadyExists = await Admin.exists({ username });
  if (usernameAlreadyExists) {
    consola.fatal(`Username "${username}" already exists!`);
    return process.exit();
  }

  const password = await ask("What should be the admin's password?", (answer) => answer.length);

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  await new Admin({
    password: hashedPassword,
    username
  }).save();

  consola.success(`"${username}" has been successfully created!`);

  process.exit();
})();
