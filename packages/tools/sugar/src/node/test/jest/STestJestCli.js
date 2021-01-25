"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SCli_1 = __importDefault(require("../../cli/SCli"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const STestJestProcess_1 = __importDefault(require("./STestJestProcess"));
module.exports = (_a = class STestJestCli extends SCli_1.default {
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
            super(args, deepMerge_1.default({
                id: 'cli.test.jest',
                name: 'Cli Test Jest'
            }, settings));
        }
    },
    /**
     * @name          command
     * @type          String
     * @static
     *
     * Store the command string
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.command = 'sugar test.jest %arguments',
    /**
     * @name          interface
     * @type          Object
     * @static
     *
     * Store the definition object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: STestJestInterface_1.default
    },
    /**
     * @name          processClass
     * @type          SProcess
     * @static
     *
     * Store the process class that will be used to run the test jest process
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.processClass = STestJestProcess_1.default,
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0Q2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Rlc3RKZXN0Q2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyx1RUFBaUQ7QUFDakQsd0ZBQXFFO0FBQ3JFLDBFQUFvRDtBQWtCcEQsdUJBQVMsTUFBTSxZQUFhLFNBQVEsY0FBTTtRQW9DeEM7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLElBQUksR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDbEMsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxlQUFlO2dCQUNuQixJQUFJLEVBQUUsZUFBZTthQUN0QixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUF4REM7Ozs7Ozs7O09BUUc7SUFDSSxVQUFPLEdBQUcsNEJBQTZCO0lBRTlDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSw0QkFBdUI7S0FDN0I7SUFFRjs7Ozs7Ozs7T0FRRztJQUNJLGVBQVksR0FBRywwQkFBbUI7UUF1QnpDIn0=