"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const STsCompiler_1 = __importDefault(require("./STsCompiler"));
const STsCompilerParamsInterface_1 = __importDefault(require("./interface/STsCompilerParamsInterface"));
class STsCompilerProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams, Object.assign({ id: 'STsCompilerProcess', name: 'TS Compiler Process' }, (settings || {})));
        this._tsCompiler = new STsCompiler_1.default();
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
    process(params, settings) {
        const promise = this._tsCompiler.compile(params, settings);
        return promise;
    }
}
STsCompilerProcess.interfaces = {
    params: {
        apply: false,
        class: STsCompilerParamsInterface_1.default
    }
};
exports.default = STsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RzQ29tcGlsZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUE4QztBQUM5QyxnRUFBMEM7QUFFMUMsd0dBQWtGO0FBd0JsRixNQUFNLGtCQUFtQixTQUFRLGtCQUFRO0lBUXZDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxhQUFrQixFQUFFLFFBQXFDO1FBQ25FLEtBQUssQ0FBQyxhQUFhLGtCQUNqQixFQUFFLEVBQUUsb0JBQW9CLEVBQ3hCLElBQUksRUFBRSxxQkFBcUIsSUFDeEIsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEVBQ25CLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQ0wsTUFBMkIsRUFDM0IsUUFBcUM7UUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O0FBN0NNLDZCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsb0NBQTRCO0tBQ3BDO0NBQ0YsQ0FBQztBQTJDSixrQkFBZSxrQkFBa0IsQ0FBQyJ9