module.exports = {
  preMiddlewares: [
    '* requestLog requestParseURLEncoded requestParseBody cookieParser'
  ],
  routes: [
    // health check
    'GET /health HomeController.check',

    // home
    'GET / HomeController.index',

    // app bridge routes, need sessionStore
    'GET /oauth sessionStore appBridgeStartAuth',
    'GET /oauth/callback sessionStore appBridgeCallback',

    // api routes
    'GET /api/users/me appBridgeAuth UsersController.me',
    'GET /api/news appBridgeAuth NewsController.index',
    'POST /api/news appBridgeAuth NewsController.create',
    'GET /api/news/:id appBridgeAuth NewsController.show',
    'PUT /api/news/:id appBridgeAuth NewsController.update',
    'DELETE /api/news/:id appBridgeAuth NewsController.delete',
  ],
  postMiddlewares: [],
}
