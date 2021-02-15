"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSvelteCompiler_1 = __importDefault(require("./SSvelteCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./interface/SSvelteCompilerParamsInterface"));
// @ts-ignore
class SSvelteCompilerProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings = {}) {
        super(initialParams, deepMerge_1.default({
            svelteCompileProcess: {}
        }, {
            id: 'SSvelteCompilerProcess',
            name: 'Svelte Compiler Process'
        }, settings));
        this._svelteCompiler = new SSvelteCompiler_1.default(initialParams, {});
    }
    /**
     * @name      svelteCompileProcessSettings
     * @type      ISSvelteCompilerProcessSettings
     * @get
     *
     * Access the ```scssCompileProcess``` settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteCompileProcessSettings() {
        return this._settings.svelteCompileProcess;
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        return this._svelteCompiler.compile(params, settings);
    }
}
SSvelteCompilerProcess.interfaces = {
    initialParams: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    },
    params: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    }
};
exports.default = SSvelteCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21waWxlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQUVqRCxnSEFBMEY7QUF3QjFGLGFBQWE7QUFDYixNQUFNLHNCQUF1QixTQUFRLGtCQUFRO0lBc0MzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsYUFBa0IsRUFDbEIsV0FBcUQsRUFBRTtRQUV2RCxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxvQkFBb0IsRUFBRSxFQUFFO1NBQ3pCLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsd0JBQXdCO1lBQzVCLElBQUksRUFBRSx5QkFBeUI7U0FDaEMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHlCQUFpQixDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBdEREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksNEJBQTRCO1FBQzlCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNwRCxDQUFDO0lBNENEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FDTCxNQUE4QixFQUM5QixXQUFxRCxFQUFFO1FBRXZELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O0FBckZNLGlDQUFVLEdBQUc7SUFDbEIsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsd0NBQWdDO0tBQ3hDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsd0NBQWdDO0tBQ3hDO0NBQ0YsQ0FBQztBQStFSixrQkFBZSxzQkFBc0IsQ0FBQyJ9