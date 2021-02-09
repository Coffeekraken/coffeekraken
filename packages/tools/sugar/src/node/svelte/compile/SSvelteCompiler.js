"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SSvelteFile_1 = __importDefault(require("../SSvelteFile"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const glob_1 = __importDefault(require("../../is/glob"));
const glob_2 = __importDefault(require("glob"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./interface/SSvelteCompilerParamsInterface"));
/**
 * @name                SSvelteCompiler
 * @namespace           sugar.node.svelte
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "svelte" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISSvelteCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSvelteCompiler from '@coffeekraken/sugar/node/scss/compile/SSvelteCompiler';
 * const compiler = new SSvelteCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.svelte');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompiler extends SCompiler_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams, deepMerge_1.default({
            svelteCompiler: {}
        }, settings || {}));
        // prod
        if (this.svelteCompilerSettings.prod) {
            this.svelteCompilerSettings.style = 'compressed';
            this.svelteCompilerSettings.minify = true;
            this.svelteCompilerSettings.stripComments = true;
        }
    }
    /**
     * @name      svelteCompilerSettings
     * @type      ISSvelteCompilerSettings
     * @get
     *
     * Access to the svelte compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteCompilerSettings() {
        return this._settings.svelteCompiler;
    }
    /**
     * @name              _compile
     * @type              Function
     * @async
     *
     * This method is the main one that allows you to actually compile the
     * code you pass either inline, either a file path.
     *
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings = {}) {
        return new SPromise_1.default(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.svelteCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            const resultsObj = {};
            let filesPaths = [];
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (glob_1.default(inputStr)) {
                    filesPaths = [...filesPaths, ...glob_2.default.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SSvelteFile_1.default(filePath, {
                    svelteFile: {
                        compile: settings
                    }
                });
                pipe(file);
                const resPromise = file.compile(params, Object.assign({}, settings));
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // resolve with the compilation result
            if (!params.watch) {
                resolve({
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
            else {
                emit('files', {
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
        }));
    }
}
SSvelteCompiler.interfaces = {
    params: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    }
};
exports.default = SSvelteCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHVFQUFpRDtBQUdqRCx5RUFBbUU7QUFDbkUsaUVBQTJDO0FBQzNDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFDN0MseURBQXFDO0FBQ3JDLGdEQUEwQjtBQUUxQixnSEFBMEY7QUF1QjFGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxtQkFBVztJQXNCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUE4QyxFQUM5QyxRQUFzQztRQUV0QyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxjQUFjLEVBQUUsRUFBRTtTQUNuQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztZQUNqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNsRDtJQUNILENBQUM7SUE1Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBa0NEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNOLE1BQThCLEVBQzlCLFdBQThDLEVBQUU7UUFFaEQsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7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