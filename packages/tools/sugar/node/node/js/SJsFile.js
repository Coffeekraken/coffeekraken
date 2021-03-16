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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const __esbuild = __importStar(require("esbuild"));
const filter_1 = __importDefault(require("../object/filter"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
const aggregateLibs_1 = __importDefault(require("../esbuild/plugins/aggregateLibs"));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipeFrom, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
            // const tree = await __dependencyTree(this.path);
            // console.log(tree);
            // return;
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
            //   //     nativeConsole.log(list);
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
        class: SJsCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SJsFileCtorSettingsInterface
    }
};
exports.default = SJsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2pzL1NKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFFNUMsZ0RBQTBCO0FBQzFCLHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFJOUMsd0RBQWtDO0FBQ2xDLDhEQUEyQztBQUMzQyxtREFBcUM7QUFDckMsOERBQXdDO0FBR3hDLDZFQUF1RDtBQUt2RCxxRkFBNEU7QUFFNUUseUVBQW1EO0FBQ25ELHdFQUEwRTtBQUMxRSxnSEFBMEY7QUFFMUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsd0JBQXlCLFNBQVEsb0JBQVk7Q0FFekQ7QUFGRCw0REFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBUTdEO0FBUkQsb0VBUUM7QUFrQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLE9BQVEsU0FBUSxlQUFPO0lBMkIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFpQyxFQUFFO1FBQzNELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLEVBQUU7Z0JBQ0osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN2RDtZQUNELE1BQU0sRUFBRTtnQkFDTixPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBWUo7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIs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