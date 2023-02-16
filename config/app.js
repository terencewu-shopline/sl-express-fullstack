module.exports = {
  directory: 'app',
  plugins: [
    'logger',
    'ejs',
    'static',
    ...(process.env.RUNTIME === 'cyclic' ? [] : ['redisSession']),
  ]
};
