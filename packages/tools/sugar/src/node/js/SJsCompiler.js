"use strict";
// @ts-nocheck
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
var _a;
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
// import __esbuild from 'esbuild';
const buildInNodeModules_1 = __importDefault(require("../module/buildInNodeModules"));
const resolve_1 = __importDefault(require("resolve"));
const filter_1 = __importDefault(require("../object/filter"));
const SBuildJsInterface_1 = __importDefault(require("./build/interface/SBuildJsInterface"));
const esbuildScssLoaderPlugin_1 = __importDefault(require("./build/plugins/esbuild/esbuildScssLoaderPlugin"));
const __esbuild = require('esbuild');
/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js
 * @type                Class
 * @wip
 *
 * This class wrap the "esbuild" compiler with some additional features to compile your js files
 * quicky and efficiently
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 10-100x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://github.com/evanw/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _rootDir;
module.exports = (_a = class SJsCompiler {
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
        constructor(settings = {}) {
            /**
             * @name            _settings
             * @type            Object
             * @private
             *
             * Store the instance settings
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            this._settings = deepMerge_1.default(Object.assign(Object.assign({ id: this.constructor.name }, SBuildJsInterface_1.default.defaults()), { plugins: [] }), settings);
            this._settings.plugins.unshift(this.constructor._resolverPlugin);
            this._settings.plugins.unshift(esbuildScssLoaderPlugin_1.default);
            // prod
            if (this._settings.prod) {
                this._settings.bundle = true;
                this._settings.minify = true;
            }
        }
        /**
         * @name              compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            filePath          The source you want to compile. Must be a file path
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        compile(filePath, settings = {}) {
            return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                settings = deepMerge_1.default(this._settings, settings);
                _rootDir = settings.rootDir;
                const banner = settings.banner || '';
                settings = filter_1.default(settings, (key, value) => {
                    if (Array.isArray(value) && !value.length)
                        return false;
                    return this.constructor._esbuildAcceptedSettings.indexOf(key) !== -1;
                });
                const startTime = Date.now();
                const buildService = yield __esbuild.startService();
                buildService
                    .build(Object.assign(Object.assign({}, settings), { entryPoints: [filePath], logLevel: 'silent', write: false, sourcemap: settings.map, charset: 'utf8' }))
                    .then((resultObj) => {
                    // resolve with the compilation result
                    resolve({
                        js: `
                ${banner}
                let process = {};
                ${resultObj.outputFiles[0].text}
              `,
                        startTime: startTime,
                        endTime: Date.now(),
                        duration: Date.now() - startTime
                    });
                });
            }), {
                id: this._settings.id
            });
        }
    },
    /**
     * @name            _resolverPlugin
     * @type            Object
     * @static
     *
     * ESBuild resolver plugin
     *
     * @since       2.0.0
     */
    _a._resolverPlugin = {
        name: 'SFrontendServerEsBuildResolvePlugin',
        setup(build) {
            Object.keys(buildInNodeModules_1.default).forEach((path) => {
                const builtInObj = buildInNodeModules_1.default[path];
                if (builtInObj.polyfill && builtInObj.polyfill.browser) {
                    build.onResolve({ filter: new RegExp(`^${path}$`) }, (args) => {
                        let resolvedPath = resolve_1.default.sync(builtInObj.polyfill.browser, {
                            basedir: _rootDir,
                            moduleDirectory: ['node_modules'],
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
    },
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
    _a._esbuildAcceptedSettings = [
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
    ],
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRUFBOEM7QUFDOUMsbUVBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyxzRkFBZ0U7QUFDaEUsc0RBQWdDO0FBQ2hDLDhEQUF3QztBQUN4Qyw0RkFBc0U7QUFDdEUsOEdBQXdGO0FBRXhGLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxJQUFJLFFBQVEsQ0FBQztBQUViLHVCQUFTLE1BQU0sV0FBVztRQXFHeEI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQTlHekI7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQXFHYixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLCtCQUV4QixFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQ3RCLDJCQUFtQixDQUFDLFFBQVEsRUFBRSxLQUNqQyxPQUFPLEVBQUUsRUFBRSxLQUViLFFBQVEsQ0FDVCxDQUFDO1lBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLENBQUM7WUFFMUQsT0FBTztZQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQztRQUVE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