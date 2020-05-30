const __packageJson = require('../package.json');
const __CommandsAppPage = require('./src/node/pages/CommandsAppPage');
const __AboutAppPage = require('./src/node/pages/AboutAppPage');
const __SBuildScssCommand = require('../src/node/build/SBuildScssCommand');
const __SPhpServerCommand = require('../src/node/server/SPhpServerCommand');
const __SBuildJsCommand = require('../src/node/build/SBuildJsCommand');

module.exports = {
  rootDir: __dirname,
  header: {
    title: `<bgBlack><white> MIT </white></bgBlack> <bold>Coffeekraken</bold> <bgWhite><black> Sugar </black></bgWhite> <black>v${__packageJson.version}</black>`
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
    },
    'build.js': {
      class: __SBuildJsCommand,
      argsObj: {},
      settings: {
        key: 'j'
      }
    }
  },
  pages: {
    default: '/commands',
    urls: {
      '/commands/{?namespace}': {
        page: {
          class: __CommandsAppPage,
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
          class: __AboutAppPage,
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
