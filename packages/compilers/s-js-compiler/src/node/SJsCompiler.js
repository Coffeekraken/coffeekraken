"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const SDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/SDuration"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCompiler_1 = __importDefault(require("@coffeekraken/sugar/node/compiler/SCompiler"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/colors/availableColors"));
const pickRandom_1 = __importDefault(require("@coffeekraken/sugar/shared/array/pickRandom"));
const __esbuild = __importStar(require("esbuild"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import __esbuildAggregateLibsPlugin from '../esbuild/plugins/aggregateLibs';
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const SJsCompilerInterface_1 = __importDefault(require("./interface/SJsCompilerInterface"));
/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "js" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISJsCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/js/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends SCompiler_1.default {
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
            jsCompiler: {}
        }, settings || {}));
        /**
         * @name              _compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._filesColor = {};
    }
    /**
     * @name          jsCompilerSettings
     * @type          ISJsCompilerSettings
     * @get
     *
     * Access the js compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsCompilerSettings() {
        return this._settings.jsCompiler;
    }
    _compile(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            const set = deepMerge_1.default(this.jsCompilerSettings, {}, settings);
            const input = Array.isArray(params.input)
                ? params.input
                : [params.input];
            let isFirstCompilation = true, lastCompiledFilePath;
            emit('log', {
                value: 'Starting <yellow>JS</yellow> file(s) compilation...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
            }
            const pool = pool_1.default(input, {
                watch: false
            });
            on('finally', () => {
                pool.cancel();
            });
            const updateTimestamps = {};
            const interceptPlugin = {
                name: 'interceptPlugin',
                setup(build) {
                    // Load ".txt" files and return an array of words
                    build.onLoad({ filter: /\.(j|t)s$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                        const mtime = fs_1.default.statSync(args.path).mtimeMs;
                        const text = fs_1.default.readFileSync(args.path, 'utf8');
                        if (!updateTimestamps[args.path] ||
                            updateTimestamps[args.path] !== mtime) {
                            lastCompiledFilePath = args.path;
                            emit('log', {
                                value: `<yellow>[${isFirstCompilation ? 'compile' : 'update'}]</yellow> File "<cyan>${path_1.default.relative(params.rootDir, args.path)}</cyan>"`
                            });
                        }
                        updateTimestamps[args.path] = mtime;
                        return {
                            contents: text
                        };
                    }));
                }
            };
            pool.on('files', (files) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const duration = new SDuration_1.default();
                files = Array.isArray(files) ? files : [files];
                const color = (_a = this._filesColor[files.length === 1
                    ? filename_1.default(files[0].path)
                    : files.length + ' files']) !== null && _a !== void 0 ? _a : pickRandom_1.default(availableColors_1.default());
                this._filesColor[files.length === 1
                    ? filename_1.default(files[0].path)
                    : files.length + ' files'] = color;
                emit('log', {
                    value: `<${color}>[${files.length === 1
                        ? filename_1.default(files[0].path)
                        : files.length + ' files'}]</${color}> Starting compilation`
                });
                const esbuildParams = Object.assign({ charset: 'utf8', format: params.format, logLevel: 'error', outdir: params.outDir, outbase: params.inDir, banner: params.banner, incremental: true, 
                    // ...__filter(params, (key, value) => {
                    //   if (Array.isArray(value) && !value.length) return false;
                    //   return SJsCompiler._esbuildAcceptedSettings.indexOf(key) !== -1;
                    // }),
                    entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, errorLimit: 100, minify: params.minify, sourcemap: params.map, watch: params.watch
                        ? {
                            onRebuild(error, result) {
                                if (error) {
                                    emit('error', {
                                        value: error
                                    });
                                    return;
                                }
                                isFirstCompilation = false;
                                let logValue = `<green>[success]</green> <${color}>${files.length === 1
                                    ? filename_1.default(files[0].path)
                                    : files.length + ' files'}</${color}> compiled`;
                                if (!isFirstCompilation && lastCompiledFilePath) {
                                    logValue = `<green>[success]</green> File "<cyan>${path_1.default.relative(params.rootDir, lastCompiledFilePath)}</cyan>" compiled`;
                                }
                                emit('log', {
                                    value: logValue
                                });
                                emit('log', {
                                    value: `<blue>[watch]</blue> Watching for changes...`
                                });
                            }
                        }
                        : false, plugins: [
                        interceptPlugin
                        // __esbuildAggregateLibsPlugin({
                        //   outputDir: params.outputDir,
                        //   rootDir: params.rootDir
                        // })
                    ] }, params.esbuild);
                let resultObj;
                try {
                    resultObj = yield __esbuild.build(esbuildParams);
                }
                catch (e) {
                    return reject(e);
                }
                emit('log', {
                    value: `<green>[success]</green> <${color}>${files.length === 1
                        ? filename_1.default(files[0].path)
                        : files.length + ' files'}</${color}> compiled`
                });
                // if (resultObj.outputFiles) {
                //   resultObj.outputFiles.forEach((fileObj) => {
                //     let filePath = fileObj.path;
                //     let content = fileObj.text;
                //     if (params.bundle && params.bundleSuffix) {
                //       if (filePath.match(/\.js\.map$/)) {
                //         filePath = filePath.replace(
                //           /\.js\.map$/,
                //           `${params.bundleSuffix}.js.map`
                //         );
                //       } else {
                //         filePath = filePath.replace(
                //           /\.js$/,
                //           `${params.bundleSuffix}.js`
                //         );
                //       }
                //       content = content.replace(
                //         `//# sourceMappingURL=${__getFilename(fileObj.path)}`,
                //         `//# sourceMappingURL=${__getFilename(filePath)}`
                //       );
                //     }
                //     __fs.writeFileSync(filePath, content);
                //     const file = __SFile.new(filePath);
                //     emit('log', {
                //       type: 'file',
                //       file,
                //       action: 'save'
                //     });
                //   });
                // }
                // if (outFile) {
                //   const file = __SFile.new(outFile);
                //   emit('log', {
                //     type: 'file',
                //     file,
                //     action: 'save'
                //   });
                // }
                // if (resultObj.warnings.length) {
                //   resultObj.warnings.forEach((warningObj) => {
                //     emit('warn', {
                //       value: warningObj.text
                //     });
                //   });
                // }
                // compiledFiles.push({
                //   path: outputPath,
                //   js: result.js.code,
                //   css: result.css.code,
                //   warnings: result.warnings
                // });
                // }
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
                else {
                    resolve(Object.assign({ 
                        // files: compiledFiles,
                        files: {} }, duration.end()));
                }
            }));
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
}
SJsCompiler.interfaces = {
    params: {
        apply: false,
        class: SJsCompilerInterface_1.default
    }
};
/**
 * @name            _esbuildAcceptedSettings
 * @type            Array
 * @static
 *
 * This static property store all the accepted esbuild options keys
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SJsCompiler._esbuildAcceptedSettings = [
    'bundle',
    'define',
    'external',
    'format',
    'globalName',
    'inject',
    'jsxFactory',
    'jsxFragment',
    'platform',
    'loader',
    'minify',
    'outdir',
    'outfile',
    'sourcemap',
    'target',
    'write',
    'avoidTDZ',
    // 'banner',
    'charset',
    'color',
    'errorLimit',
    'footer',
    'keepNames',
    'logLevel',
    'mainFields',
    'metafile',
    'outExtension',
    'plugins',
    'outbase',
    'publicPath',
    'pure',
    'resolveExtensions',
    'sourcefile',
    'stdin',
    'tsconfig',
    'tsconfigRaw'
];
exports.default = SJsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEZBQW9FO0FBQ3BFLDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsNEZBRXFEO0FBQ3JELDRHQUFzRjtBQUN0Riw2RkFBdUU7QUFFdkUsbURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFFdEIsK0VBQStFO0FBQy9FLG9GQUFpRTtBQUVqRSw0RkFBc0U7QUErQnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFXO0lBdUVuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTBDLEVBQzFDLFFBQWtDO1FBRWxDLEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUdKOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO0lBakJ0QyxDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJDRCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUvRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDZCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEVBQzNCLG9CQUFvQixDQUFDO1lBRXZCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLHFEQUFxRDthQUM3RCxDQUFDLENBQUM7WUFFSCxPQUFPO1lBQ1AsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBRUQsTUFBTSxJQUFJLEdBQUcsY0FBUSxDQUFDLEtBQUssRUFBRTtnQkFDM0IsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDNUIsTUFBTSxlQUFlLEdBQUc7Z0JBQ3RCLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLEtBQUssQ0FBQyxLQUFLO29CQUNULGlEQUFpRDtvQkFDakQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO3dCQUNuRCxNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQy9DLE1BQU0sSUFBSSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFFbEQsSUFDRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQzVCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQ3JDOzRCQUNBLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBRWpDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1YsS0FBSyxFQUFFLFlBQ0wsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFDbkMsMEJBQTBCLGNBQU0sQ0FBQyxRQUFRLENBQ3ZDLE1BQU0sQ0FBQyxPQUFPLEVBQ2QsSUFBSSxDQUFDLElBQUksQ0FDVixVQUFVOzZCQUNaLENBQUMsQ0FBQzt5QkFDSjt3QkFDRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUVwQyxPQUFPOzRCQUNMLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUM7b0JBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7O2dCQUMvQixNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztnQkFFbkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFL0MsTUFBTSxLQUFLLEdBQ1QsTUFBQSxJQUFJLENBQUMsV0FBVyxDQUNkLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLGtCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUM1QixtQ0FBSSxvQkFBWSxDQUFDLHlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFdBQVcsQ0FDZCxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxrQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FDNUIsR0FBRyxLQUFLLENBQUM7Z0JBRVYsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQ2QsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUNoQixDQUFDLENBQUMsa0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUNyQixNQUFNLEtBQUssd0JBQXdCO2lCQUNwQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxhQUFhLG1CQUNqQixPQUFPLEVBQUUsTUFBTSxFQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixRQUFRLEVBQUUsT0FBTyxFQUNqQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixXQUFXLEVBQUUsSUFBSTtvQkFDakIsd0NBQXdDO29CQUN4Qyw2REFBNkQ7b0JBQzdELHFFQUFxRTtvQkFDckUsTUFBTTtvQkFDTixXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNyQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsS0FBSyxFQUFFLElBQUksRUFDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3dCQUNqQixDQUFDLENBQUM7NEJBQ0UsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNO2dDQUNyQixJQUFJLEtBQUssRUFBRTtvQ0FDVCxJQUFJLENBQUMsT0FBTyxFQUFFO3dDQUNaLEtBQUssRUFBRSxLQUFLO3FDQUNiLENBQUMsQ0FBQztvQ0FDSCxPQUFPO2lDQUNSO2dDQUVELGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQ0FFM0IsSUFBSSxRQUFRLEdBQUcsNkJBQTZCLEtBQUssSUFDL0MsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO29DQUNoQixDQUFDLENBQUMsa0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29DQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUNyQixLQUFLLEtBQUssWUFBWSxDQUFDO2dDQUN2QixJQUFJLENBQUMsa0JBQWtCLElBQUksb0JBQW9CLEVBQUU7b0NBQy9DLFFBQVEsR0FBRyx3Q0FBd0MsY0FBTSxDQUFDLFFBQVEsQ0FDaEUsTUFBTSxDQUFDLE9BQU8sRUFDZCxvQkFBb0IsQ0FDckIsbUJBQW1CLENBQUM7aUNBQ3RCO2dDQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7b0NBQ1YsS0FBSyxFQUFFLFFBQVE7aUNBQ2hCLENBQUMsQ0FBQztnQ0FDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29DQUNWLEtBQUssRUFBRSw4Q0FBOEM7aUNBQ3RELENBQUMsQ0FBQzs0QkFDTCxDQUFDO3lCQUNGO3dCQUNILENBQUMsQ0FBQyxLQUFLLEVBQ1QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsaUNBQWlDO3dCQUNqQyxpQ0FBaUM7d0JBQ2pDLDRCQUE0Qjt3QkFDNUIsS0FBSztxQkFDTixJQUNFLE1BQU0sQ0FBQyxPQUFPLENBQ2xCLENBQUM7Z0JBRUYsSUFBSSxTQUFTLENBQUM7Z0JBQ2QsSUFBSTtvQkFDRixTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNsRDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsNkJBQTZCLEtBQUssSUFDdkMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUNoQixDQUFDLENBQUMsa0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUNyQixLQUFLLEtBQUssWUFBWTtpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILCtCQUErQjtnQkFDL0IsaURBQWlEO2dCQUNqRCxtQ0FBbUM7Z0JBQ25DLGtDQUFrQztnQkFDbEMsa0RBQWtEO2dCQUNsRCw0Q0FBNEM7Z0JBQzVDLHVDQUF1QztnQkFDdkMsMEJBQTBCO2dCQUMxQiw0Q0FBNEM7Z0JBQzVDLGFBQWE7Z0JBQ2IsaUJBQWlCO2dCQUNqQix1Q0FBdUM7Z0JBQ3ZDLHFCQUFxQjtnQkFDckIsd0NBQXdDO2dCQUN4QyxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsbUNBQW1DO2dCQUNuQyxpRUFBaUU7Z0JBQ2pFLDREQUE0RDtnQkFDNUQsV0FBVztnQkFDWCxRQUFRO2dCQUNSLDZDQUE2QztnQkFDN0MsMENBQTBDO2dCQUMxQyxvQkFBb0I7Z0JBQ3BCLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCx1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsUUFBUTtnQkFDUixJQUFJO2dCQUVKLGlCQUFpQjtnQkFDakIsdUNBQXVDO2dCQUN2QyxrQkFBa0I7Z0JBQ2xCLG9CQUFvQjtnQkFDcEIsWUFBWTtnQkFDWixxQkFBcUI7Z0JBQ3JCLFFBQVE7Z0JBQ1IsSUFBSTtnQkFFSixtQ0FBbUM7Z0JBQ25DLGlEQUFpRDtnQkFDakQscUJBQXFCO2dCQUNyQiwrQkFBK0I7Z0JBQy9CLFVBQVU7Z0JBQ1YsUUFBUTtnQkFDUixJQUFJO2dCQUVKLHVCQUF1QjtnQkFDdkIsc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLDBCQUEwQjtnQkFDMUIsOEJBQThCO2dCQUM5QixNQUFNO2dCQUNOLElBQUk7Z0JBRUosSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSw4Q0FBOEM7cUJBQ3RELENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxPQUFPO3dCQUNMLHdCQUF3Qjt3QkFDeEIsS0FBSyxFQUFFLEVBQUUsSUFDTixRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ2pCLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBL1ZNLHNCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsOEJBQXNCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGOzs7Ozs7Ozs7R0FTRztBQUNJLG9DQUF3QixHQUFHO0lBQ2hDLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTtJQUNWLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsUUFBUTtJQUNSLE9BQU87SUFDUCxVQUFVO0lBQ1YsWUFBWTtJQUNaLFNBQVM7SUFDVCxPQUFPO0lBQ1AsWUFBWTtJQUNaLFFBQVE7SUFDUixXQUFXO0lBQ1gsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1YsY0FBYztJQUNkLFNBQVM7SUFDVCxTQUFTO0lBQ1QsWUFBWTtJQUNaLE1BQU07SUFDTixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLE9BQU87SUFDUCxVQUFVO0lBQ1YsYUFBYTtDQUNkLENBQUM7QUE0U0osa0JBQWUsV0FBVyxDQUFDIn0=