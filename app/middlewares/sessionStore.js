const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = (req, res, next) => {
  return session({
    store: new RedisStore({ client: redisSession }),
    secret: process.env.SESSION_REDIS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'lax',
      domain: process.env.SESSION_DOMAIN,
      secure: String(process.env.SESSION_REDIS_SECURE_COOKIE) === 'true',
      maxAge: parseInt(process.env.SESSION_EXPIRY, 10),
    },
  })(req, res, next);
};
