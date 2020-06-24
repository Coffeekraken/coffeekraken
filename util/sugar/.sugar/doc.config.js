const __packageRoot = require('../src/node/path/packageRoot');
const __isInPackage = require('../node/path/isInPackage');

function isInSugarPackage() {
  return __isInPackage('@coffeekraken/sugar');
}

module.exports = {
  /**
   * @name            rootDir
   * @namespace       config.doc
   * @type            String
   * @default          ${__packageRoot(process.cwd())}/dist/doc
   *
   * Specify the root doc directory
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: isInSugarPackage()
    ? `${__packageRoot()}/public/dist/doc`
    : `${__packageRoot()}/dist/doc`
};
