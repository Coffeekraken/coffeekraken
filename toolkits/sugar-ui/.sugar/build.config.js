const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');

module.exports = {
  docMap: {
    input: `${__packageRoot(__dirname)}/../sugar/src/**/*:@namespace`,
    output: `${__packageRoot(__dirname)}/../sugar/docMap.json`
  }
};
