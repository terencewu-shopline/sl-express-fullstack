const path = require('path')

class EjsPlugin {
  didLoadFramework(app) {
    const viewFolder = path.resolve(app.projectDir(), app.config.app.directory, 'views');
    app.expressApp.set('view engine', 'ejs');
    app.expressApp.set('views', viewFolder);
  }
}

module.exports = EjsPlugin;
