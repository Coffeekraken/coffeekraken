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
const filter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/filter"));
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
            emit('log', {
                value: 'Starting <yellow>JS</yellow> file(s) compilation...'
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
            // prod
            if (params.prod) {
                params.minify = true;
            }
            // let updatedFilesPool;
            // if (params.outDir) {
            //   updatedFilesPool = __fsPool(`${params.outDir}/**/*.js`, {
            //     watch: true
            //   }).on('update', (files) => {
            //     console.log('files', files);
            //   });
            // }
            const pool = pool_1.default(input, {
                watch: false
            });
            // handle cancel
            on('finally', () => {
                // updatedFilesPool?.cancel();
                pool.cancel();
            });
            const updateTimestamps = {};
            const interceptPlugin = {
                name: 'interceptPlugin',
                setup(build) {
                    // Load ".txt" files and return an array of words
                    build.onLoad({ filter: /\.js$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                        const mtime = fs_1.default.statSync(args.path).mtimeMs;
                        const text = fs_1.default.readFileSync(args.path, 'utf8');
                        if (!updateTimestamps[args.path] ||
                            updateTimestamps[args.path] !== mtime) {
                            emit('log', {
                                value: `<yellow>[update]</yellow> File "<cyan>${path_1.default.relative(params.rootDir, args.path)}</cyan>"`
                            });
                        }
                        updateTimestamps[args.path] = mtime;
                        return {
                            contents: text,
                            loader: 'js'
                        };
                    }));
                }
            };
            pool.on('files', (files) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const duration = new SDuration_1.default();
                files = Array.isArray(files) ? files : [files];
                // for (let i = 0; i < files.length; i++) {
                // const file = files[i];
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
                // let outFile;
                // if (params.save && params.outDir) {
                //   const relSrcPath = __path.relative(params.inDir, file.path);
                //   const outFilePath = __path.resolve(params.outDir, relSrcPath);
                //   outFile = outFilePath;
                // }
                const esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'silent', outdir: params.outDir, outbase: params.inDir, banner: params.banner }, filter_1.default(params, (key, value) => {
                    if (Array.isArray(value) && !value.length)
                        return false;
                    return SJsCompiler._esbuildAcceptedSettings.indexOf(key) !== -1;
                })), { entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, watch: params.watch
                        ? {
                            onRebuild(error, result) {
                                if (error) {
                                    emit('error', {
                                        value: error
                                    });
                                    return;
                                }
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
                                //         `//# sourceMappingURL=${__getFilename(
                                //           fileObj.path
                                //         )}`,
                                //         `//# sourceMappingURL=${__getFilename(filePath)}`
                                //       );
                                //     }
                                //     console.log('WRINTING', filePath, content);
                                //     __fs.writeFileSync(filePath, content);
                                //     const file = __SFile.new(filePath);
                                //     emit('log', {
                                //       type: 'file',
                                //       file,
                                //       action: 'save'
                                //     });
                                //   });
                                // }
                                emit('log', {
                                    value: `<blue>[watch]</blue> Watching for changes...`
                                });
                            }
                        }
                        : false, errorLimit: 100, minify: params.minify, sourcemap: params.map, plugins: [
                        interceptPlugin
                        // __esbuildAggregateLibsPlugin({
                        //   outputDir: params.outputDir,
                        //   rootDir: params.rootDir
                        // })
                    ] }), params.esbuild);
                let resultObj;
                try {
                    resultObj = yield __esbuild.build(esbuildParams);
                }
                catch (e) {
                    // return reject(e);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEZBQW9FO0FBQ3BFLDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFFakQsNEZBRXFEO0FBQ3JELDRHQUFzRjtBQUN0Riw2RkFBdUU7QUFFdkUsbURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFDdEIsc0ZBQWdFO0FBQ2hFLCtFQUErRTtBQUMvRSxvRkFBaUU7QUFFakUsNEZBQXNFO0FBNkJ0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXVFbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEwQyxFQUMxQyxRQUFrQztRQUVsQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztJQWpCdEMsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTBCLEVBQzFCLFdBQTBDLEVBQUU7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0Qs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