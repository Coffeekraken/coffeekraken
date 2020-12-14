"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcessOutput_1 = __importDefault(require("../SProcessOutput"));
const SBlessedOutput_1 = __importDefault(require("../../../blessed/output/SBlessedOutput"));
/**
 * @name          SBlessedProcessOutput
 * @namespace     sugar.node.process.output
 * @type          Class
 * @extends       SProcessOutput
 * @wip
 *
 * This class represent the blessed based process output
 * to display nicely all the logs, errors, etc...
 *
 * @param       {Array<SProcess>|SProcess}      source      The sources (usually SProcess instances) that you want to display the output for
 * @param       {IBlessedProcessOutputSettings}     [settings={}]       Some settings to configure your output instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedProcessOutput from '@coffeekraken/sugar/node/process/output/SBlessedProcessOutput';
 * const myProcess = new MyCoolProcess();
 * const blessedOutput = new SBlessedProcessOutput(myProcess);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SBlessedProcessOutput extends SProcessOutput_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(source, settings) {
        super(source, settings);
        console.log(settings);
        this._output = new SBlessedOutput_1.default(Object.assign(Object.assign({}, this._settings), { sources: source }));
    }
    /**
     * @name            log
     * @type            Function
     *
     * This method allows you to log something
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...logs) {
        this._output.log(...logs);
    }
};
module.exports = Cls;
//# sourceMappingURL=module.js.map