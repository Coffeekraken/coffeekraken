"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSvelteCompiler_1 = __importDefault(require("./SSvelteCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./interface/SSvelteCompilerParamsInterface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21waWxlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQUVqRCxnSEFBMEY7QUF3QjFGLE1BQU0sc0JBQXVCLFNBQVEsa0JBQVE7SUFzQzNDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxhQUFrQixFQUNsQixXQUFxRCxFQUFFO1FBRXZELEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLG9CQUFvQixFQUFFLEVBQUU7U0FDekIsRUFDRDtZQUNFLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsSUFBSSxFQUFFLHlCQUF5QjtTQUNoQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseUJBQWlCLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUF0REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSw0QkFBNEI7UUFDOUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLG9CQUFvQixDQUFDO0lBQ3BELENBQUM7SUE0Q0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQThCLEVBQzlCLFdBQXFELEVBQUU7UUFFdkQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7QUFyRk0saUNBQVUsR0FBRztJQUNsQixhQUFhLEVBQUU7UUFDYixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSx3Q0FBZ0M7S0FDeEM7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSx3Q0FBZ0M7S0FDeEM7Q0FDRixDQUFDO0FBK0VKLGtCQUFlLHNCQUFzQixDQUFDIn0=