"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
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
        // @todo    apply the params interface on the params
        const interfaceRes = this.applyInterface('params', params);
        if (interfaceRes.hasIssues()) {
            console.log(interfaceRes.toString());
        }
        // @ts-ignore
        const promise = this._compile(params, settings);
        this.pipe(promise);
        return promise;
    }
}
exports.default = SCompiler;
//# sourceMappingURL=SCompiler.js.map