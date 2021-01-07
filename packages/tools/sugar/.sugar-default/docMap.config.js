const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  generate: {
    /**
     * @name            globs
     * @namespace       config.docMap.generate
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
    globs: [`src/*/*/*/*:/.*@namespace.*/gm`],

    /**
     * @name        output
     * @namespace   config.docMap.generate
     * @type         String
     * @default       ${__packageRoot()}/docMap.json
     *
     * Specify where you want to output the file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    output: `${__packageRoot()}/docMap.json`,

    /**
     * @name        exclude
     * @namespace   config.docMap.generate
     * @type        Object<String>
     *
     * Specify some regex to apply on different docblock and path properties
     * to exclude some files from the generated docMap json
     *
     * @example     js
     * {
     *    path: /(__wip__|__tests__)/gm,
     *    namespace: /#\{.*\}/gm
     * }
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exclude: {
      path: /(__wip__|__tests__)/gm,
      namespace: /#\{.*\}/gm
    }
  },

  find: {
    /**
     * @name                globs
     * @namespace           config.docMap.find
     * @type                    Array<String>
     *
     * Specify some globs to find the "docMap.json"
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    globs: [
      'docMap.json'
      // `${__packageRoot()}/node_modules/*/*/*/docMap.json`
    ],

    /**
     * @name        exclude
     * @namespace   config.docMap.find
     * @type        Object<String>
     *
     * Specify some regex to apply path properties
     * to exclude some files from the generated docMap json
     *
     * @example     js
     * {
     *    path: /(__wip__|__tests__)/gm,
     * }
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exclude: {
      path: /(__wip__|__tests__)/gm
    }
  }
};
