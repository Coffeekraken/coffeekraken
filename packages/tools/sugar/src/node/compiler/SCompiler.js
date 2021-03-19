"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const SEventEmitter_1 = __importDefault(require("../../shared/event/SEventEmitter"));
class SCompiler extends SEventEmitter_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(deepMerge_1.default({
            compiler: {}
        }, settings || {}));
        this.initialParams = Object.assign({}, initialParams);
    }
    /**
     * @name            compile
     * @type            Function
     *
     * This method is the one you have to call when you want to launch a compilation process.
     * It will call the ```_compile``` one which MUST return an instance of the SPromise class.
     *
     * @param           {String|Array<String>}          input           Specify the input to use for compilation
     * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    compile(params, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        // @weird:ts-compilation-issue
        params = this.applyInterface('params', params);
        // @ts-ignore
        const promise = this._compile(params, settings);
        // @weird:ts-compilation-issue
        this.pipe(promise);
        return promise;
    }
}
exports.default = SCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELHFGQUErRDtBQTJDL0QsTUFBTSxTQUFVLFNBQVEsdUJBQWU7SUFZckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxhQUFrQixFQUFFLFFBQWdDO1FBQzlELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLE1BQVcsRUFBRSxXQUFnQixFQUFFO1FBQ3JDLFFBQVEsR0FBRyxtQkFBVyxDQUFPLElBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFeEQsOEJBQThCO1FBQzlCLE1BQU0sR0FBUyxJQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV0RCxhQUFhO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsOEJBQThCO1FBQ3hCLElBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsa0JBQWUsU0FBUyxDQUFDIn0=