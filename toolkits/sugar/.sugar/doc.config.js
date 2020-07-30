const __packageRoot = require('../src/node/path/packageRoot');

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
  rootDir: `${__packageRoot()}/dist/doc`
};
