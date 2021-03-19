"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("./SProcess"));
const buildCommandLine_1 = __importDefault(require("../../shared/cli/buildCommandLine"));
const spawn_1 = __importDefault(require("./spawn"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFzRTtBQUN0RSx5RkFBbUU7QUFFbkUsb0RBQWtEO0FBQ2xELDhFQUF3RDtBQTRDeEQsTUFBTSxXQUFZLFNBQVEsa0JBQVU7SUEwQmxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBZSxFQUFFLFdBQXFDLEVBQUU7UUFDbEUsS0FBSyxDQUNILEVBQUUsRUFDRixtQkFBVyxDQUNUO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDRixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQXZDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUE2QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxPQUFPLENBQ0wsTUFBK0IsRUFDL0IsV0FBMEMsRUFBRTs7UUFFNUMsTUFBTSxrQkFBa0IsR0FBeUIsQ0FDL0MsbUJBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQy9DLENBQUM7UUFFRix5QkFBeUI7UUFDekIsTUFBTSxPQUFPLEdBQUcsMEJBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDdkQsVUFBVSxFQUNSLGtCQUFrQixDQUFDLFVBQVUsS0FBSSxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLFVBQVUsQ0FBQSxJQUFJLEVBQUU7WUFDekUsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQUcsZUFBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLG9CQUMxQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQ3RFLENBQUM7UUFFSCxhQUFhO1FBQ2IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==