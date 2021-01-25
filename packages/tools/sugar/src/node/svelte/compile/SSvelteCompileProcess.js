"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SSvelteCompiler_1 = __importDefault(require("./SSvelteCompiler"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./interface/SSvelteCompilerParamsInterface"));
class SSvelteCompileProcess extends SProcess_1.default {
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
            id: 'SSvelteCompileProcess',
            name: 'Compile Svelte Process'
        }, settings));
        this._svelteCompiler = new SSvelteCompiler_1.default(initialParams, {});
    }
    /**
     * @name      svelteCompileProcessSettings
     * @type      ISSvelteCompileProcessSettings
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
        this.processSettings.exitAtEnd = !params.watch;
        return this._svelteCompiler.compile(params, settings);
    }
}
SSvelteCompileProcess.interfaces = {
    initialParams: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    },
    params: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    }
};
module.exports = SSvelteCompileProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzRUFBOEM7QUFDOUMsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQUVqRCxnSEFBMEY7QUE0QjFGLE1BQU0scUJBQXNCLFNBQVEsa0JBQVE7SUFzQzFDOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxhQUFrQixFQUNsQixXQUFtRCxFQUFFO1FBRXJELEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLG9CQUFvQixFQUFFLEVBQUU7U0FDekIsRUFDRDtZQUNFLEVBQUUsRUFBRSx1QkFBdUI7WUFDM0IsSUFBSSxFQUFFLHdCQUF3QjtTQUMvQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseUJBQWlCLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUF0REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSw0QkFBNEI7UUFDOUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLG9CQUFvQixDQUFDO0lBQ3BELENBQUM7SUE0Q0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQThCLEVBQzlCLFdBQW1ELEVBQUU7UUFFckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O0FBdEZNLGdDQUFVLEdBQUc7SUFDbEIsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsd0NBQWdDO0tBQ3hDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsd0NBQWdDO0tBQ3hDO0NBQ0YsQ0FBQztBQWdGSixpQkFBUyxxQkFBcUIsQ0FBQyJ9