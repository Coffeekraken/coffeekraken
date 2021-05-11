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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dependencyList_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dependencyList"));
const getColorFor_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
const __esbuild = __importStar(require("esbuild"));
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
                group: 's-js-compiler',
                value: 'Starting <yellow>JS</yellow> file(s) compilation process...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
            }
            if (params.bundle) {
                emit('log', {
                    group: 's-js-compiler',
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
                            group: 's-js-compiler',
                            value: `<yellow>[dependency]</yellow> Dependency updated`
                        });
                        const res = yield this._compileInternal([fileToCompile], params, emit);
                        if (res instanceof Error)
                            throw res;
                        emit('log', {
                            group: 's-js-compiler',
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
                            group: 's-js-compiler',
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
                    group: 's-js-compiler',
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
                group: 's-js-compiler',
                type: 'verbose',
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
            const rollupInputParams = {
                input: files.map((f) => f.path)
            };
            const rollupOutputParams = {
                dir: params.bundle ? undefined : params.outDir,
                file: params.bundle
                    ? path_1.default.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
                    : undefined,
                format: params.format,
                banner: params.banner,
                sourcemap: params.map
            };
            const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info', outdir: params.bundle ? undefined : params.outDir, outfile: params.bundle
                    ? path_1.default.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
                    : undefined, platform: params.platform, outbase: params.inDir, banner: params.banner, incremental: true, entryPoints: files.map((f) => f.path), bundle: params.bundle, write: true, errorLimit: 100, minify: params.minify, sourcemap: params.map, watch: false }, params.esbuild), { plugins: [
                    logPlugin,
                    ...((_a = params.esbuild.plugins) !== null && _a !== void 0 ? _a : [])
                    // __esbuildAggregateLibsPlugin({
                    //   outputDir: params.outputDir,
                    //   rootDir: params.rootDir
                    // })
                ] });
            let resultObj;
            try {
                // console.log(rollupInputParams, rollupOutputParams);
                resultObj = yield __esbuild.build(esbuildParams);
                // const rollupPromise = await __rollup.rollup(rollupInputParams);
                // const { output } = await rollupPromise.generate(rollupOutputParams);
                // console.log(output);
                // return;
            }
            catch (e) {
                console.log('EERER', e);
                return e;
            }
            if (files.length === 1) {
                emit('log', {
                    group: 's-js-compiler',
                    value: `<green>[save]</green> File "<cyan>${files[0].relPath}</cyan>" saved under "<magenta>${path_1.default.relative(params.rootDir, `${params.outDir}/${files[0].path.replace(params.inDir, '')}`)}</magenta>"`
                });
            }
            emit('log', {
                group: 's-js-compiler',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsMEVBQW1FO0FBTW5FLGtFQUEyQztBQUUzQyxnREFBMEI7QUFDMUIsNENBQXNCO0FBS3RCLGdHQUEwRTtBQUMxRSxtR0FBNkU7QUFFN0UsbURBQXFDO0FBR3JDLDRGQUFzRTtBQStCdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsb0JBQVc7SUF1RW5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUdKOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO0lBakJ0QyxDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJDRCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZ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