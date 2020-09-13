const __packageRoot = require('../src/node/path/packageRoot');
module.exports = {
  welcome: {
    serverModule: 'frontendServer'
  },

  modules: {
    frontendServer: {
      id: 'server.frontend',
      name: 'Sugar UI Frontend Server',
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      module: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerSugarUiModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/interface/SFrontendServerInterface`,
      params: '@config.frontend'
    },
    buildScss: {
      id: 'build.scss',
      name: 'Sugar UI Build SCSS',
      description:
        'Watch and build the SCSS files to production ready CSS ones',
      module: `${__packageRoot(
        __dirname
      )}/src/node/build/scss/SBuildScssSugarUiModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/build/scss/interface/SBuildScssInterface`,
      params: '@config.build.scss'
    }
  }
};
