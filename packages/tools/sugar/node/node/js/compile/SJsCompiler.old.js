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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIub2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvanMvY29tcGlsZS9TSnNDb21waWxlci5vbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlkLHVFQUFpRDtBQUdqRCx5RUFBbUU7QUFFbkUsd0VBQWlEO0FBQ2pELG1FQUE2QztBQUM3Qyx5REFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixxRUFBK0M7QUFDL0MsaUVBQTJDO0FBQzNDLHNEQUFnQztBQUNoQyx5RUFBbUQ7QUFDbkQseUZBQW1FO0FBQ25FLG1EQUFxQztBQUdyQyx3R0FBa0Y7QUEyQmxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sV0FBWSxTQUFRLG1CQUFXO0lBa0huQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTBDLEVBQzFDLFFBQWtDO1FBRWxDLEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLGVBQWUsRUFBRSxFQUFFO1NBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUEwQixFQUMxQixXQUEwQyxFQUFFO1FBRTVDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hELENBQUMsR0FBUyxFQUFFO2dCQUNWLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFF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