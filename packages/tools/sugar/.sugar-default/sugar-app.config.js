const __packageRoot = require('../src/node/path/packageRoot');
const __sugarConfig = require('../src/node/config/sugar');

module.exports = {
  welcome: {
    serverModule: 'frontendServer'
  },
  modules: {
    frontendServer: {
      id: 'frontendServer',
      name: 'Frontend Server',
      description:
        'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
      autoRun: true,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerProcess`,
      stdio: ['blessed'],
      params: '[config.frontend]'
      // presets: {
      //   prod: {
      //     name: 'Build production',
      //     key: 'p',
      //     params: {
      //       hostname: 'localhost'
      //     }
      //   }
      // }
    },
    scss: {
      id: 'scss',
      name: 'SCSS Compiler',
      description:
        'Watch and build the SCSS files to production ready CSS ones',
      autoRun: true,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/scss/compile/SScssCompilerProcess`,
      stdio: ['blessed'],
      params: '[config.scss.compile]'
    },
    svelte: {
      id: 'svelte',
      name: 'Svelte Compiler',
      description: 'Watch and build the svelte files',
      autoRun: true,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/svelte/compile/SSvelteCompilerProcess`,
      stdio: ['blessed'],
      params: {
        ...__sugarConfig('ts.svelte'),
        watch: true
      }
    },
    typescript: {
      id: 'typescript',
      name: 'Typescript Compiler',
      description: 'Watch and build the typescript files',
      autoRun: true,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/typescript/compile/STsCompilerProcess`,
      stdio: ['blessed'],
      params: {
        ...__sugarConfig('ts.compile'),
        watch: true
      }
    }

    // compileTs: {
    //   id: 'compileTs',
    //   name: 'Compile Typescript',
    //   autoRun: true,
    //   description:
    //     'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
    //   processPath: `${__packageRoot(
    //     __dirname
    //   )}/src/node/typescript/compile/SCompileTsProcess`,
    //   stdio: ['terminal', 'socket'],
    //   params: {
    //     stacks: ['js', 'node'],
    //     transpileOnly: true,
    //     watch: true
    //   }
    // }
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
