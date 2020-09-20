const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            node
   * @namespace       config.test.deamons
   * @type             Object
   *
   * This object specify how to watch and run the updated node files
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  node: {
    /**
     * @name            input
     * @namespace       config.test.deamons.node
     * @type            String
     *
     * This specify the glob patterns that point on the files to watch.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/node/**/!(__tests__)/!(*.test).js`,

    /**
     * @name            command
     * @namespace       config.test.deamons.node
     * @type            String
     *
     * The command to launch when detecting a file updated.
     * Here's the list of tokens you have access to here:
     * - %path: The path to the updated file directory
     * - %name: The updated file name without it's extension
     *      *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    command: 'jest %path/__tests__/%name.test.js --passWithNoTests'
  },

  /**
   * @name            js
   * @namespace       config.test.deamons
   * @type             Object
   *
   * This object specify how to watch and run the updated js files
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  js: {
    /**
     * @name            input
     * @namespace       config.test.deamons.js
     * @type            String
     *
     * This specify the glob patterns that point on the files to watch.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    input: `${__packageRoot()}/src/js/**/!(__tests__)/!(*.test).js`,

    /**
     * @name            command
     * @namespace       config.test.deamons.js
     * @type            String
     *
     * The command to launch when detecting a file updated.
     * Here's the list of tokens you have access to here:
     * - %path: The path to the updated file directory
     * - %name: The updated file name without it's extension
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    command: 'jest %path/__tests__/%name.test.js --passWithNoTests'
  }
};
