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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/availableColors"));
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
class SJsCompiler extends s_compiler_1.default {
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, deepMerge_1.default({
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
                watch: true
            });
            on('finally', () => {
                pool.cancel();
            });
            const updateTimestamps = {};
            const logPlugin = {
                name: 'logPlugin',
                setup(build) {
                    // Load ".txt" files and return an array of words
                    build.onLoad({ filter: /\.(j|t)s$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                        if (args.path.match(/\.ts(x)?$/) &&
                            fs_1.default.existsSync(args.path.replace(/\.ts(x)?$/, '.js'))) {
                            console.log(fs_1.default
                                .readFileSync(args.path.replace(/\.ts(x)?$/, '.js'), 'utf8')
                                .toString());
                            return {
                                contents: fs_1.default
                                    .readFileSync(args.path.replace(/\.ts(x)?$/, '.js'), 'utf8')
                                    .toString(),
                                loader: 'js'
                            };
                            console.log('TSX', args.path);
                        }
                        // if (
                        //   !updateTimestamps[args.path] ||
                        //   updateTimestamps[args.path] !== mtime
                        // ) {
                        //   lastCompiledFilePath = args.path;
                        //   // emit('log', {
                        //   //   value: `<yellow>[${
                        //   //     isFirstCompilation ? 'compile' : 'update'
                        //   //   }]</yellow> File "<cyan>${__path.relative(
                        //   //     params.rootDir,
                        //   //     args.path
                        //   //   )}</cyan>"`
                        //   // });
                        // }
                        // updateTimestamps[args.path] = mtime;
                        const mtime = fs_1.default.statSync(args.path).mtimeMs;
                        const text = fs_1.default.readFileSync(args.path, 'utf8');
                        return {
                            contents: text
                        };
                    }));
                }
            };
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
            pool.on('update,files', (files) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                pool.cancel();
                const duration = new s_duration_1.default();
                files = Array.isArray(files) ? files : [files];
                files = files.filter((file) => {
                    if (file.path.match(/\.js$/) &&
                        fs_1.default.existsSync(file.path.replace(/\.js$/, '.ts')))
                        return false;
                    return true;
                });
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
                const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info', outdir: params.bundle ? undefined : params.outDir, outfile: params.bundle
                        ? path_1.default.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
                        : path_1.default.resolve(params.outDir, files[0].name), outbase: params.inDir, banner: params.banner, incremental: true, entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, errorLimit: 100, minify: params.minify, sourcemap: params.map, watch: params.watch
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
                        : false }, params.esbuild), { plugins: [
                        logPlugin,
                        ...((_b = params.esbuild.plugins) !== null && _b !== void 0 ? _b : [])
                        // __esbuildAggregateLibsPlugin({
                        //   outputDir: params.outputDir,
                        //   rootDir: params.rootDir
                        // })
                    ] });
                console.log(esbuildParams);
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
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
                else {
                    resolve(Object.assign(Object.assign({}, resultObj), duration.end()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsMEVBQW1FO0FBQ25FLDJHQUFxRjtBQUNyRiw2RkFBdUU7QUFFdkUsbURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFFdEIsK0VBQStFO0FBQy9FLG9GQUFpRTtBQUdqRSw0RkFBc0U7QUErQnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG9CQUFXO0lBdUVuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztJQWpCdEMsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTBCLEVBQzFCLFdBQTBDLEVBQUU7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFB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