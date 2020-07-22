const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');

module.exports = {
  js: {
    pack: [`${__packageRoot()}/src/js/index.js`],
    watch: {
      pattern: `${__packageRoot()}/src/**/*`
    }
  }
};
