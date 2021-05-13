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
import __path from 'path';
import __fs from 'fs';
import __dependencyList from '@coffeekraken/sugar/node/fs/dependencyList';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import * as __esbuild from 'esbuild';
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
            const rollupInputParams = {
                input: files.map((f) => f.path)
            };
            const rollupOutputParams = {
                dir: params.bundle ? undefined : params.outDir,
                file: params.bundle
                    ? __path.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
                    : undefined,
                format: params.format,
                banner: params.banner,
                sourcemap: params.map
            };
            const esbuildParams = Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info', outdir: params.bundle ? undefined : params.outDir, outfile: params.bundle
                    ? __path.resolve(params.outDir, `${files[0].nameWithoutExt}${params.bundleSuffix}.js`)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQTJCLE1BQU0sMEJBQTBCLENBQUM7QUFNbkUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUt0QixPQUFPLGdCQUFnQixNQUFNLDRDQUE0QyxDQUFDO0FBQzFFLE9BQU8sYUFBYSxNQUFNLGtEQUFrRCxDQUFDO0FBRTdFLE9BQU8sS0FBSyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBR3JDLE9BQU8sc0JBQXNCLE1BQU0sa0NBQWtDLENBQUM7QUErQnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLFdBQVc7SUF1RW5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBMkMsRUFDM0MsUUFBbUM7UUFFbkMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsV0FBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBR0o7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCxnQkFBVyxHQUF3QixFQUFFLENBQUM7SUFqQnRDLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFD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