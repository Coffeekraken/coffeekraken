const __packageJson = require('../package.json');
const __STermAppCommandsPage = require('../src/node/termapp/pages/STermAppCommandsPage');
const __STermAppAboutPage = require('../src/node/termapp/pages/STermAppAboutPage');
const __SBuildScssCommand = require('../src/node/build/SBuildScssCommand');
const __SPhpServerCommand = require('../src/node/server/SPhpServerCommand');
const __SExpressServerCommand = require('../src/node/server/SExpressServerCommand');
const __SBladePhpServerCommand = require('../src/node/server/SBladePhpServerCommand');
const __SBuildJsCommand = require('../src/node/build/SBuildJsCommand');
const __sugarConfig = require('../src/node/config/sugar');

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
    // 'server.php': {
    //   class: __SPhpServerCommand,
    //   argsObj: {},
    //   settings: {}
    // },
    'server.express': {
      class: __SExpressServerCommand,
      argsObj: {},
      settings: {
        run: true
      }
    },
    'server.bladePhp': {
      class: __SBladePhpServerCommand,
      argsObj: {},
      settings: {
        run: true
      }
    },
    'build.scss': {
      class: __SBuildScssCommand,
      argsObj: {},
      settings: {
        watch: __sugarConfig('build.scss.watch')
      }
    },
    'build.js': {
      class: __SBuildJsCommand,
      argsObj: {},
      settings: {
        watch: __sugarConfig('build.js.watch')
      }
    }
  },
  pages: {
    default: '/commands',
    urls: {
      '/commands/{?namespace}': {
        page: {
          class: __STermAppCommandsPage,
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
          class: __STermAppAboutPage,
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
