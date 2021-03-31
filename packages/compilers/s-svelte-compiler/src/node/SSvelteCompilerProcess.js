"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SSvelteCompiler_1 = __importDefault(require("./SSvelteCompiler"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SSvelteCompilerInterface_1 = __importDefault(require("./interface/SSvelteCompilerInterface"));
// @ts-ignore
class SSvelteCompilerProcess extends s_process_1.default {
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
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        return this._svelteCompiler.compile(params, settings);
    }
}
SSvelteCompilerProcess.interfaces = {
    params: {
        apply: false,
        class: SSvelteCompilerInterface_1.default
    }
};
exports.default = SSvelteCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21waWxlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3RUFBc0U7QUFDdEUsd0VBRzJCO0FBQzNCLDRGQUFzRTtBQUV0RSxvR0FBb0Y7QUFxQnBGLGFBQWE7QUFDYixNQUFNLHNCQUF1QixTQUFRLG1CQUFRO0lBa0MzQzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsYUFBa0IsRUFDbEIsV0FBcUQsRUFBRTtRQUV2RCxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxvQkFBb0IsRUFBRSxFQUFFO1NBQ3pCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx5QkFBaUIsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQWxERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLDRCQUE0QjtRQUM5QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7SUFDcEQsQ0FBQztJQXdDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQ0wsTUFBOEIsRUFDOUIsV0FBcUQsRUFBRTtRQUV2RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOztBQTdFTSxpQ0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLGtDQUFnQztLQUN4QztDQUNGLENBQUM7QUEyRUosa0JBQWUsc0JBQXNCLENBQUMifQ==