"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SScssCompiler_1 = __importDefault(require("./SScssCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
class SScssCompileProcess extends SProcess_1.default {
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
            id: 'SScssCompileProcess',
            name: 'Compile Scss Process'
        }, settings));
        this._scssCompiler = new SScssCompiler_1.default(initialParams, {});
    }
    /**
     * @name      scssCompileProcessSettings
     * @type      ISScssCompileProcessSettings
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
        this.processSettings.exitAtEnd = !params.watch;
        return this._scssCompiler.compile(params, settings);
    }
}
SScssCompileProcess.interfaces = {
    initialParams: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    },
    params: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    }
};
module.exports = SScssCompileProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3NzQ29tcGlsZVByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNFQUE4QztBQUM5QyxvRUFBOEM7QUFDOUMsdUVBQWlEO0FBRWpELDRHQUFzRjtBQTRCdEYsTUFBTSxtQkFBb0IsU0FBUSxrQkFBUTtJQXNDeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGFBQWtCLEVBQ2xCLFdBQWlELEVBQUU7UUFFbkQsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0Usa0JBQWtCLEVBQUUsRUFBRTtTQUN2QixFQUNEO1lBQ0UsRUFBRSxFQUFFLHFCQUFxQjtZQUN6QixJQUFJLEVBQUUsc0JBQXNCO1NBQzdCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx1QkFBZSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBdEREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksMEJBQTBCO1FBQzVCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQywwQkFBMEIsQ0FBQztJQUMxRCxDQUFDO0lBNENEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FDTCxNQUE0QixFQUM1QixXQUFpRCxFQUFFO1FBRW5ELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQXRGTSw4QkFBVSxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLHNDQUE4QjtLQUN0QztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLHNDQUE4QjtLQUN0QztDQUNGLENBQUM7QUFnRkosaUJBQVMsbUJBQW1CLENBQUMifQ==