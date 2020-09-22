const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __packageRoot = require('../../path/packageRoot');
const __deepMerge = require('../../object/deepMerge');
const __SBuildDocMapInterface = require('./interface/SBuildDocMapInterface');

/**
 * @name            SBuildDocMapCli
 * @namespace       sugar.node.build.docMap
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build documentation cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildDocMapCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.docMap %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildDocMapInterface;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'build.docMap.cli',
          name: 'Build docMap.json'
        },
        settings
      )
    );
  }
};
