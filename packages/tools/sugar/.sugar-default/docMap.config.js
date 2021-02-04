const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  build: {
    /**
     * @name            globs
     * @namespace       config.docMap.build
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
    globs: [`src/**{5}/*:/.*@namespace.*/gm`],

    /**
     * @name        exclude
     * @namespace   config.docMap.build
     * @type        Object<String>
     *
     * Specify some regex to apply on different docblock and path properties
     * to exclude some files from the buildd docMap json
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

  save: {
    /**
     * @name        path
     * @namespace   config.docMap.save
     * @type         String
     * @default       [config.storage.rootDir]/docMap.json
     *
     * Specify where you want to path the file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    path: `[config.storage.rootDir]/docMap.json`
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
    globs: ['docMap.json', `node_modules/**{4}/docMap.json`],

    /**
     * @name        exclude
     * @namespace   config.docMap.find
     * @type        Object<String>
     *
     * Specify some regex to apply path properties
     * to exclude some files from the buildd docMap json
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
