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
const chokidar_1 = __importDefault(require("chokidar"));
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
            let svelteFiles = {};
            if (params.watch) {
                chokidar_1.default.watch(input).on('change', (path) => __awaiter(this, void 0, void 0, function* () {
                    let file = svelteFiles[path];
                    if (!file) {
                        file = new SSvelteFile_1.default(path, {
                            svelteFile: {
                                compile: settings
                            }
                        });
                        svelteFiles[path] = file;
                        pipe(file);
                    }
                    // compile the file
                    yield file.compile(Object.assign(Object.assign({}, params), { watch: false }), settings);
                    emit('log', {
                        type: 'separator'
                    });
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }));
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
            else {
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
                filesPaths.forEach((path) => {
                    const file = new SSvelteFile_1.default(path, {
                        svelteFile: {
                            compile: settings
                        }
                    });
                    svelteFiles[file.path] = file;
                    pipe(file);
                });
                const resultsObj = {};
                for (let i = 0; i < Object.keys(svelteFiles).length; i++) {
                    const file = svelteFiles[Object.keys(svelteFiles)[i]];
                    // @todo    {Clean}     remove the ts-ignore
                    // @ts-ignore
                    const resPromise = file.compile(Object.assign(Object.assign({}, params), { watch: false }), settings);
                    const res = yield resPromise;
                    resultsObj[file.path] = res.js;
                }
                let aggregateStrArray = [];
                Object.keys(resultsObj).forEach((path) => {
                    const jsRes = resultsObj[path];
                    aggregateStrArray.push(jsRes);
                });
                const startTime = Date.now();
                resolve({
                    files: resultsObj,
                    js: aggregateStrArray.join('\n'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHVFQUFpRDtBQUdqRCx5RUFBbUU7QUFDbkUsaUVBQTJDO0FBQzNDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFDN0MseURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQix3REFBa0M7QUFFbEMsZ0hBQTBGO0FBdUIxRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGVBQWdCLFNBQVEsbUJBQVc7SUFzQnZDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBOEMsRUFDOUMsUUFBc0M7UUFFdEMsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFLEVBQUU7U0FDbkIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7WUFDakQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDMUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBNUNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3hCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxjQUFjLENBQUM7SUFDOUMsQ0FBQztJQWtDRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE4QixFQUM5QixXQUE4QyxFQUFFO1FBRWhELE9BQU8sSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVB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