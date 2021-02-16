import __packageRoot from '../node/path/packageRoot';
import __sugarConfig from '../node/config/sugar';

export default {
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
    docMap: {
      id: 'docMap',
      name: 'docMap.json file builder',
      description: 'Build docMap.json file',
      autoRun: false,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/docMap/SBuildDocMapProcess`,
      stdio: ['blessed'],
      params: {
        ...__sugarConfig('docMap')
      }
    },
    js: {
      id: 'js',
      name: 'Javascript Compiler',
      description: 'Watch and build the javascript files',
      autoRun: true,
      processPath: `${__packageRoot(
        __dirname
      )}/src/node/js/compile/SJsCompilerProcess`,
      stdio: ['blessed'],
      params: {
        ...__sugarConfig('js.compile'),
        watch: true,
        bundle: true
      }
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
      params: {
        ...__sugarConfig('scss.compile'),
        watch: true
      }
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
    ts: {
      id: 'ts',
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
  }
};
