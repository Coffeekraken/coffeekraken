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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const __esbuild = __importStar(require("esbuild"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const resolve_1 = __importDefault(require("resolve"));
const glob_2 = __importDefault(require("../../../shared/is/glob"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const filter_1 = __importDefault(require("../../../shared/object/filter"));
const absolute_1 = __importDefault(require("../../../shared/path/absolute"));
const SDuration_1 = __importDefault(require("../../../shared/time/SDuration"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const buildInNodeModules_1 = __importDefault(require("../../module/buildInNodeModules"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
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
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
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
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
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
                const esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: 'iife', logLevel: 'silent' }, filter_1.default(params, (key, value) => {
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
                    if (glob_2.default(inputStr)) {
                        filesPaths = [...filesPaths, ...glob_1.default.sync(inputStr)];
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
                    const resolvedPath = resolve_1.default.sync(builtInObj.polyfill.browser, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIub2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0pzQ29tcGlsZXIub2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsbURBQXFDO0FBQ3JDLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLG1FQUErQztBQUMvQyxpRkFBMkQ7QUFDM0QsMkVBQXFEO0FBQ3JELDZFQUF1RDtBQUN2RCwrRUFBeUQ7QUFDekQseUVBQW1FO0FBQ25FLHlGQUFtRTtBQUNuRSx5RUFBbUQ7QUFDbkQsd0dBQWtGO0FBMkJsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQWtIbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEwQyxFQUMxQyxRQUFrQztRQUVsQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxlQUFlLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBMEIsRUFDMUIsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxDQUFDLEdBQVMsRUFBRTtnQkFDVixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUU5RCxJQUFJ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