"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SScssCompiler_1 = __importDefault(require("./SScssCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
// @ts-ignore
class SScssCompilerProcess extends SProcess_1.default {
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
            scssCompileProcess: {}
        }, {
            id: 'SScssCompilerProcess',
            name: 'Compile Scss Process'
        }, settings));
        this._scssCompiler = new SScssCompiler_1.default(initialParams, {});
    }
    /**
     * @name      scssCompileProcessSettings
     * @type      ISScssCompilerProcessSettings
     * @get
     *
     * Access the ```scssCompileProcess``` settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssCompileProcessSettings() {
        return this._settings.scssCompileProcessSettings;
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
        return this._scssCompiler.compile(params, settings);
    }
}
SScssCompilerProcess.interfaces = {
    initialParams: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    },
    params: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    }
};
exports.default = SScssCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlclByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zY3NzL2NvbXBpbGUvU1Njc3NDb21waWxlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsb0VBQThDO0FBQzlDLHVFQUFpRDtBQUVqRCw0R0FBc0Y7QUF3QnRGLGFBQWE7QUFDYixNQUFNLG9CQUFxQixTQUFRLGtCQUFRO0lBc0N6Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsYUFBa0IsRUFDbEIsV0FBbUQsRUFBRTtRQUVyRCxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxrQkFBa0IsRUFBRSxFQUFFO1NBQ3ZCLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsc0JBQXNCO1lBQzFCLElBQUksRUFBRSxzQkFBc0I7U0FDN0IsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUF0REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSwwQkFBMEI7UUFDNUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLDBCQUEwQixDQUFDO0lBQzFELENBQUM7SUE0Q0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQTRCLEVBQzVCLFdBQW1ELEVBQUU7UUFFckQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7QUFyRk0sK0JBQVUsR0FBRztJQUNsQixhQUFhLEVBQUU7UUFDYixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxzQ0FBOEI7S0FDdEM7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxzQ0FBOEI7S0FDdEM7Q0FDRixDQUFDO0FBK0VKLGtCQUFlLG9CQUFvQixDQUFDIn0=