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
    constructor(settings) {
        super(Object.assign({ id: 'STsCompileProcess', name: 'Compile TS Process' }, (settings || {})));
        this._tsCompiler = new STsCompiler_1.default({});
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
        this.processSettings.exitAtEnd = !params.watch;
        const promise = this._tsCompiler.compile(params, settings);
        return promise;
    }
}
STsCompilerProcess.interfaces = {
    // initialParams: {
    //   apply: false,
    //   class: __SSvelteCompilerParamsInterface
    // },
    params: {
        apply: false,
        class: STsCompilerParamsInterface_1.default
    }
};
exports.default = STsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZVByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRUFBOEM7QUFDOUMsZ0VBQTBDO0FBRTFDLHdHQUFrRjtBQTRCbEYsTUFBTSxrQkFBbUIsU0FBUSxrQkFBUTtJQVl2Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBcUM7UUFDL0MsS0FBSyxpQkFDSCxFQUFFLEVBQUUsbUJBQW1CLEVBQ3ZCLElBQUksRUFBRSxvQkFBb0IsSUFDdkIsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEVBQ25CLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQTJCLEVBQzNCLFFBQXFDO1FBRXJDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7QUFsRE0sNkJBQVUsR0FBRztJQUNsQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLDRDQUE0QztJQUM1QyxLQUFLO0lBQ0wsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsb0NBQTRCO0tBQ3BDO0NBQ0YsQ0FBQztBQTRDSixrQkFBZSxrQkFBa0IsQ0FBQyJ9