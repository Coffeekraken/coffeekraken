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
const resolve_1 = __importDefault(require("../module/resolve"));
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
                const reg = /\sfrom\s['"`](.*)['"`];?/gm;
                let match = reg.exec(code);
                do {
                    if (!match)
                        continue;
                    if (match[1].match(/^[\.\/]/))
                        continue;
                    // const absPath = `${__sugarConfig('storage.nodeModulesDir')}/${match[1]}`;
                    // if (__fs.existsSync())
                    const res = resolve_1.default(match[1], {
                        fields: params.format === 'esm'
                            ? ['module', 'main', 'browser']
                            : ['main', 'browser', 'module']
                    });
                    if (res) {
                        code = code.replace(match[0], ` from "${res.replace(sugar_1.default('storage.rootDir'), '')}";`);
                    }
                } while ((match = reg.exec(code)) !== null);
                return code;
            }
            const resultJs = rewriteImports([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFFNUMsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsNERBQTRDO0FBRzVDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFDM0MsbURBQXFDO0FBQ3JDLDhEQUF3QztBQUd4Qyw2RUFBdUQ7QUFDdkQsZ0VBQTBDO0FBRTFDLHlFQUFtRDtBQUNuRCx3RUFBMEU7QUFDMUUsZ0hBQTBGO0FBRTFGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLHdCQUF5QixTQUFRLG9CQUFZO0NBRXpEO0FBRkQsNERBRUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw0QkFBNkIsU0FBUSxvQkFBWTtDQVE3RDtBQVJELG9FQVFDO0FBa0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxhQUFhO0FBQ2IsTUFBTSxPQUFRLFNBQVEsZUFBTztJQTJCM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBaUMsRUFBRTtRQUMzRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFZSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBUSxJQUFJLENBQUM7UUFDakMsZ0NBQTJCLEdBQThCLEVBQUUsQ0FBQztRQUM1RCw4QkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1FBL0IxRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzNC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