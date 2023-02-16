const _ = require('lodash');
const session = require('express-session');

const redisStore = _.memoize(() => {
  const RedisStore = require('connect-redis')(session);
  return new RedisStore({ client: redisSession })
})

const cycliDBSessionStore = _.memoize(() => {
  const { CyclicSessionStore } = require("@cyclic.sh/session-store");
  return new CyclicSessionStore({
    table: {
      name: process.env.CYCLIC_DB,
    }
  });
})

module.exports = (req, res, next) => {
  return session({
    store: process.env.RUNTIME === 'cyclic' ? cycliDBSessionStore() : redisStore(),
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
