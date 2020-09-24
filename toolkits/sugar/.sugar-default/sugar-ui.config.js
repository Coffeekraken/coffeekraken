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
    },
    buildJs: {
      id: 'build.js',
      name: 'Sugar UI Build JS',
      description: 'Watch and build the JS files to production ready ones',
      module: `${__packageRoot(
        __dirname
      )}/src/node/build/js/SBuildJsSugarUiModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/build/js/interface/SBuildJsInterface`,
      params: '@config.build.js',
      shortcuts: {
        'ctrl+a': {
          name: 'Build all',
          params: '@config.build.js',
          settings: {}
        }
      }
    }
  }
};
