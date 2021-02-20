"use strict";
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
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const glob_1 = __importDefault(require("glob"));
const is_glob_1 = __importDefault(require("is-glob"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const SScssFile_1 = __importDefault(require("../SScssFile"));
const chokidar_1 = __importDefault(require("chokidar"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Partial<ISScssCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISScssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/compile/SScssCompiler';
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssCompiler extends SCompiler_1.default {
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams, deepMerge_1.default({
            scssCompiler: {}
        }, settings || {}));
    }
    /**
     * @name          scssCompilerSettings
     * @type          ISScssCompilerSettings
     * @get
     *
     * Access the scss compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssCompilerSettings() {
        return this._settings.scssCompiler;
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
            settings = deepMerge_1.default(this.scssCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            // prod
            if (params.prod) {
                params.cache = false;
                params.style = 'compressed';
                params.minify = true;
                params.stripComments = true;
            }
            const resultsObj = {};
            let filesPaths = [];
            let scssFiles = {};
            if (params.watch) {
                chokidar_1.default.watch(input).on('change', (path) => __awaiter(this, void 0, void 0, function* () {
                    let file = scssFiles[path];
                    if (!file) {
                        file = new SScssFile_1.default(path, {
                            scssFile: {
                                compile: settings
                            }
                        });
                        scssFiles[path] = file;
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
                input = absolute_1.default(input);
                // process inputs
                input.forEach((inputStr) => {
                    if (is_glob_1.default(inputStr)) {
                        filesPaths = [...filesPaths, ...glob_1.default.sync(inputStr)];
                    }
                    else {
                        filesPaths.push(inputStr);
                    }
                });
                filesPaths.forEach((path) => {
                    const file = new SScssFile_1.default(path, {
                        scssFile: {
                            compile: settings
                        }
                    });
                    scssFiles[file.path] = file;
                    pipe(file);
                });
                const resultsObj = {};
                for (let i = 0; i < Object.keys(scssFiles).length; i++) {
                    const file = scssFiles[Object.keys(scssFiles)[i]];
                    // @todo    {Clean}     remove the ts-ignore
                    // @ts-ignore
                    const resPromise = file.compile(Object.assign(Object.assign({}, params), { watch: false }), settings);
                    const res = yield resPromise;
                    resultsObj[file.path] = res.css;
                }
                let aggregateStrArray = [];
                Object.keys(resultsObj).forEach((path) => {
                    const cssRes = resultsObj[path];
                    aggregateStrArray.push(cssRes);
                });
                const startTime = Date.now();
                resolve({
                    files: resultsObj,
                    css: aggregateStrArray.join('\n'),
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
        }));
    }
}
SScssCompiler.interfaces = {
    params: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    }
};
exports.default = SScssCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFPQSx1RUFBaUQ7QUFDakQsc0VBQWdEO0FBU2hELGdEQUEwQjtBQUUxQixzREFBK0I7QUFFL0IseUVBQW1EO0FBQ25ELG1FQUE2QztBQUU3Qyw2REFBdUM7QUFFdkMsd0RBQWtDO0FBRWxDLDRHQUFzRjtBQXNDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLGFBQWMsU0FBUSxtQkFBVztJQXdCckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUE0QyxFQUM1QyxRQUFvQztRQUVwQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLG9CQUFvQjtRQUN0QixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsV0FBNEMsRUFBRTtRQUU5QyxPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWhFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4RSxPQUFPO1lBQ1AsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztnQkFDNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzdCO1lBRUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBRXRCLElBQUksVUFBVSxHQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLFNBQVMsR0FBZ0MsRUFBRSxDQUFDO1lBRWhELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsa0JBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO29CQUNsRCxJQUFJLElBQUksR0FBZ0IsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNULElBQUksR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSxFQUFFOzRCQUMzQixRQUFRLEVBQUU7Z0NBQ1IsT0FBTyxFQUFFLFFBQVE7NkJBQ2xCO3lCQUNGLENBQUMsQ0FBQzt3QkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ1o7b0JBQ0QsbUJBQW1CO29CQUNuQixNQUFNLElBQUksQ0FBQyxPQUFPLGlDQUVYLE1BQU0sS0FDVCxLQUFLLEVBQUUsS0FBSyxLQUVkLFFBQVEsQ0FDVCxDQUFDO29CQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLFdBQVc7cUJBQ2xCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSw4Q0FBOEM7cUJBQ3RELENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLDhDQUE4QztpQkFDdEQsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLGlCQUFpQjtnQkFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUN6QixJQUFJLGlCQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ3RCLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUN4RDt5QkFBTTt3QkFDTCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUMzQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVcsQ0FBQyxJQUFJLEVBQUU7d0JBQ2pDLFFBQVEsRUFBRTs0QkFDUixPQUFPLEVBQUUsUUFBUTt5QkFDbEI7cUJBQ0YsQ0FBQyxDQUFDO29CQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxVQUFVLEdBQTJCLEVBQUUsQ0FBQztnQkFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCw0Q0FBNEM7b0JBQzVDLGFBQWE7b0JBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8saUNBRXhCLE1BQU0sS0FDVCxLQUFLLEVBQUUsS0FBSyxLQUVkLFFBQVEsQ0FDVCxDQUFDO29CQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDO29CQUM3QixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ2pDO2dCQUVELElBQUksaUJBQWlCLEdBQWEsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN2QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM3QixPQUFPLENBQUM7b0JBQ04sS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxTQUFTLEVBQUUsU0FBUztvQkFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUztpQkFDakMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUF6S00sd0JBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxzQ0FBOEI7S0FDdEM7Q0FDRixDQUFDO0FBdUtKLGtCQUFlLGFBQWEsQ0FBQyJ9