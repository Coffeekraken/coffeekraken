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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0NvbXBpbGVyIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXdEO0FBQ3hELDBFQUFtRDtBQUNuRCw0RkFBc0U7QUFDdEUsd0VBQWlEO0FBQ2pELDBFQUFtRTtBQU1uRSxrRUFBMkM7QUFFM0MsbURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFLdEIsZ0dBQTBFO0FBQzFFLG1HQUE2RTtBQUU3RSw0RkFBc0U7QUErQnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG9CQUFXO0lBdUVuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztJQWpCdEMsQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUEyQ0QsUUFBUSxDQUNOLE1BQTBCLEVBQzFCLFdBQTBDLEVBQUU7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ2QsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5CLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDckUsQ0FBQyxDQUFDO1lBRUgsT0FBTztZQUNQLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUVELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsS0FBSyxFQUFFLDRDQUE0QztpQkFDcEQsQ0FBQyxDQUFDO2dCQUVILElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdHQUF3RyxDQUN2SSxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhDQUE4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUNsSCxDQUFDO2lCQUNIO2dCQUVELE1BQU0sYUFBYSxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLE1BQU0scUJBQXFCLEdBQUcsd0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN2RCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDL0IsS0FBSyxFQUFFLElBQUk7d0JBQ1gsYUFBYSxFQUFFLElBQUk7cUJBQ3BCLENBQUMsQ0FBQztvQkFDSCxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTt3QkFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDVixLQUFLLEVBQUUsZUFBZTs0QkFDdEIsS0FBSyxFQUFFLGtEQUFrRDt5QkFDMUQsQ0FBQyxDQUFDO3dCQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUNyQyxDQUFDLGFBQWEsQ0FBQyxFQUNmLE1BQU0sRUFDTixJQUFJLENBQ0wsQ0FBQzt3QkFDRixJQUFJLEdBQUcsWUFBWSxLQUFLOzRCQUFFLE1BQU0sR0FBRyxDQUFDO3dCQUVwQyxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLEtBQUssRUFBRSxlQUFlOzRCQUN0QixLQUFLLEVBQUUsOENBQThDO3lCQUN0RCxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxNQUFNLEtBQUssR0FBRyxxQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV0QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDckMsQ0FBQyxhQUFhLENBQUMsRUFDZixNQUFNLEVBQ04sSUFBSSxDQUNMLENBQUM7b0JBQ0YsSUFBSSxHQUFHLFlBQVksS0FBSzt3QkFBRSxNQUFNLEdBQUcsQ0FBQztpQkFDckM7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLElBQUksR0FBRyxjQUFRLENBQUMsS0FBSyxFQUFFO29CQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7aUJBQ3BCLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQU8sS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRWQsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFL0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxHQUFHLFlBQVksS0FBSzt3QkFBRSxNQUFNLEdBQUcsQ0FBQztvQkFFcEMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO3dCQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLEtBQUssRUFBRSxlQUFlOzRCQUN0QixLQUFLLEVBQUUsOENBQThDO3lCQUN0RCxDQUFDLENBQUM7cUJBQ0o7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsS0FBSyxFQUFFLDhDQUE4QztpQkFDdEQsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUEsRUFDRDtZQUNFLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVLLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSTs7O1lBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxzREFDTCxLQUFLLENBQUMsTUFDUixpQkFBaUIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2FBQy9DLENBQUMsQ0FBQztZQUVILE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sU0FBUyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxDQUFDLEtBQUs7b0JBQ1QsaURBQWlEO29CQUNqRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7d0JBQy9DLE1BQU0sS0FBSyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDL0MsTUFBTSxJQUFJLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUVsRCxPQUFPOzRCQUNMLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUM7b0JBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQztZQUVGLE1BQU0sYUFBYSxpQ0FDakIsT0FBTyxFQUFFLE1BQU0sRUFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsUUFBUSxFQUFFLE1BQU0sRUFDaEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDakQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNwQixDQUFDLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FDWixNQUFNLENBQUMsTUFBTSxFQUNiLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsWUFBWSxLQUFLLENBQ3REO29CQUNILENBQUMsQ0FBQyxTQUFTO2dCQUNiLG9CQUFvQjtnQkFDcEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixXQUFXLEVBQUUsSUFBSSxFQUNqQixXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNyQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsS0FBSyxFQUFFLElBQUksRUFDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFDckIsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQUMsT0FBTyxLQUNqQixPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxHQUFHLENBQUMsTUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO29CQUNqQyxpQ0FBaUM7b0JBQ2pDLGlDQUFpQztvQkFDakMsNEJBQTRCO29CQUM1QixLQUFLO2lCQUNOLEdBQ0YsQ0FBQztZQUVGLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBSTtnQkFDRixTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLEtBQUssRUFBRSxxQ0FDTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FDWCxrQ0FBa0MsY0FBTSxDQUFDLFFBQVEsQ0FDL0MsTUFBTSxDQUFDLE9BQU8sRUFDZCxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUM5RCxhQUFhO2lCQUNmLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsS0FBSyxFQUFFLG9DQUFvQyxLQUFLLENBQUMsTUFBTSxpQkFDckQsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0Isb0RBQ0UsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNqQixXQUFXO2FBQ1osQ0FBQyxDQUFDO1lBRUgsdUNBQ0ssU0FBUyxHQUNULFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFDakI7O0tBQ0g7O0FBOVRNLHNCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsOEJBQXNCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGOzs7Ozs7Ozs7R0FTRztBQUNJLG9DQUF3QixHQUFHO0lBQ2hDLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTtJQUNWLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsUUFBUTtJQUNSLE9BQU87SUFDUCxVQUFVO0lBQ1YsWUFBWTtJQUNaLFNBQVM7SUFDVCxPQUFPO0lBQ1AsWUFBWTtJQUNaLFFBQVE7SUFDUixXQUFXO0lBQ1gsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1YsY0FBYztJQUNkLFNBQVM7SUFDVCxTQUFTO0lBQ1QsWUFBWTtJQUNaLE1BQU07SUFDTixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLE9BQU87SUFDUCxVQUFVO0lBQ1YsYUFBYTtDQUNkLENBQUM7QUEyUUosa0JBQWUsV0FBVyxDQUFDIn0=