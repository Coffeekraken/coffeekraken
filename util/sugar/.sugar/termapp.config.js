const __packageJson = require('../package.json');
const __packageRoot = require('../node/path/packageRoot');

module.exports = {
  rootDir: `${__packageRoot(__dirname)}/termapp`,
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
  pages: {
    default: '/builds/scss',
    urls: {
      '/builds/{what}': {
        type: 'process',
        menu: [
          {
            url: '/builds/scss',
            text: 'Builds / Scss'
          },
          {
            url: '/builds/js',
            text: 'Builds / JS'
          }
        ],
        ui: (parsedUrl) => {
          console.log('content', parsedUrl);
        },
        process: (parsedUrl) => {
          console.log('process');
        }
      }
    }
  }
};
