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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvdHlwZXNjcmlwdC9jb21waWxlL1NUc0NvbXBpbGVyUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRUFBOEM7QUFDOUMsZ0VBQTBDO0FBRTFDLHdHQUFrRjtBQXlCbEYsTUFBTSxrQkFBbUIsU0FBUSxrQkFBUTtJQVF2Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksYUFBa0IsRUFBRSxRQUFxQztRQUNuRSxLQUFLLENBQUMsYUFBYSxrQkFDakIsRUFBRSxFQUFFLG9CQUFvQixFQUN4QixJQUFJLEVBQUUscUJBQXFCLElBQ3hCLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxFQUNuQixDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUNMLE1BQTJCLEVBQzNCLFFBQXFDO1FBRXJDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztBQTdDTSw2QkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLG9DQUE0QjtLQUNwQztDQUNGLENBQUM7QUEyQ0osa0JBQWUsa0JBQWtCLENBQUMifQ==