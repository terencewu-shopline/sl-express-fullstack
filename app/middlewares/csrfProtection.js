const csrf = require('csurf');

const csrfProtection = csrf({ cookie: false });

const excludeList = new Set([]);

const optionalCSRF = (req, res, next) => {
  if (excludeList.has(req.originalUrl)) {
    next();
    return;
  }
  csrfProtection(req, res, next);
};

module.exports = optionalCSRF;
