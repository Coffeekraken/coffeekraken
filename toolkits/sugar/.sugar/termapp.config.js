const __packageJson = require('../package.json');
const __packageRoot = require('../node/path/packageRoot');

module.exports = {
  rootDir: `${__packageRoot(__dirname)}`,
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
  pages: {}
};
