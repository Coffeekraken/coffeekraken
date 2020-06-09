const __packageJson = require('../package.json');
const __STermAppCommandsPage = require('../src/node/termapp/pages/STermAppCommandsPage');
const __STermAppAboutPage = require('../src/node/termapp/pages/STermAppAboutPage');
const __SBuildScssCommand = require('../src/node/build/scss/SBuildScssCommand');
const __SBuildDocCommand = require('../src/node/build/doc/SBuildDocCommand');
const __SBuildViewsCommand = require('../src/node/build/views/SBuildViewsCommand');
const __SFrontendServerCommand = require('../src/node/server/frontend/SFrontendServerCommand');
const __SBladePhpServerCommand = require('../src/node/server/bladePhp/SBladePhpServerCommand');
const __SBuildJsCommand = require('../src/node/build/js/SBuildJsCommand');
const __SBuildConfigCommand = require('../src/node/build/config/SBuildConfigCommand');
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
    // 'server.express': {
    //   class: __SExpressServerCommand,
    //   argsObj: {},
    //   settings: {
    //     run: true
    //   }
    // },
    'server.frontend': {
      class: __SFrontendServerCommand,
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
    'build.config': {
      class: __SBuildConfigCommand,
      argsObj: {},
      settings: {
        watch: __sugarConfig('build.config.watch')
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
    },
    'build.views': {
      class: __SBuildViewsCommand,
      argsObj: {},
      settings: {
        watch: __sugarConfig('build.views.watch')
      }
    },
    'build.doc': {
      class: __SBuildDocCommand,
      argsObj: {},
      settings: {
        watch: __sugarConfig('build.doc.watch')
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
