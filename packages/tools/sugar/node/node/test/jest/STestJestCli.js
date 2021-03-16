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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0Q2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvdGVzdC9qZXN0L1NUZXN0SmVzdENsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwwREFBb0M7QUFDcEMsdUVBQWlEO0FBQ2pELHdGQUFxRTtBQUNyRSwwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBcUIsWUFBYSxTQUFRLGNBQU07SUFvQzlDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxJQUFJLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2xDLEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxlQUFlO1lBQ25CLElBQUksRUFBRSxlQUFlO1NBQ3RCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBeERILCtCQXlEQztBQXhEQzs7Ozs7Ozs7R0FRRztBQUNJLG9CQUFPLEdBQUcsNEJBQTRCLENBQUM7QUFFOUM7Ozs7Ozs7O0dBUUc7QUFDSSx1QkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSw0QkFBdUI7Q0FDOUIsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBQ0kseUJBQVksR0FBRywwQkFBa0IsQ0FBQyJ9