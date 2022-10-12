const express = require('express')

class StaticPlugin {
  didLoadFramework(app) {
    app.expressApp.use('/static/dist', express.static('static/dist'))
  }
}

module.exports = StaticPlugin;
