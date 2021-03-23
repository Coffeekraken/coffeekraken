"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("@coffeekraken/sugar/src/node/process/SProcess"));
const STsCompiler_1 = __importDefault(require("./STsCompiler"));
const STsCompilerInterface_1 = __importDefault(require("./interface/STsCompilerInterface"));
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
        super(initialParams, Object.assign(Object.assign({}, (settings || {})), { process: {
            // runAsChild: true
            } }));
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
        class: STsCompilerInterface_1.default
    }
};
exports.default = STsCompilerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RzQ29tcGlsZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDZGQUV1RDtBQUN2RCxnRUFBa0U7QUFFbEUsNEZBQXNFO0FBdUJ0RSxNQUFNLGtCQUFtQixTQUFRLGtCQUFRO0lBUXZDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxhQUFrQixFQUFFLFFBQXFDO1FBQ25FLEtBQUssQ0FBQyxhQUFhLGtDQUNkLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxLQUNuQixPQUFPLEVBQUU7WUFDUCxtQkFBbUI7YUFDcEIsSUFDRCxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQTJCLEVBQzNCLFFBQXFDO1FBRXJDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztBQTlDTSw2QkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLDhCQUFzQjtLQUM5QjtDQUNGLENBQUM7QUE0Q0osa0JBQWUsa0JBQWtCLENBQUMifQ==