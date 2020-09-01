const __packageRoot = require('../src/node/path/packageRoot');
const __sugarConfig = require('../src/node/config/sugar');

module.exports = {
  modules: {
    frontendServer: {
      id: 'server.frontend',
      name: 'Sugar UI Frontend Server',
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      module: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerSugarUiModule`,
      settings: '@config.frontend'
    }
  }
};
