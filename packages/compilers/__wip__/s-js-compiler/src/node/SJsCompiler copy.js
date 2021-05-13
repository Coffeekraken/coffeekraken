var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SCompiler from '@coffeekraken/s-compiler';
import __SFile from '@coffeekraken/s-file';
import * as __esbuild from 'esbuild';
import __path from 'path';
import __fs from 'fs';
import __dependencyList from '@coffeekraken/sugar/node/fs/dependencyList';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __SJsCompilerInterface from './interface/SJsCompilerInterface';
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
class SJsCompiler extends __SCompiler {
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, __deepMerge({
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
        return new __SPromise(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            const set = __deepMerge(this.jsCompilerSettings, {}, settings);
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
                if (!__fs.existsSync(input[0])) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The file you want to bundle "<cyan>${input[0]}</cyan>" does not exists...`);
                }
                const fileToCompile = __SFile.new(input[0]);
                if (params.watch) {
                    const dependencyListPromise = __dependencyList(input[0], {
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
                    const color = __getColorFor(input[0]);
                    const res = yield this._compileInternal([fileToCompile], params, emit);
                    if (res instanceof Error)
                        throw res;
                }
            }
            else {
                const pool = __fsPool(input, {
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
            const duration = new __SDuration();
            const logPlugin = {
                name: 'logPlugin',
                setup(build) {
                    // Load ".txt" files and return an array of words
                    build.onLoad({ filter: /\.js$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                        const mtime = __fs.statSync(args.path).mtimeMs;
                        const text = __fs.readFileSync(args.path, 'utf8');
                        return {
                            contents: text
                        };
                    }));
                }
            };
            const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info', outdir: params.bundle ? undefined : params.outDir, outfile: params.bundle
                    ? __path.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
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
                    value: `<green>[save]</green> File "<cyan>${files[0].relPath}</cyan>" saved under "<magenta>${__path.relative(params.rootDir, `${params.outDir}/${files[0].path.replace(params.inDir, '')}`)}</magenta>"`
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
        class: __SJsCompilerInterface
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
export default SJsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0NvbXBpbGVyIGNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUEyQixNQUFNLDBCQUEwQixDQUFDO0FBTW5FLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sS0FBSyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFLdEIsT0FBTyxnQkFBZ0IsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRSxPQUFPLGFBQWEsTUFBTSxrREFBa0QsQ0FBQztBQUU3RSxPQUFPLHNCQUFzQixNQUFNLGtDQUFrQyxDQUFDO0FBK0J0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxXQUFXO0lBdUVuQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTJDLEVBQzNDLFFBQW1DO1FBRW5DLEtBQUssQ0FDSCxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLEVBQ25CLFdBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUdKOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO0lBakJ0QyxDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJDRCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksVUFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFL0QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ2QsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5CLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDckUsQ0FBQyxDQUFDO1lBRUgsT0FBTztZQUNQLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUVELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsS0FBSyxFQUFFLDRDQUE0QztpQkFDcEQsQ0FBQyxDQUFDO2dCQUVILElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdHQUF3RyxDQUN2SSxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhDQUE4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUNsSCxDQUFDO2lCQUNIO2dCQUVELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDaEIsTUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3ZELE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUMvQixLQUFLLEVBQUUsSUFBSTt3QkFDWCxhQUFhLEVBQUUsSUFBSTtxQkFDcEIsQ0FBQyxDQUFDO29CQUNILHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3dCQUMxRCxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLEtBQUssRUFBRSxlQUFlOzRCQUN0QixLQUFLLEVBQUUsa0RBQWtEO3lCQUMxRCxDQUFDLENBQUM7d0JBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3JDLENBQUMsYUFBYSxDQUFDLEVBQ2YsTUFBTSxFQUNOLElBQUksQ0FDTCxDQUFDO3dCQUNGLElBQUksR0FBRyxZQUFZLEtBQUs7NEJBQUUsTUFBTSxHQUFHLENBQUM7d0JBRXBDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLGVBQWU7NEJBQ3RCLEtBQUssRUFBRSw4Q0FBOEM7eUJBQ3RELENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3JDLENBQUMsYUFBYSxDQUFDLEVBQ2YsTUFBTSxFQUNOLElBQUksQ0FDTCxDQUFDO29CQUNGLElBQUksR0FBRyxZQUFZLEtBQUs7d0JBQUUsTUFBTSxHQUFHLENBQUM7aUJBQ3JDO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTtvQkFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2lCQUNwQixDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFPLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUVkLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRS9DLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzdELElBQUksR0FBRyxZQUFZLEtBQUs7d0JBQUUsTUFBTSxHQUFHLENBQUM7b0JBRXBDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDVixLQUFLLEVBQUUsZUFBZTs0QkFDdEIsS0FBSyxFQUFFLDhDQUE4Qzt5QkFDdEQsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLEtBQUssRUFBRSw4Q0FBOEM7aUJBQ3RELENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFSyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUk7OztZQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsc0RBQ0wsS0FBSyxDQUFDLE1BQ1IsaUJBQWlCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTthQUMvQyxDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sU0FBUyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxDQUFDLEtBQUs7b0JBQ1QsaURBQWlEO29CQUNqRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7d0JBQy9DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUVsRCxPQUFPOzRCQUNMLFFBQVEsRUFBRSxJQUFJO3lCQUNmLENBQUM7b0JBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQztZQUVGLE1BQU0sYUFBYSxpQ0FDakIsT0FBTyxFQUFFLE1BQU0sRUFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsUUFBUSxFQUFFLE1BQU0sRUFDaEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDakQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUFNLENBQUMsTUFBTSxFQUNiLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsWUFBWSxLQUFLLENBQ3REO29CQUNILENBQUMsQ0FBQyxTQUFTO2dCQUNiLG9CQUFvQjtnQkFDcEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixXQUFXLEVBQUUsSUFBSSxFQUNqQixXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNyQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDckIsS0FBSyxFQUFFLElBQUksRUFDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNyQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFDckIsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQUMsT0FBTyxLQUNqQixPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxHQUFHLENBQUMsTUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO29CQUNqQyxpQ0FBaUM7b0JBQ2pDLGlDQUFpQztvQkFDakMsNEJBQTRCO29CQUM1QixLQUFLO2lCQUNOLEdBQ0YsQ0FBQztZQUVGLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBSTtnQkFDRixTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLEtBQUssRUFBRSxxQ0FDTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FDWCxrQ0FBa0MsTUFBTSxDQUFDLFFBQVEsQ0FDL0MsTUFBTSxDQUFDLE9BQU8sRUFDZCxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUM5RCxhQUFhO2lCQUNmLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsS0FBSyxFQUFFLG9DQUFvQyxLQUFLLENBQUMsTUFBTSxpQkFDckQsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDM0Isb0RBQ0UsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNqQixXQUFXO2FBQ1osQ0FBQyxDQUFDO1lBRUgsdUNBQ0ssU0FBUyxHQUNULFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFDakI7O0tBQ0g7O0FBOVRNLHNCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsc0JBQXNCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGOzs7Ozs7Ozs7R0FTRztBQUNJLG9DQUF3QixHQUFHO0lBQ2hDLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTtJQUNWLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsUUFBUTtJQUNSLE9BQU87SUFDUCxVQUFVO0lBQ1YsWUFBWTtJQUNaLFNBQVM7SUFDVCxPQUFPO0lBQ1AsWUFBWTtJQUNaLFFBQVE7SUFDUixXQUFXO0lBQ1gsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1YsY0FBYztJQUNkLFNBQVM7SUFDVCxTQUFTO0lBQ1QsWUFBWTtJQUNaLE1BQU07SUFDTixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLE9BQU87SUFDUCxVQUFVO0lBQ1YsYUFBYTtDQUNkLENBQUM7QUEyUUosZUFBZSxXQUFXLENBQUMifQ==