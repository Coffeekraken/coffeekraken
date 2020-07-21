const __packageJson = require('../package.json');
const __STermAppCommandsPage = require('../src/node/termapp/pages/STermAppCommandsPage');
const __STermAppAboutPage = require('../src/node/termapp/pages/STermAppAboutPage');
const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  rootDir: __dirname,
  header: {
    title: `<bgBlack><white> MIT </white></bgBlack> <bold>Coffeekraken</bold> <bgWhite><black> Sugar </black></bgWhite> <black>v${__packageJson.version}</black>`
  },
  features: {
    commands: [
      'server.frontend',
      'build.config',
      'build.scss',
      'build.js',
      'build.views',
      'build.docMap'
    ]
  },
  footer: {
    authors: [
      {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    ]
  },
  commands: {
    'server.frontend': {
      path: `${__packageRoot(
        __dirname
      )}/src/node/server/frontend/SFrontendServerCommand`,
      argsObj: {},
      settings: {
        run: true,
        statusBar: true
      }
    },
    'build.config': {
      path: `${__packageRoot(
        __dirname
      )}/src/node/build/config/SBuildConfigCommand`,
      argsObj: {},
      settings: {}
    },
    'build.scss': {
      path: `${__packageRoot(__dirname)}/src/node/build/scss/SBuildScssCommand`,
      argsObj: {},
      settings: {
        statusBar: true
      }
    },
    'build.js': {
      path: `${__packageRoot(__dirname)}/src/node/build/js/SBuildJsCommand`,
      argsObj: {},
      settings: {
        statusBar: true
      }
    },
    'build.views': {
      path: `${__packageRoot(
        __dirname
      )}/src/node/build/views/SBuildViewsCommand`,
      argsObj: {},
      settings: {}
    },
    'build.docMap': {
      path: `${__packageRoot(
        __dirname
      )}/src/node/build/docMap/SBuildDocMapCommand`,
      argsObj: {},
      settings: {}
    }
  },
  pages: {
    default: '/commands',
    urls: {
      '/commands/{?namespace}': {
        page: {
          path: `${__packageRoot(
            __dirname
          )}/src/node/termapp/pages/STermAppCommandsPage`,
          id: 'command',
          title: 'Commands'
        },
        defaultArgs: {},
        menu: [
          {
            url: '/commands/build',
            text: 'Builds'
          },
          {
            url: '/commands/server',
            text: 'Servers'
          }
        ]
      },
      '/about': {
        page: {
          path: `${__packageRoot(
            __dirname
          )}/src/node/termapp/pages/STermAppAboutPage`,
          id: 'about',
          title: 'About'
        },
        menu: [
          {
            url: '/about',
            text: 'About'
          }
        ]
      }
    }
  }
};
