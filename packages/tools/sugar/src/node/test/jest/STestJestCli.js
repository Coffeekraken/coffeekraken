"use strict";
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
 *
 * This class represent the tests jest cli
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
STestJestCli.interface = STestJestInterface_1.default;
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
