"use strict";
// @ts-nocheck
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
const filename_1 = __importDefault(require("../../fs/filename"));
const onProcessExit_1 = __importDefault(require("../../process/onProcessExit"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SJsFile_1 = __importDefault(require("../SJsFile"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const glob_1 = __importDefault(require("../../is/glob"));
const glob_2 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const SDuration_1 = __importDefault(require("../../time/SDuration"));
const filter_1 = __importDefault(require("../../object/filter"));
const resolve_1 = __importDefault(require("resolve"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const buildInNodeModules_1 = __importDefault(require("../../module/buildInNodeModules"));
const __esbuild = __importStar(require("esbuild"));
const SJsCompilerParamsInterface_1 = __importDefault(require("./interface/SJsCompilerParamsInterface"));
/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "esbuild" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {ISJsCompilerOptionalParams}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.esbuild');
 *
 * @see             https://www.npmjs.com/package/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends SCompiler_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams, deepMerge_1.default({
            esbuildCompiler: {}
        }, settings || {}));
    }
    /**
     * @name      jsCompilerSettings
     * @type      ISJsCompilerSettings
     * @get
     *
     * Access to the esbuild compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsCompilerSettings() {
        return this._settings.esbuildCompiler;
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
            settings = deepMerge_1.default(this.jsCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            // prod
            if (params.prod || params.bundle) {
                params.minify = true;
                params.stripComments = true;
                params.map = false;
            }
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', logLevel: 'silent' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return (this.constructor._esbuildAcceptedSettings.indexOf(key) !== -1);
            })), { bundle: params.bundle, write: false, minify: params.minify, sourcemap: params.map }), params.esbuild);
            let filesPaths = [];
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (glob_1.default(inputStr)) {
                    filesPaths = [...filesPaths, ...glob_2.default.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            // set the entrypoints
            esbuildParams.entryPoints = filesPaths;
            if (params.serve) {
                const serverLogStrArray = [
                    `Your <yellow>Esbuild Js</yellow> server is <green>up and running</green>:`,
                    '',
                    `- Hostname        : <yellow>${params.host}</yellow>`,
                    `- Port            : <yellow>${params.port}</yellow>`,
                    `- URL's           : <cyan>http://${params.host}:${params.port}</cyan>`
                ];
                filesPaths.forEach((path) => {
                    serverLogStrArray.push(`                  : <cyan>${`http://${params.host}:${params.port}/${filename_1.default(path)}`.trim()} </cyan>`);
                });
                emit('log', {
                    type: 'time'
                });
                emit('log', {
                    clear: true,
                    type: 'heading',
                    value: serverLogStrArray.join('\n')
                });
                __esbuild
                    .serve({
                    host: params.host,
                    port: params.port
                }, Object.assign({}, esbuildParams))
                    .then((server) => {
                    onProcessExit_1.default(() => {
                        server.stop();
                    });
                })
                    .catch((e) => {
                    console.log(e);
                });
                return;
            }
            const resultsObj = {};
            const duration = new SDuration_1.default();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SJsFile_1.default(filePath, {
                    jsFile: {
                        compile: settings
                    }
                });
                pipe(file);
                const resPromise = file.compile(params, Object.assign({}, settings));
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // resolve with the compilation result
            if (!params.watch) {
                resolve(Object.assign({ files: resultsObj }, duration.end()));
            }
            else {
                emit('files', Object.assign({ files: resultsObj }, duration.end()));
            }
        }));
    }
}
SJsCompiler.interfaces = {
    params: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    }
};
/**
 * @name            _resolverPlugin
 * @type            Object
 * @static
 *
 * ESBuild resolver plugin
 *
 * @since       2.0.0
 */
SJsCompiler._resolverPlugin = {
    name: 'SJsFileEsBuildResolvePlugin',
    setup(build) {
        Object.keys(buildInNodeModules_1.default).forEach((path) => {
            const builtInObj = buildInNodeModules_1.default[path];
            if (builtInObj.polyfill && builtInObj.polyfill.browser) {
                build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
                    let resolvedPath = resolve_1.default.sync(builtInObj.polyfill.browser, {
                        basedir: _rootDir,
                        moduleDirectory: [
                            'node_modules',
                            path_1.default.resolve(packageRoot_1.default(__dirname), 'node_modules')
                        ],
                        // @ts-ignore
                        includeCoreModules: false,
                        preserveSymlinks: true,
                        packageFilter: (pkg, dir) => {
                            if (pkg.browser) {
                                if (typeof pkg.browser === 'string') {
                                    pkg.main = pkg.browser;
                                }
                                else if (typeof pkg.browser === 'object') {
                                    pkg.main = pkg.browser[Object.keys(pkg.browser)[0]];
                                }
                            }
                            return pkg;
                        }
                    });
                    return { path: resolvedPath };
                });
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsaUVBQThDO0FBQzlDLGdGQUEwRDtBQUMxRCx1RUFBaUQ7QUFHakQseUVBQW1FO0FBQ25FLHlEQUFtQztBQUNuQyxzRUFBZ0Q7QUFDaEQsbUVBQTZDO0FBQzdDLHlEQUFxQztBQUNyQyxnREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLHFFQUErQztBQUMvQyxpRUFBMkM7QUFDM0Msc0RBQWdDO0FBQ2hDLHlFQUFtRDtBQUNuRCx5RkFBbUU7QUFDbkUsbURBQXFDO0FBRXJDLHdHQUFrRjtBQTZDbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsbUJBQVc7SUFrSG5DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBeUMsRUFDekMsUUFBa0M7UUFFbEMsS0FBSyxDQUNILGFBQWEsRUFDYixtQkFBVyxDQUNUO1lBQ0UsZUFBZSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDO0lBMkJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNOLE1BQTBCLEVBQzFCLFdBQXlDLEVBQUU7UUFFM0MsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDOUQsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZ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