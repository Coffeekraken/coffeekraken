const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SFsDeamonProcess = require('./SFsDeamonProcess');
const __SFsDeamonInterface = require('./interface/SFsDeamonInterface');

/**
 * @name            SFsDeamonCli
 * @namespace           node.deamon.fs
 * @type            Class
 * @extends         SCli
 *
 * This class represent the watch filesystem deamon Cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsDeamonCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar deamon.fs %arguments';

  /**
   * @name          interface
   * @type          String
   * @static
   *
   * Store the cli definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SFsDeamonInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the fs deamon
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SFsDeamonProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(args, settings = {}) {
    super(
      args,
      __deepMerge(
        {
          id: 'deamon.fs',
          name: 'Filesystem Deamon',
          childProcess: {
            triggerParent: true
          }
        },
        settings
      )
    );
  }
};
