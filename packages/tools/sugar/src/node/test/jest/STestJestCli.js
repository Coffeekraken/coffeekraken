"use strict";
const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __STestJestCliInterface = require('./interface/STestJestInterface');
const __STestJestProcess = require('./STestJestProcess');
/**
 * @name            STestJestCli
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SCli
 *
 * This class represent the tests jest cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestCli extends __SCli {
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
        super(args, __deepMerge({
            id: 'cli.test.jest',
            name: 'Cli Test Jest'
        }, settings));
    }
}
/**
 * @name          command
 * @type          String
 * @static
 *
 * Store the command string
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STestJestCli.command = 'sugar test.jest %arguments';
/**
 * @name          interface
 * @type          Object
 * @static
 *
 * Store the definition object
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STestJestCli.interface = __STestJestCliInterface;
/**
 * @name          processClass
 * @type          SProcess
 * @static
 *
 * Store the process class that will be used to run the test jest process
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STestJestCli.processClass = __STestJestProcess;
// module.exports = STestJestCli;
module.exports = __STestJestCliInterface.implements(STestJestCli);
