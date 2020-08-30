const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  modules: {
    frontendServer: {
      id: 'server.frontend',
      name: 'Sugar UI Frontend Server',
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      process: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerProcess`,
      params: {}
    }
  }
};
