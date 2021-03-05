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
exports.SJsFileCtorSettingsInterface = exports.SJsFileSettingsInterface = void 0;
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const __esbuild = __importStar(require("esbuild"));
const filter_1 = __importDefault(require("../object/filter"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const dependencyTree_1 = __importDefault(require("../module/dependencyTree"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SJsCompiler_1 = __importDefault(require("./compile/SJsCompiler"));
const SJsCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SJsCompilerParamsInterface"));
/**
 * @name          SJsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsFileSettingsInterface extends SInterface_1.default {
}
exports.SJsFileSettingsInterface = SJsFileSettingsInterface;
/**
 * @name          SJsFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsFileCtorSettingsInterface extends SInterface_1.default {
}
exports.SJsFileCtorSettingsInterface = SJsFileCtorSettingsInterface;
/**
 * @name            SJsFile
 * @namespace       sugar.node.js
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a javascript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISJsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SJsFile from '@coffeekraken/sugar/node/js/SJsFile';
 * const file = new SJsFile('/my/cool/file.js');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SJsFile extends SFile_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            jsFile: {
                plugins: []
            }
        }, settings));
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISJsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
         *
         * @setting       {Boolean}           [minify=false]          Specify if you want to minify the output
         * @setting       {Boolean}           [stripComments=false]       Specify if you want to remove all the comments from the output
         * @setting       {Boolean}              [cache=true]             Specify if you want to make use of the cache or not
         * @setting       {Boolean}           [clearCache=false]          Specify if you want to clear the cache before compilation
         * @setting       {String}            [sharedResources=null]      Specify some scss code that you want to be present in every compiled files
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isCompiling = false;
        this._watchEsbuildProcess = null;
        this._currentCompilationSettings = {};
        this._currentCompilationParams = {};
        this.jsFileSettings.plugins.unshift(this.constructor._resolverPlugin);
        // this.jsFileSettings.plugins.unshift(__esbuildScssLoaderPlugin);
        onProcessExit_1.default(() => {
            if (this._watchEsbuildProcess)
                this._watchEsbuildProcess.stop();
        });
    }
    /**
     * @name      jsFileSettings
     * @type      ISJsFileSettings
     * @get
     *
     * Access the jsFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsFileSettings() {
        return this._settings.jsFile;
    }
    compile(params, settings) {
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeFrom, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
            const tree = yield dependencyTree_1.default(this.path);
            console.log(tree);
            return;
            params = this.applyInterface('compilerParams', params);
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            emit('notification', {
                title: `${this.id} compilation started`
            });
            emit('log', {
                clear: true,
                type: 'time'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            emit('log', {
                value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
            });
            // prod
            if (params.prod || params.bundle) {
                params.minify = true;
                params.stripComments = true;
                params.map = false;
            }
            let savePath;
            if (params.outputDir === undefined) {
                savePath = this.path.replace(/\.js$/, '.compiled.js');
            }
            else {
                savePath = path_1.default.resolve(params.outputDir, this.path.replace(`${params.rootDir}/`, ''));
            }
            // let exampleOnResolvePlugin = {
            //   name: 'example',
            //   setup(build) {
            //     build.onResolve({ filter: /.*/ }, (args) => {
            //       console.log(args.path);
            //       return { path: __path.join(args.resolveDir, args.path) };
            //       // return { path: path.join(args.resolveDir, 'public', args.path) };
            //     });
            //   }
            // };
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return SJsCompiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, errorLimit: 100, minify: params.minify, sourcemap: params.map }), params.esbuild);
            let resultObj;
            try {
                resultObj = yield __esbuild.build(esbuildParams);
            }
            catch (e) {
                return reject(e);
            }
            function rewriteImports(code) {
                return __awaiter(this, void 0, void 0, function* () {
                    return '';
                    // const reg = /\sfrom\s['"`](.*)['"`];?/gm;
                    // let match = reg.exec(code);
                    // do {
                    //   if (!match) continue;
                    //   if (match[1].match(/^[\.\/]/)) continue;
                    //   // const absPath = `${__sugarConfig('storage.nodeModulesDir')}/${match[1]}`;
                    //   // if (__fs.existsSync())
                    //   const res = __resolve(match[1], {
                    //     fields:
                    //       params.format === 'esm'
                    //         ? ['module', 'main', 'browser']
                    //         : ['main', 'browser', 'module']
                    //   });
                    //   if (res) {
                    //     const list = await pipeFrom(
                    //       __dependencyTree(res, {
                    //         // cache: true
                    //       })
                    //     );
                    //     nativeConsole.log(list);
                    //     code = code.replace(
                    //       match[0],
                    //       ` from "${res.replace(__sugarConfig('storage.rootDir'), '')}";`
                    //     );
                    //   }
                    // } while ((match = reg.exec(code)) !== null);
                    // return code;
                });
            }
            const resultJs = yield rewriteImports([
                params.banner || '',
                'let process = {};' + resultObj.outputFiles[0].text
            ].join('\n'));
            // check if need to save
            if (params.save) {
                // build the save path
                emit('log', {
                    type: 'file',
                    file: this.toObject(),
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    action: 'save'
                });
                this.writeSync(resultJs, {
                    path: savePath
                });
                if (params.map) {
                    // this.writeSync(result.js.map.toString(), {
                    //   path: savePath.replace(/\.js$/, '.js.map')
                    // });
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'saved',
                    //   to: savePath
                    //     .replace(/\.js$/, '.js.map')
                    //     .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this.toObject()
                    // });
                }
                emit('log', {
                    type: 'file',
                    action: 'saved',
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    file: this.toObject()
                });
            }
            emit('log', {
                type: 'separator'
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch] </blue>Watching for changes...`
                });
            }
            return resolve(Object.assign({ js: resultJs, map: undefined, esbuild: resultObj }, duration.end()));
        }));
    }
}
SJsFile.interfaces = {
    compilerParams: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SJsFileCtorSettingsInterface
    }
};
exports.default = SJsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFFNUMsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsNERBQTRDO0FBSTVDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFDM0MsbURBQXFDO0FBQ3JDLDhEQUF3QztBQUd4Qyw2RUFBdUQ7QUFFdkQsOEVBQXdEO0FBR3hELHlFQUFtRDtBQUNuRCx3RUFBMEU7QUFDMUUsZ0hBQTBGO0FBRTFGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLHdCQUF5QixTQUFRLG9CQUFZO0NBRXpEO0FBRkQsNERBRUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw0QkFBNkIsU0FBUSxvQkFBWTtDQVE3RDtBQVJELG9FQVFDO0FBa0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxhQUFhO0FBQ2IsTUFBTSxPQUFRLFNBQVEsZUFBTztJQTJCM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBaUMsRUFBRTtRQUMzRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFZSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBUSxJQUFJLENBQUM7UUFDakMsZ0NBQTJCLEdBQThCLEVBQUUsQ0FBQztRQUM1RCw4QkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1FBL0IxRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzNC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