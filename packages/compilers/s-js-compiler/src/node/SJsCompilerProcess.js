"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SJsCompiler_1 = __importDefault(require("./SJsCompiler"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_js_compiler_1 = require("@coffeekraken/s-js-compiler");
// @ts-ignore
class SJsCompilerProcess extends s_process_1.default {
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
    params: s_js_compiler_1.SJsCompilerInterface
};
exports.default = SJsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0pzQ29tcGlsZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXNFO0FBQ3RFLGdFQUFnRjtBQUNoRiw0RkFBc0U7QUFFdEUsK0RBQW1FO0FBcUJuRSxhQUFhO0FBQ2IsTUFBTSxrQkFBbUIsU0FBUSxtQkFBUTtJQStCdkM7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGFBQWtCLEVBQ2xCLFdBQWlELEVBQUU7UUFFbkQsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0UsZ0JBQWdCLEVBQUUsRUFBRTtTQUNyQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQWEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQWxERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHdCQUF3QjtRQUMxQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7SUFDaEQsQ0FBQztJQXdDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQ0wsTUFBMEIsRUFDMUIsV0FBaUQsRUFBRTtRQUVuRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7QUEzRU0sNkJBQVUsR0FBRztJQUNsQixNQUFNLEVBQUUsb0NBQW9CO0NBQzdCLENBQUM7QUE0RUosa0JBQWUsa0JBQWtCLENBQUMifQ==