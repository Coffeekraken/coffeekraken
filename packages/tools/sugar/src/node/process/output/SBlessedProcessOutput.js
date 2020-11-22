"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SProcessOutput_1 = require("../SProcessOutput");
const SBlessedOutput_1 = require("../../blessed/SBlessedOutput");
/**
 * @name          SBlessedProcessOutput
 * @namespace     sugar.node.process.output
 * @type          Class
 * @extends       SProcessOutput
 *
 * This class represent the blessed based process output
 * to display nicely all the logs, errors, etc...
 *
 * @param       {Array<SProcess>|SProcess}      source      The sources (usually SProcess instances) that you want to display the output for
 * @param       {IBlessedProcessOutputSettings}     [settings={}]       Some settings to configure your output instance
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
        new SBlessedOutput_1.default(this._sources, this._settings);
    }
};
exports.default = Cls;
