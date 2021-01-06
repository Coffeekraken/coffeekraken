const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            inputGlobs
   * @namespace       config.docMap
   * @type                Array<String>
   *
   * Specify the input globs to use in order to find files that will
   * be used for docmap generation.
   * The syntax is standard glob with an additional feature which is:
   * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  inputGlobs: [`src/*/*/*/*:/.*@namespace.*/gm`],

  /**
   * @name                findGlobs
   * @namespace           config.docMap
   * @type                    Array<String>
   *
   * Specify some globs to find the "docMap.json"
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  findGlobs: [
    'docMap.json'
    // `${__packageRoot()}/node_modules/*/*/*/docMap.json`
  ],

  /**
   * @name        output
   * @namespace   config.docMap
   * @type         String
   * @default       ${__packageRoot()}/docMap.json
   *
   * Specify where you want to output the file
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  output: `${__packageRoot()}/docMap.json`
};
