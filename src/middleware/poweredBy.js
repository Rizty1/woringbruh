module.exports = (_, res, next) => {
  res.setHeader("X-Powered-By", "Pringle");
  next();
};
