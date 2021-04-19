"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
class SCompiler extends s_event_emitter_1.default {
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
    compile(params = {}, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLG9GQUE0RDtBQTJDNUQsTUFBTSxTQUFVLFNBQVEseUJBQWU7SUFZckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxhQUFrQixFQUFFLFFBQWdDO1FBQzlELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLFNBQWMsRUFBRSxFQUFFLFdBQWdCLEVBQUU7UUFDMUMsUUFBUSxHQUFHLG1CQUFXLENBQU8sSUFBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV4RCw4QkFBOEI7UUFDOUIsTUFBTSxHQUFTLElBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXRELGFBQWE7UUFDYixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCw4QkFBOEI7UUFDeEIsSUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==