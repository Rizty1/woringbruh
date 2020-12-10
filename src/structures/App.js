/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const path = require("path");

const consola = require("consola");
const express = require("express");

const getFilesSync = require("@utils/findFilesSync");

class App {
  constructor(settings = {}) {
    this.express = express();

    this
      .setupTemplateEngine()
      .loadGlobalMiddleware()
      .loadRoutes()
      .loadErrorHandler();

    for (const [key, value] of Object.entries(settings)) {
      this.express.set(key, value)
    }
  }

  listen(port) {
    return new Promise((resolve) => this.express.listen(port, resolve));
  }

  // Sync is fine since this is only ran on startup
  loadGlobalMiddleware() {
    const middlewaresPath = path.join(__dirname, "../middleware");
    const middlewares = getFilesSync(middlewaresPath);

    if (!middlewares.length) return this;

    middlewares.forEach((filename) => {
      const middleware = require(path.join(middlewaresPath, filename));

      if (typeof middleware !== "function") {
        consola.error(`No middleware handler found for ${filename}!`);
      } else {
        try {
          this.express.use(middleware);
        } catch (error) {
          consola.error(`Error occurred with the middleware "${filename}"\n\n${error}`);
        }
      }
    });

    return this;
  }

  // Sync is fine since this is only ran on startup
  loadRoutes() {
    const routesPath = path.join(__dirname, "../routes");
    const routes = getFilesSync(routesPath);

    if (!routes.length) return this;

    routes.forEach((filename) => {
      const route = require(path.join(routesPath, filename));

      // Remove last 3 characters which is the file extension
      const routePath = filename === "index.js" ? "/" : `/${filename.slice(0, -3)}`;

      try {
        this.express.use(routePath, route);
      } catch (error) {
        consola.error(`Error occured with the route "${filename}"\n\n${error}`);
      }
    });

    return this;
  }

  // Should be loaded after routes
  loadErrorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.express.use((error, _req, res, _next) => {
      const { message, statusCode = 500 } = error;
      if (statusCode >= 500) consola.error(error);

      res
        .status(statusCode)
        .send({ message, statusCode });
    });

    return this;
  }

  setupTemplateEngine() {
    this.express.set("views", path.join(__dirname, "../views"));
    this.express.set("view engine", "ejs");

    return this;
  }
}

module.exports = App;
