// @ts-nocheck

import __SCli from '../../cli/SCli';
import __deepMerge from '../../object/deepMerge';
import __STestJestCliInterface from './interface/STestJestInterface';
import __STestJestProcess from './STestJestProcess';

/**
 * @name            STestJestCli
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SCli
 * @status              wip
 *
 * This class represent the tests jest cli
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class STestJestCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar test.jest %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interfaces = {
    this: __STestJestCliInterface
  };

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the test jest process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __STestJestProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(args = {}, settings = {}) {
    super(
      args,
      __deepMerge(
        {
          id: 'cli.test.jest',
          name: 'Cli Test Jest'
        },
        settings
      )
    );
  }
};
