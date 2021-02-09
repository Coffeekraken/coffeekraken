"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SScssCompiler_1 = __importDefault(require("./SScssCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlclByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2Nzc0NvbXBpbGVyUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUE4QztBQUM5QyxvRUFBOEM7QUFDOUMsdUVBQWlEO0FBRWpELDRHQUFzRjtBQXdCdEYsTUFBTSxvQkFBcUIsU0FBUSxrQkFBUTtJQXNDekM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGFBQWtCLEVBQ2xCLFdBQW1ELEVBQUU7UUFFckQsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0Usa0JBQWtCLEVBQUUsRUFBRTtTQUN2QixFQUNEO1lBQ0UsRUFBRSxFQUFFLHNCQUFzQjtZQUMxQixJQUFJLEVBQUUsc0JBQXNCO1NBQzdCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx1QkFBZSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBdEREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksMEJBQTBCO1FBQzVCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQywwQkFBMEIsQ0FBQztJQUMxRCxDQUFDO0lBNENEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FDTCxNQUE0QixFQUM1QixXQUFtRCxFQUFFO1FBRXJELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O0FBckZNLCtCQUFVLEdBQUc7SUFDbEIsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsc0NBQThCO0tBQ3RDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsc0NBQThCO0tBQ3RDO0NBQ0YsQ0FBQztBQStFSixrQkFBZSxvQkFBb0IsQ0FBQyJ9