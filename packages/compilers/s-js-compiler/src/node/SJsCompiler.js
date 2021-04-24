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
                watch: false
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
                var _a, _b;
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                    return;
                }
                const duration = new s_duration_1.default();
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
                const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'error', outdir: params.outDir, outbase: params.inDir, banner: params.banner, incremental: true, entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, errorLimit: 100, minify: params.minify, sourcemap: params.map, watch: params.watch
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