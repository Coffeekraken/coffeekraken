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
    /**
     * @name        _startWatch
     * @type        Function
     * @private
     *
     * Start to watch the file. Does this only once
     * to avoid multiple compilation and logs
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _startWatch() {
        // listen for change event
        this.on('update', (file, metas) => {
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams);
                this.emit('log', {
                    clear: true,
                    type: 'file',
                    action: 'update',
                    file
                });
            }
        });
    }
    compile(params, settings) {
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
            params = this.applyInterface('compilerParams', params);
            // if (params.watch) {
            //   this.startWatch();
            // }
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
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
                value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
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
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: 'iife' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return SJsCompiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, watch: params.watch
                    ? {
                        onRebuild: (error, result) => {
                            this._watchEsbuildProcess = result;
                            emit('log', {
                                clear: true,
                                type: 'time'
                            });
                            if (error) {
                                emit('error', {
                                    value: error
                                });
                                return;
                            }
                            const logStrArray = [];
                            logStrArray.push(`<green>[compiled]</green> File "<cyan>${this.relPath}</cyan>" <green>compiled successfully</green>`);
                            if (params.save) {
                                logStrArray.push(`<green>[saved]</green> File "<cyan>${this.relPath}</cyan>" <green>saved successfully</green> to "<magenta>${savePath.replace(`${sugar_1.default('storage.rootDir')}/`, '')}</magenta>"`);
                            }
                            emit('log', {
                                value: logStrArray.join('\n')
                            });
                            emit('log', {
                                type: 'separator'
                            });
                            if (params.watch) {
                                emit('log', {
                                    value: `<blue>[watch] </blue>Watching for changes...`
                                });
                            }
                        }
                    }
                    : false, minify: params.minify, sourcemap: params.map }), params.esbuild);
            const buildPromise = new Promise((buildResolve, buildReject) => __awaiter(this, void 0, void 0, function* () {
                const buildService = yield __esbuild.startService();
                buildService
                    .build(esbuildParams)
                    .then((resultObj) => {
                    buildResolve(resultObj);
                })
                    .catch((e) => buildReject(e));
            }));
            const resultObj = yield buildPromise;
            const resultJs = [
                params.banner || '',
                'let process = {};' + resultObj.outputFiles[0].text
            ].join('\n');
            // check if need to save
            if (params.save) {
                // build the save path
                emit('log', {
                    type: 'file',
                    file: this,
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
                    //   file: this
                    // });
                }
                emit('log', {
                    type: 'file',
                    action: 'saved',
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    file: this
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsNERBQTRDO0FBRzVDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFDM0MsbURBQXFDO0FBRXJDLDhEQUF3QztBQUd4Qyw2RUFBdUQ7QUFFdkQseUVBQW1EO0FBQ25ELHdFQUEwRTtBQUMxRSxnSEFBMEY7QUFFMUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsd0JBQXlCLFNBQVEsb0JBQVk7Q0FFekQ7QUFGRCw0REFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBUTdEO0FBUkQsb0VBUUM7QUFrQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLE9BQVEsU0FBUSxlQUFPO0lBMkIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFpQyxFQUFFO1FBQzNELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXdDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBUSxJQUFJLENBQUM7UUFDakMsZ0NBQTJCLEdBQThCLEVBQUUsQ0FBQztRQUM1RCw4QkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1FBM0QxRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzNCLElBQUksQ0FBQyxX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