"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("./SProcess"));
// import __buildCommandLine from '../../shared/cli/buildCommandLine';
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
        const cliProcessSettings = (deepMerge_1.default(this.cliProcessSettings, settings));
        // build the command line
        // @WIP
        // const command = __buildCommandLine(this.command, params, {
        //   definition:
        //     cliProcessSettings.definition || this.paramsInterface?.definition || {},
        //   alias: false
        // });
        const command = 'ls -la';
        // @ts-ignore
        const pro = spawn_1.default(command, [], Object.assign({}, (this.cliProcessSettings.spawn || this.processSettings.spawn || {})));
        // @ts-ignore
        return pro;
    }
}
exports.default = SCliProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFtRDtBQUNuRCxzRUFBc0U7QUFDdEUsb0RBQThCO0FBQzlCLDhFQUF3RDtBQTRDeEQsTUFBTSxXQUFZLFNBQVEsa0JBQVU7SUEwQmxDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBZSxFQUFFLFdBQXFDLEVBQUU7UUFDbEUsS0FBSyxDQUNILEVBQUUsRUFDRixtQkFBVyxDQUNUO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDRixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQXZDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUE2QkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxPQUFPLENBQ0wsTUFBK0IsRUFDL0IsV0FBMEMsRUFBRTtRQUU1QyxNQUFNLGtCQUFrQixHQUF5QixDQUMvQyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FDL0MsQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixPQUFPO1FBQ1AsNkRBQTZEO1FBQzdELGdCQUFnQjtRQUNoQiwrRUFBK0U7UUFDL0UsaUJBQWlCO1FBQ2pCLE1BQU07UUFDTixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFFekIsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLGVBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxvQkFDMUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUN0RSxDQUFDO1FBRUgsYUFBYTtRQUNiLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=