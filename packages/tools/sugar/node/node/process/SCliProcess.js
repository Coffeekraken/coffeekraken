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
        super({}, deepMerge_1.default({
            process: {
                runAsChild: false
            },
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
            definition: cliProcessSettings.definition || ((_a = this.paramsInterface) === null || _a === void 0 ? void 0 : _a.definition) || {},
            alias: false
        });
        // @ts-ignore
        const pro = spawn_1.default(command, [], Object.assign({}, (this.cliProcessSettings.spawn || this.processSettings.spawn || {})));
        // @ts-ignore
        return pro;
    }
}
exports.default = SCliProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wcm9jZXNzL1NDbGlQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLCtFQUF5RDtBQUV6RCxvREFBOEI7QUFDOUIsb0VBQThDO0FBK0M5QyxNQUFNLFdBQVksU0FBUSxrQkFBVTtJQTBCbEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFlLEVBQUUsV0FBcUMsRUFBRTtRQUNsRSxLQUFLLENBQ0gsRUFBRSxFQUNGLG1CQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLEtBQUs7YUFDbEI7WUFDRCxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNGLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTZCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE9BQU8sQ0FDTCxNQUErQixFQUMvQixXQUEwQyxFQUFFOztRQUU1QyxNQUFNLGtCQUFrQixHQUF5QixDQUMvQyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FDL0MsQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixNQUFNLE9BQU8sR0FBRywwQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUN2RCxVQUFVLEVBQ1Isa0JBQWtCLENBQUMsVUFBVSxLQUFJLE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsVUFBVSxDQUFBLElBQUksRUFBRTtZQUN6RSxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDYixNQUFNLEdBQUcsR0FBRyxlQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsb0JBQzFCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFDdEUsQ0FBQztRQUVILGFBQWE7UUFDYixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9