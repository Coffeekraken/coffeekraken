const __SCli = require('../cli/SCli');
const __packageRoot = require('../path/packageRoot');

/**
 * @name            STermAppCli
 * @namespace           node.termapp
 * @type            Class
 * @extends         SCli
 *
 * This class represent the STermApp cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STermAppCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar termapp.run [arguments]';

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    name: {
      type: 'String',
      alias: 'n',
      description: 'STerm application name',
      default: 'termapp',
      level: 1
    },
    configFolderPath: {
      type: 'String',
      alias: 'c',
      description: 'STerm configuration folder',
      default: `${__packageRoot(process.cwd())}`,
      level: 1
    }
  };

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
    super(settings);
  }
};
