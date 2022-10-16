const { DeveloperOAuth, AppBridge } = require('@shopline/shopline-sdk-node');
const FileSystemTokenStore = require('@shopline/shopline-sdk-node/example-app-bridge/tokenStores/FileSystemTokenStore')

const developerOAuth = new DeveloperOAuth({
  endpoint: process.env.DEVELOPER_OAUTH_ENDPOINT,
  clientId: process.env.DEVELOPER_OAUTH_APP_CLIENT_ID,
  clientSecret: process.env.DEVELOPER_OAUTH_APP_CLIENT_SECRET,
  redirectUri: process.env.DEVELOPER_OAUTH_APP_REDIRECT_URI,
  scope: process.env.DEVELOPER_OAUTH_APP_SCOPE,
  logger: log,
  ensureLoginSession: false,  // set to false if not using shopline domains
});

const appBridge = new AppBridge({
  developerOAuth,
  tokenStore: new FileSystemTokenStore()
})

module.exports = appBridge;
