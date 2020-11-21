"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name          SProcessOutput
 * @namespace     sugar.node.process
 * @type          Class
 *
 * This class represent the base one for all the process "output"
 * compatible setting.
 *
 * @param     {ISProcessOutputSettings}     [settings={}]       Some settings to configure your output
 *
 * @example       js
 * import SProcessOutput from '@coffeekraken/sugar/node/process/SProcessOutput';
 * class MyCoolProcessOutput extends SProcessOutput {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessOutput {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        this._settings = deepMerge_1.default({}, settings);
    }
}
exports.default = SProcessOutput;
