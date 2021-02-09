"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SCli_1 = __importDefault(require("../../cli/SCli"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const STestJestProcess_1 = __importDefault(require("./STestJestProcess"));
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
class STestJestCli extends SCli_1.default {
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
}
exports.default = STestJestCli;
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
STestJestCli.interfaces = {
    this: STestJestInterface_1.default
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
STestJestCli.processClass = STestJestProcess_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0Q2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Rlc3RKZXN0Q2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyx1RUFBaUQ7QUFDakQsd0ZBQXFFO0FBQ3JFLDBFQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFxQixZQUFhLFNBQVEsY0FBTTtJQW9DOUM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLElBQUksR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDbEMsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGVBQWU7WUFDbkIsSUFBSSxFQUFFLGVBQWU7U0FDdEIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUF4REgsK0JBeURDO0FBeERDOzs7Ozs7OztHQVFHO0FBQ0ksb0JBQU8sR0FBRyw0QkFBNEIsQ0FBQztBQUU5Qzs7Ozs7Ozs7R0FRRztBQUNJLHVCQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLDRCQUF1QjtDQUM5QixDQUFDO0FBRUY7Ozs7Ozs7O0dBUUc7QUFDSSx5QkFBWSxHQUFHLDBCQUFrQixDQUFDIn0=