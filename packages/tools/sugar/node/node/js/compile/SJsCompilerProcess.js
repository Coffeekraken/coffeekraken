"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SJsCompiler_1 = __importDefault(require("./SJsCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SJsCompilerParamsInterface_1 = __importDefault(require("./interface/SJsCompilerParamsInterface"));
// @ts-ignore
class SJsCompilerProcess extends SProcess_1.default {
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
            jsCompileProcess: {}
        }, {
            id: 'SJsCompilerProcess',
            name: 'Js Compiler Process'
        }, settings));
        this._jsCompiler = new SJsCompiler_1.default(initialParams, {});
    }
    /**
     * @name      jsCompileProcessSettings
     * @type      ISJsCompilerProcessSettings
     * @get
     *
     * Access the ```scssCompileProcess``` settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsCompileProcessSettings() {
        return this._settings.jsCompileProcess;
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
        const promise = this._jsCompiler.compile(params, settings);
        return promise;
    }
}
SJsCompilerProcess.interfaces = {
    initialParams: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    },
    params: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    }
};
exports.default = SJsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvanMvY29tcGlsZS9TSnNDb21waWxlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsZ0VBQTBDO0FBQzFDLHVFQUFpRDtBQUVqRCx3R0FBa0Y7QUF3QmxGLGFBQWE7QUFDYixNQUFNLGtCQUFtQixTQUFRLGtCQUFRO0lBc0N2Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsYUFBa0IsRUFDbEIsV0FBaUQsRUFBRTtRQUVuRCxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxnQkFBZ0IsRUFBRSxFQUFFO1NBQ3JCLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsb0JBQW9CO1lBQ3hCLElBQUksRUFBRSxxQkFBcUI7U0FDNUIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFhLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUF0REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx3QkFBd0I7UUFDMUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGdCQUFnQixDQUFDO0lBQ2hELENBQUM7SUE0Q0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQTBCLEVBQzFCLFdBQWlELEVBQUU7UUFFbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O0FBdEZNLDZCQUFVLEdBQUc7SUFDbEIsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsb0NBQTRCO0tBQ3BDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsb0NBQTRCO0tBQ3BDO0NBQ0YsQ0FBQztBQWdGSixrQkFBZSxrQkFBa0IsQ0FBQyJ9