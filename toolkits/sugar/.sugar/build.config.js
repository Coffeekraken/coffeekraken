const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');

module.exports = {
  js: {
    input: `${__packageRoot()}/src/js/**/*.js`,
    outputDir: `${__packageRoot()}/js`,
    watch: `${__packageRoot()}/src/js/**/*.js`,
    map: true,
    pack: false,
    prod: false
  }
};
