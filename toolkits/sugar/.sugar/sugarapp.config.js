const __packageJson = require('../package.json');
const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  rootDir: __dirname,
  header: {
    title: `<bgBlack><white> MIT </white></bgBlack> <bold>Coffeekraken</bold> <bgWhite><black> Sugar </black></bgWhite> <black>v${__packageJson.version}</black>`
  },
  features: {
    commands: [
      'server.frontend',
      // 'build.config',
      'build.scss',
      'build.js'
      // 'build.views',
      // 'build.docMap'
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
  pages: {
    default: '/commands',
    urls: {
      '/commands': {
        page: {
          path: `${__packageRoot(
            __dirname
          )}/src/node/termapp/pages/STermAppCommandsPage`,
          id: 'command',
          title: 'Commands',
          settings: {
            commands: [
              {
                id: 'server.frontend',
                name: 'Frontend Server',
                path: `${__packageRoot(
                  __dirname
                )}/src/node/server/frontend/SFrontendServerCli`,
                argsObj: {},
                settings: {},
                concurrent: false,
                key: 'f',
                watch: true,
                run: true,
                statusBar: true
              },
              {
                id: 'build.scss',
                name: 'Build SCSS',
                path: `${__packageRoot(
                  __dirname
                )}/src/node/build/scss/SBuildScssCli`,
                argsObj: {},
                settings: {},
                concurrent: false,
                key: 's',
                watch: true,
                run: true,
                statusBar: true
              },
              {
                id: 'build.js',
                name: 'Build JS',
                path: `${__packageRoot(
                  __dirname
                )}/src/node/build/js/SBuildJsCli`,
                argsObj: {},
                settings: {},
                concurrent: false,
                key: 'j',
                watch: true,
                run: true,
                statusBar: true
              }
              // {
              //   id: 'build.config',
              //   name: 'Build Config',
              //   path: `${__packageRoot(
              //     __dirname
              //   )}/src/node/build/config/SBuildConfigCommand`,
              //   argsObj: {},
              //   settings: {}
              // },
              // {
              //   id: 'build.scss',
              //   name: 'Build SCSS',
              //   path: `${__packageRoot(
              //     __dirname
              //   )}/src/node/build/scss/SBuildScssCommand`,
              //   argsObj: {},
              //   settings: {
              //     statusBar: true
              //   }
              // },
              // {
              //   id: 'build.js',
              //   name: 'Build JS',
              //   path: `${__packageRoot(
              //     __dirname
              //   )}/src/node/build/js/SBuildJsCommand`,
              //   argsObj: {},
              //   settings: {
              //     statusBar: true
              //   }
              // },
              // {
              //   id: 'build.views',
              //   name: 'Build Views',
              //   path: `${__packageRoot(
              //     __dirname
              //   )}/src/node/build/views/SBuildViewsCommand`,
              //   argsObj: {},
              //   settings: {}
              // },
              // {
              //   id: 'build.docMap',
              //   name: 'Build docMap.json',
              //   path: `${__packageRoot(
              //     __dirname
              //   )}/src/node/build/docMap/SBuildDocMapCommand`,
              //   argsObj: {},
              //   settings: {}
              // }
            ]
          }
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
