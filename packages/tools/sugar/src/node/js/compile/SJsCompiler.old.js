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
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const absolute_1 = __importDefault(require("../../../shared/path/absolute"));
const glob_1 = __importDefault(require("../../../shared/is/glob"));
const glob_2 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const SDuration_1 = __importDefault(require("../../../shared/time/SDuration"));
const filter_1 = __importDefault(require("../../../shared/object/filter"));
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
 * @param         {Partial<ISJsCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
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
        return new s_promise_1.default(({ resolve, reject, pipe, emit }) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                settings = deepMerge_1.default(this.jsCompilerSettings, {}, settings);
                let input = Array.isArray(params.input) ? params.input : [params.input];
                // prod
                if (params.prod || params.bundle) {
                    params.minify = true;
                    params.stripComments = true;
                    params.map = false;
                }
                let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: 'iife', logLevel: 'silent' }, filter_1.default(params, (key, value) => {
                    if (Array.isArray(value) && !value.length)
                        return false;
                    return (this.constructor._esbuildAcceptedSettings.indexOf(key) !==
                        -1);
                })), { bundle: params.bundle, write: params.save, 
                    // outfile: 'out.js',
                    outdir: params.outputDir, minify: params.minify, sourcemap: params.map }), params.esbuild);
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
                console.log(esbuildParams);
                const esbuildService = yield __esbuild.startService();
                const esbuildResult = yield esbuildService.build(esbuildParams);
                console.log(esbuildResult);
                const resultsObj = {};
                const duration = new SDuration_1.default();
                // for (let i = 0; i < filesPaths.length; i++) {
                //   let filePath = filesPaths[i];
                //   let file = new __SJsFile(filePath, {
                //     jsFile: {
                //       compile: settings
                //     }
                //   });
                //   pipe(file);
                //   const resPromise = file.compile(params, {
                //     ...settings
                //   });
                //   const res = await resPromise;
                //   resultsObj[file.path] = res;
                // }
                // resolve with the compilation result
                if (!params.watch) {
                    resolve(Object.assign({ files: resultsObj }, duration.end()));
                }
                else {
                    emit('files', Object.assign({ files: resultsObj }, duration.end()));
                }
            }))();
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIub2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0pzQ29tcGlsZXIub2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJZCxpRkFBMkQ7QUFHM0QseUVBQW1FO0FBRW5FLHdFQUFpRDtBQUNqRCw2RUFBdUQ7QUFDdkQsbUVBQStDO0FBQy9DLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsK0VBQXlEO0FBQ3pELDJFQUFxRDtBQUNyRCxzREFBZ0M7QUFDaEMseUVBQW1EO0FBQ25ELHlGQUFtRTtBQUNuRSxtREFBcUM7QUFHckMsd0dBQWtGO0FBMkJsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQWtIbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEwQyxFQUMxQyxRQUFrQztRQUVsQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxlQUFlLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxDQUFDLEdBQVMsRUFBRTtnQkFDVixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUU5RCxJQUFJ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