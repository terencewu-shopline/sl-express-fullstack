const { OpenApiClient } = require('@shopline/shopline-sdk-node')

const OpenAPI = {
  withToken: (token) => new OpenApiClient({
    baseURL: process.env.OPEN_API_ENDPOINT,
    accessToken: token,
    logger: console.log,
  })
}

module.exports = OpenAPI;
