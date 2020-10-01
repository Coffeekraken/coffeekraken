const __packageRoot = require('../src/node/path/packageRoot');
module.exports = {
  welcome: {
    serverModule: 'frontendServer'
  },

  modules: {
    frontendServer: {
      id: 'server.frontend',
      name: 'Sugar App Frontend Server',
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      module: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerSugarAppModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/interface/SFrontendServerInterface`,
      params: '@config.frontend'
    },
    buildScss: {
      id: 'build.scss',
      name: 'Sugar App Build SCSS',
      description:
        'Watch and build the SCSS files to production ready CSS ones',
      module: `${__packageRoot(
        __dirname
      )}/src/node/build/scss/SBuildScssSugarAppModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/build/scss/interface/SBuildScssInterface`,
      ui: `${__packageRoot(
        __dirname
      )}/src/node/build/scss/SBuildScssSugarAppTerminalUi`,
      params: '@config.build.scss',
      shortcuts: {
        'ctrl+b': {
          name: 'Build',
          params: '@config.build.scss',
          settings: {}
        }
      }
    },
    buildJs: {
      id: 'build.js',
      name: 'Sugar App Build JS',
      description: 'Watch and build the JS files to production ready ones',
      module: `${__packageRoot(
        __dirname
      )}/src/node/build/js/SBuildJsSugarAppModule`,
      interface: `${__packageRoot(
        __dirname
      )}/src/node/build/js/interface/SBuildJsInterface`,
      ui: `${__packageRoot(
        __dirname
      )}/src/node/build/js/SBuildJsSugarAppTerminalUi`,
      params: '@config.build.js',
      shortcuts: {
        'ctrl+a': {
          name: 'Build all',
          params: '@config.build.js',
          settings: {}
        },
        'ctrl+e': {
          name: 'Build Something',
          params: '@config.build.js',
          settings: {}
        }
      }
    }
  }
};
