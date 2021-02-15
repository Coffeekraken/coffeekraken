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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlclByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2Nzc0NvbXBpbGVyUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUE4QztBQUM5QyxvRUFBOEM7QUFDOUMsdUVBQWlEO0FBRWpELDRHQUFzRjtBQXdCdEYsYUFBYTtBQUNiLE1BQU0sb0JBQXFCLFNBQVEsa0JBQVE7SUFzQ3pDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxhQUFrQixFQUNsQixXQUFtRCxFQUFFO1FBRXJELEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLGtCQUFrQixFQUFFLEVBQUU7U0FDdkIsRUFDRDtZQUNFLEVBQUUsRUFBRSxzQkFBc0I7WUFDMUIsSUFBSSxFQUFFLHNCQUFzQjtTQUM3QixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUJBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXRERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLDBCQUEwQjtRQUM1QixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsMEJBQTBCLENBQUM7SUFDMUQsQ0FBQztJQTRDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQ0wsTUFBNEIsRUFDNUIsV0FBbUQsRUFBRTtRQUVyRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQXJGTSwrQkFBVSxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLHNDQUE4QjtLQUN0QztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLHNDQUE4QjtLQUN0QztDQUNGLENBQUM7QUErRUosa0JBQWUsb0JBQW9CLENBQUMifQ==