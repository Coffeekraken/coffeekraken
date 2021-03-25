"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("@coffeekraken/sugar/node/process/SProcess"));
const SJsCompiler_1 = __importDefault(require("./SJsCompiler"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_js_compiler_1 = require("@coffeekraken/s-js-compiler");
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
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
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
        class: s_js_compiler_1.SJsCompilerInterface
    },
    params: {
        apply: false,
        class: s_js_compiler_1.SJsCompilerInterface
    }
};
exports.default = SJsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0pzQ29tcGlsZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUZBRW1EO0FBQ25ELGdFQUFnRjtBQUNoRiw0RkFBc0U7QUFFdEUsK0RBQW1FO0FBcUJuRSxhQUFhO0FBQ2IsTUFBTSxrQkFBbUIsU0FBUSxrQkFBUTtJQXNDdkM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGFBQWtCLEVBQ2xCLFdBQWlELEVBQUU7UUFFbkQsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0UsZ0JBQWdCLEVBQUUsRUFBRTtTQUNyQixFQUNEO1lBQ0UsRUFBRSxFQUFFLG9CQUFvQjtZQUN4QixJQUFJLEVBQUUscUJBQXFCO1NBQzVCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBYSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBdEREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksd0JBQXdCO1FBQzFCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNoRCxDQUFDO0lBNENEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FDTCxNQUEwQixFQUMxQixXQUFpRCxFQUFFO1FBRW5ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztBQXRGTSw2QkFBVSxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLG9DQUFvQjtLQUM1QjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLG9DQUFvQjtLQUM1QjtDQUNGLENBQUM7QUFnRkosa0JBQWUsa0JBQWtCLENBQUMifQ==