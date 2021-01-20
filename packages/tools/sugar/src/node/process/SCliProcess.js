"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("./SProcess"));
const buildCommandLine_1 = __importDefault(require("../cli/buildCommandLine"));
const spawn_1 = __importDefault(require("./spawn"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
class SCliProcess extends SProcess_1.default {
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
        super(deepMerge_1.default({
            cliProcess: {}
        }, settings));
        // save the command
        this.command = command;
    }
    /**
     * @name      cliProcessSettings
     * @type      ISCliProcessSettings
     * @get
     *
     * Get the cliProcessSettings
     *
     * @since     2.0.0
     *
     */
    get cliProcessSettings() {
        return this._settings.cliProcess;
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
        var _a;
        const cliProcessSettings = (deepMerge_1.default(this.cliProcessSettings, settings));
        // build the command line
        const command = buildCommandLine_1.default(this.command, params, {
            definition: (_a = this.paramsInterface) === null || _a === void 0 ? void 0 : _a.definition,
            alias: false
        });
        // @ts-ignore
        const pro = spawn_1.default(command, [], Object.assign({ ipc: false }, (this.processSettings.spawnSettings || {})));
        // @ts-ignore
        return pro;
    }
}
exports.default = SCliProcess;
//# sourceMappingURL=SCliProcess.js.map