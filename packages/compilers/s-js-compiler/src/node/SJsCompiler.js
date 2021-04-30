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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const __esbuild = __importStar(require("esbuild"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dependencyList_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dependencyList"));
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
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
            emit('log', {
                value: 'Starting <yellow>JS</yellow> file(s) compilation process...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
            }
            if (params.bundle) {
                emit('log', {
                    value: `<cyan>[bundle]</cyan> Bundling application`
                });
                if (input && input.length > 1) {
                    throw new Error(`<red>[${this.constructor.name}]</red> When using the <yellow>--bundle</yellow> option, you MUST specify <cyan>1 input</cyan> only...`);
                }
                if (!fs_1.default.existsSync(input[0])) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The file you want to bundle "<cyan>${input[0]}</cyan>" does not exists...`);
                }
                const fileToCompile = s_file_1.default.new(input[0]);
                if (params.watch) {
                    const dependencyListPromise = dependencyList_1.default(input[0], {
                        exclude: ['**/node_modules/**'],
                        watch: true,
                        ignoreInitial: true
                    });
                    dependencyListPromise.on('update', ({ list, path }) => __awaiter(this, void 0, void 0, function* () {
                        emit('log', {
                            value: `<yellow>[dependency]</yellow> Dependency updated`
                        });
                        const res = yield this._compileInternal([fileToCompile], params, emit);
                        if (res instanceof Error)
                            throw res;
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }));
                }
                else {
                    const color = getColorFor_1.default(input[0]);
                    const res = yield this._compileInternal([fileToCompile], params, emit);
                    if (res instanceof Error)
                        throw res;
                }
            }
            else {
                const pool = pool_1.default(input, {
                    watch: params.watch
                });
                on('finally', () => {
                    pool.cancel();
                });
                pool.on(params.watch ? 'update' : 'files', (files, m) => __awaiter(this, void 0, void 0, function* () {
                    pool.cancel();
                    files = Array.isArray(files) ? files : [files];
                    const res = yield this._compileInternal(files, params, emit);
                    if (res instanceof Error)
                        throw res;
                    if (params.watch) {
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }
                    else {
                        resolve(res);
                    }
                }));
            }
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
    _compileInternal(files, params, emit) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `<yellow>[compile]</yellow> Start compiling <yellow>${files.length}</yellow> file${files.length > 1 ? 's' : ''}`
            });
            const duration = new s_duration_1.default();
            const logPlugin = {
                name: 'logPlugin',
                setup(build) {
                    // Load ".txt" files and return an array of words
                    build.onLoad({ filter: /\.js$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                        const mtime = fs_1.default.statSync(args.path).mtimeMs;
                        const text = fs_1.default.readFileSync(args.path, 'utf8');
                        return {
                            contents: text
                        };
                    }));
                }
            };
            const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info', outdir: params.bundle ? undefined : params.outDir, outfile: params.bundle
                    ? path_1.default.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
                    : undefined, 
                // platform: 'node',
                outbase: params.inDir, banner: params.banner, incremental: true, entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, errorLimit: 100, minify: params.minify, sourcemap: params.map, watch: false }, params.esbuild), { plugins: [
                    logPlugin,
                    ...((_a = params.esbuild.plugins) !== null && _a !== void 0 ? _a : [])
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
                return e;
            }
            if (files.length === 1) {
                emit('log', {
                    value: `<green>[save]</green> File "<cyan>${files[0].relPath}</cyan>" saved under "<magenta>${path_1.default.relative(params.rootDir, `${params.outDir}/${files[0].path.replace(params.inDir, '')}`)}</magenta>"`
                });
            }
            emit('log', {
                value: `<green>[success]</green> <yellow>${files.length}</yellow> file${files.length > 1 ? 's' : ''} compiled <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
            return Object.assign(Object.assign({}, resultObj), duration.end());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsMEVBQW1FO0FBTW5FLGtFQUEyQztBQUUzQyxtREFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUt0QixnR0FBMEU7QUFDMUUsbUdBQTZFO0FBRTdFLDRGQUFzRTtBQStCdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUF1RW5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUdKOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO0lBakJ0QyxDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJDRCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZ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