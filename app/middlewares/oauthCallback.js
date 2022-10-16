module.exports = (req, res, next) => {
  return helpers.developerOAuth.callback(req, res)
};
