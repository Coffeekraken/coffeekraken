const __packageRoot = require('../src/node/path/packageRoot');
module.exports = {
  welcome: {
    serverModule: 'frontendServer'
  },

  modules: {
    frontendServer: {
      id: 'frontendServer',
      name: 'Sugar App Frontend Server',
      autoRun: true,
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      process: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerProcess`,
      // module: `${__packageRoot(
      //   __dirname
      // )}/src/node/server/frontend/SFrontendServerSugarAppModule`,
      // interface: `${__packageRoot(
      //   __dirname
      // )}/src/node/server/frontend/interface/SFrontendServerInterface`,
      params: '[config.frontend]'
    }
    // buildScss: {
    //   id: 'buildScss',
    //   name: 'Sugar App Build SCSS',
    //   description:
    //     'Watch and build the SCSS files to production ready CSS ones',
    //   module: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/scss/SBuildScssSugarAppModule`,
    //   interface: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/scss/interface/SBuildScssInterface`,
    //   ui: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/scss/SBuildScssSugarAppTerminalUi`,
    //   params: '@config.build.scss',
    //   shortcuts: {
    //     'ctrl+b': {
    //       name: 'Build',
    //       params: {},
    //       settings: {}
    //     },
    //     'ctrl+p': {
    //       name: 'Build prod',
    //       params: {
    //         prod: true
    //       },
    //       settings: {}
    //     }
    //   }
    // },
    // buildJs: {
    //   id: 'buildJs',
    //   name: 'Sugar App Build JS',
    //   description: 'Watch and build the JS files to production ready ones',
    //   module: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/js/SBuildJsSugarAppModule`,
    //   interface: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/js/interface/SBuildJsInterface`,
    //   ui: `${__packageRoot(
    //     __dirname
    //   )}/src/node/build/js/SBuildJsSugarAppTerminalUi`,
    //   params: '@config.build.js',
    //   shortcuts: {
    //     'ctrl+b': {
    //       name: 'Build all',
    //       params: {},
    //       settings: {}
    //     },
    //     'ctrl+p': {
    //       name: 'Build prod',
    //       params: {
    //         prod: true
    //       },
    //       settings: {}
    //     }
    //   }
    // }
  }
};
