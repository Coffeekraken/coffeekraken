"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcessStdio_1 = __importDefault(require("../SProcessStdio"));
const SBlessedStdio_1 = __importDefault(require("../../../blessed/stdio/SBlessedStdio"));
/**
 * @name          SBlessedProcessStdio
 * @namespace     sugar.node.process.Stdio
 * @type          Class
 * @extends       SProcessStdio
 * @wip
 *
 * This class represent the blessed based process Stdio
 * to display nicely all the logs, errors, etc...
 *
 * @param       {Array<SProcess>|SProcess}      source      The sources (usually SProcess instances) that you want to display the Stdio for
 * @param       {IBlessedProcessStdioSettings}     [settings={}]       Some settings to configure your Stdio instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedProcessStdio from '@coffeekraken/sugar/node/process/stdio/SBlessedProcessStdio';
 * const myProcess = new MyCoolProcess();
 * const blessedStdio = new SBlessedProcessStdio(myProcess);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SBlessedProcessStdio extends SProcessStdio_1.default {
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
        this._Stdio = new SBlessedStdio_1.default(source, Object.assign(Object.assign({}, this._settings), { attach: true }));
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
        this._Stdio.log(...logs);
    }
};
module.exports = Cls;
//# sourceMappingURL=SBlessedProcessStdio.js.map