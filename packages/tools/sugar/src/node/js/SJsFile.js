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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const __esbuild = __importStar(require("esbuild"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const filter_1 = __importDefault(require("../../shared/object/filter"));
const SDuration_1 = __importDefault(require("../../shared/time/SDuration"));
const wait_1 = __importDefault(require("../../shared/time/wait"));
const aggregateLibs_1 = __importDefault(require("../esbuild/plugins/aggregateLibs"));
const filename_1 = __importDefault(require("../fs/filename"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const s_js_compiler_1 = __importStar(require("@coffeekraken/s-js-compiler"));
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
class SJsFileSettingsInterface extends s_interface_1.default {
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
class SJsFileCtorSettingsInterface extends s_interface_1.default {
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
 * @param       {String}            path            The path to the scss file
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
            file: {
                sourcesExtensions: [path.match(/\.jsx?$/) ? 'ts' : '']
            },
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
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
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
        return new s_promise_1.default(({ resolve, reject, emit, pipeFrom, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
            // const tree = await __dependencyTree(this.path);
            // console.log(tree);
            // return;
            // @weird:ts-compilation-issue
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
                // @weird:ts-compilation-issue
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
            const esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return s_js_compiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, errorLimit: 100, minify: params.minify, sourcemap: params.map, plugins: [
                    aggregateLibs_1.default({
                        outputDir: params.outputDir,
                        rootDir: params.rootDir
                    })
                ] }), params.esbuild);
            let resultObj;
            try {
                resultObj = yield __esbuild.build(esbuildParams);
            }
            catch (e) {
                console.log(e);
                return reject(e);
            }
            return resolve(true);
            // async function rewriteImports(code) {
            //   return '';
            //   // const reg = /\sfrom\s['"`](.*)['"`];?/gm;
            //   // let match = reg.exec(code);
            //   // do {
            //   //   if (!match) continue;
            //   //   if (match[1].match(/^[\.\/]/)) continue;
            //   //   // const absPath = `${__sugarConfig('storage.nodeModulesDir')}/${match[1]}`;
            //   //   // if (__fs.existsSync())
            //   //   const res = __resolve(match[1], {
            //   //     fields:
            //   //       params.format === 'esm'
            //   //         ? ['module', 'main', 'browser']
            //   //         : ['main', 'browser', 'module']
            //   //   });
            //   //   if (res) {
            //   //     const list = await pipeFrom(
            //   //       __dependencyTree(res, {
            //   //         // cache: true
            //   //       })
            //   //     );
            //   //     _console.log(list);
            //   //     code = code.replace(
            //   //       match[0],
            //   //       ` from "${res.replace(__sugarConfig('storage.rootDir'), '')}";`
            //   //     );
            //   //   }
            //   // } while ((match = reg.exec(code)) !== null);
            //   // return code;
            // }
            // const resultJs = await rewriteImports(
            //   [
            //     params.banner || '',
            //     'let process = {};' + resultObj.outputFiles[0].text
            //   ].join('\n')
            // );
            // // check if need to save
            // if (params.save) {
            //   // build the save path
            //   emit('log', {
            //     type: 'file',
            //     file: this.toObject(),
            //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            //     action: 'save'
            //   });
            //   this.writeSync(resultJs, {
            //     path: savePath
            //   });
            //   if (params.map) {
            //     // this.writeSync(result.js.map.toString(), {
            //     //   path: savePath.replace(/\.js$/, '.js.map')
            //     // });
            //     // emit('log', {
            //     //   type: 'file',
            //     //   action: 'saved',
            //     //   to: savePath
            //     //     .replace(/\.js$/, '.js.map')
            //     //     .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            //     //   file: this.toObject()
            //     // });
            //   }
            //   emit('log', {
            //     type: 'file',
            //     action: 'saved',
            //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            //     file: this.toObject()
            //   });
            // }
            // emit('log', {
            //   type: 'separator'
            // });
            // if (params.watch) {
            //   emit('log', {
            //     value: `<blue>[watch] </blue>Watching for changes...`
            //   });
            // }
            return resolve(Object.assign({ js: 'efewf', map: undefined, esbuild: resultObj }, duration.end()));
        }));
    }
}
SJsFile.interfaces = {
    compilerParams: {
        apply: false,
        class: s_js_compiler_1.SJsCompilerInterface
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SJsFileCtorSettingsInterface
    }
};
exports.default = SJsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxtREFBcUM7QUFDckMsZ0RBQTBCO0FBQzFCLDhFQUF3RDtBQUN4RCx3RUFBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELGtFQUE0QztBQUM1QyxxRkFBNEU7QUFDNUUsOERBQTJDO0FBQzNDLHdEQUFrQztBQUNsQyw0RUFBcUQ7QUFDckQsNkVBQXVEO0FBQ3ZELDZFQUdxQztBQUVyQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSx3QkFBeUIsU0FBUSxxQkFBWTtDQUV6RDtBQUZELDREQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEscUJBQVk7Q0FRN0Q7QUFSRCxvRUFRQztBQWtCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLE1BQU0sT0FBUSxTQUFRLGVBQU87SUEyQjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQWlDLEVBQUU7UUFDM0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUksRUFBRTtnQkFDSixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3ZEO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxFQUFFO2FBQ1o7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFZSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBUSxJQUFJLENBQUM7UUFDakMsZ0NBQTJC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