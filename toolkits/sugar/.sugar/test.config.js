const __packageRoot = require('../src/node/path/packageRoot');

module.exports = {
  /**
   * @name            deamons
   * @namespace       config.test
   * @type            Object
   *
   * This object specify the settings concering the tests deamon launcher.
   * This deamon simply watch for files changes and launch the according test
   * if exists
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  deamons: {
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
       * @name            testfile
       * @namespace       config.test.deamons.node
       * @type            String
       *
       * This specify the test file to launch when an update has been detected. Here's the tokens you have available:
       * - %path: The path to the updated file directory
       * - %name: The updated file name without it's extension
       * !!! This will be used ONLY if no "@test    ./path/to/test.test.js" is present in the file docblock
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      testfile: `%path/__tests__/%name.test.js`,

      /**
       * @name            command
       * @namespace       config.test.deamons.node
       * @type            String
       *
       * The command to launch when detecting a file updated.
       * Here's the list of tokens you have access to here:
       * - %path: The path to the updated file directory
       * - %name: The updated file name without it's extension
       * - %testfile: The testfile path
       * - %arguments: The runtime arguments taken from the config files. For example, if the command is "jest ...", the arguments will be taken in the "jest.config.js" under the "cli" property or if not exists, directly from the root file
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      command: 'jest %testfile %arguments'
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
       * @name            testfile
       * @namespace       config.test.deamons.js
       * @type            String
       *
       * This specify the test file to launch when an update has been detected. Here's the tokens you have available:
       * - %path: The path to the updated file directory
       * - %name: The updated file name without it's extension
       * !!! This will be used ONLY if no "@test    ./path/to/test.test.js" is present in the file docblock
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      testfile: `%path/__tests__/%name.test.js`,

      /**
       * @name            command
       * @namespace       config.test.deamons.js
       * @type            String
       *
       * The command to launch when detecting a file updated.
       * Here's the list of tokens you have access to here:
       * - %path: The path to the updated file directory
       * - %name: The updated file name without it's extension
       * - %testfile: The testfile path
       * - %arguments: The runtime arguments taken from the config files. For example, if the command is "jest ...", the arguments will be taken in the "jest.config.js" under the "cli" property or if not exists, directly from the root file
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      command: 'jest %testfile %arguments'
    }
  }
};
