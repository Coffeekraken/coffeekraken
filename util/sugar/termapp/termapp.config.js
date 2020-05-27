const __packageJson = require('../package.json');
const __CommandsAppPage = require('./src/node/pages/CommandsAppPage');
const __AboutAppPage = require('./src/node/pages/AboutAppPage');
const __SBuildScssCommand = require('../src/node/build/SBuildScssCommand');
const __SPhpServerCommand = require('../src/node/server/SPhpServerCommand');

module.exports = {
  rootDir: __dirname,
  header: {
    title: `<bold>Coffeekraken</bold> <bgBlack><yellow> Sugar </yellow></bgBlack> <black>v${__packageJson.version}</black>`
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
    'server.php': {
      class: __SPhpServerCommand,
      argsObj: {},
      settings: {}
    },
    'build.scss': {
      class: __SBuildScssCommand,
      argsObj: {},
      settings: {}
    }
  },
  pages: {
    default: '/commands',
    urls: {
      '/commands/{?namespace}': {
        pageClass: __CommandsAppPage,
        defaultArgs: {
          namespace: 'server.**'
        },
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
        pageClass: __AboutAppPage,
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
