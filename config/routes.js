module.exports = {
  preMiddlewares: [
    '* requestLog requestParseURLEncoded requestParseBody cookieParser sessionStore csrfProtection csrfErrorHandler'
  ],
  routes: [
    // health check
    'GET /health HomeController.check',

    // home
    'GET / HomeController.index',

    // api routes
    'GET /api/news NewsController.index',
    'GET /api/news/:id NewsController.show',
    'PUT /api/news/:id NewsController.update',
  ],
  postMiddlewares: [],
}
