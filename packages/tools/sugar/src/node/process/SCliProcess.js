"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcess_1 = __importDefault(require("./SProcess"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const spawn_1 = __importDefault(require("./spawn"));
/**
 * @name          SCliProcess
 * @namespace     sugar.node.process
 * @Type          Class
 *
 * This class represent a subset of the SProcess class to make the use of command lines based process easy
 * and clean.
 *
 * @param       {String}        command         The command that will be used to run the process
 * @param       {ISCliProcessSettings}        [settings={}]       Some settings to configure your process
 *
 * @todo        Doc
 * @todo        Tests
 *
 * @example       js
 * import SCliProcess from '@coffeekraken/sugar/node/process/SCliProcess';
 * const pro = new SCliProcess('tsc {arguments} --watch');
 * await pro.run({
 *    some: 'arguments'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SCliProcess extends SProcess_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(command, settings = {}) {
        super(settings);
        // save the command
        this.command = command;
    }
    /**
     * @name        process
     * @type        Function
     * @async
     *
     * Override the ```SProcess.process``` method to allow the execution
     * of command line process
     *
     * @param     {Object}       params         The passed params in object format
     * @param     {ISCliProcessSettings}      [settings={}]     Some settings to override the ones passed in the constructor
     * @return    {Promise}            An Promise instance that will be resolved once the process is finished or in error
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        // build the command line
        const command = buildCommandLine_1.default(this.command, params, {
            definition: this.definition,
            alias: false
        });
        // @ts-ignore
        const pro = spawn_1.default(command, [], Object.assign({ ipc: false, stdio: settings.stdio }, (settings.spawnSettings || {})));
        // @ts-ignore
        return pro;
    }
};
module.exports = Cls;
//# sourceMappingURL=SCliProcess.js.map