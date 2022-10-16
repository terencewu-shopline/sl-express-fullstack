module.exports = (req, res, next) => {
  return helpers.developerOAuth.authenticate(req, res, next)
};
