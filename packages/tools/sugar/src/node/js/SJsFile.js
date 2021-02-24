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
    compile(params, settings) {
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
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
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return SJsCompiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, errorLimit: 100, minify: params.minify, sourcemap: params.map }), params.esbuild);
            let resultObj;
            try {
                resultObj = __esbuild.buildSync(esbuildParams);
            }
            catch (e) {
                return reject(e);
            }
            const resultJs = [
                params.banner || '',
                'let process = {};' + resultObj.outputFiles[0].text
            ].join('\n');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsNERBQTRDO0FBRzVDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFDM0MsbURBQXFDO0FBRXJDLDhEQUF3QztBQUd4Qyw2RUFBdUQ7QUFNdkQseUVBQW1EO0FBQ25ELHdFQUEwRTtBQUMxRSxnSEFBMEY7QUFFMUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsd0JBQXlCLFNBQVEsb0JBQVk7Q0FFekQ7QUFGRCw0REFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBUTdEO0FBUkQsb0VBUUM7QUFrQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLE9BQVEsU0FBUSxlQUFPO0lBMkIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFpQyxFQUFFO1FBQzNELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQVlKOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxnQ0FBMkIsR0FBOEIsRUFBRSxDQUFDO1FBQzVELDhCQUF5QixHQUFnQyxFQUFFLENBQUM7UUEvQjFELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDM0IsSUFBSSxDQUFDLFdB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