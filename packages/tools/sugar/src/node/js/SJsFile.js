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
const extractImport_1 = __importDefault(require("../module/extractImport"));
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
            const _this = this;
            let exampleOnResolvePlugin = {
                name: 'example',
                setup(build) {
                    build.onResolve({ filter: /.*/ }, (args) => {
                        // if (args.path === _this.path) return { path: args.path };
                        // const depFile = new SJsFile(args.path, _this._settings);
                        const imports = extractImport_1.default(_this.content);
                        console.log(imports);
                        return { path: args.path };
                        return { path: path_1.default.join(args.resolveDir, args.path) };
                        // return { path: path.join(args.resolveDir, 'public', args.path) };
                    });
                }
            };
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', format: params.format, logLevel: 'info' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return SJsCompiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, errorLimit: 100, minify: params.minify, sourcemap: params.map, plugins: [exampleOnResolvePlugin] }), params.esbuild);
            // return;
            let resultObj;
            try {
                resultObj = yield __esbuild.build(esbuildParams);
            }
            catch (e) {
                return reject(e);
            }
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
            // return resolve({
            //   js: resultJs,
            //   map: undefined, // @todo      handle map
            //   esbuild: resultObj,
            //   ...duration.end()
            // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFFNUMsZ0RBQTBCO0FBQzFCLHdFQUFpRDtBQUNqRCxvRUFBOEM7QUFJOUMsd0RBQWtDO0FBQ2xDLDhEQUEyQztBQUMzQyxtREFBcUM7QUFDckMsOERBQXdDO0FBR3hDLDZFQUF1RDtBQUl2RCw0RUFBc0Q7QUFFdEQseUVBQW1EO0FBQ25ELHdFQUEwRTtBQUMxRSxnSEFBMEY7QUFFMUY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsd0JBQXlCLFNBQVEsb0JBQVk7Q0FFekQ7QUFGRCw0REFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBUTdEO0FBUkQsb0VBUUM7QUFrQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLE9BQVEsU0FBUSxlQUFPO0lBMkIzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFpQyxFQUFFO1FBQzNELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQVlKOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxnQ0FBMkIsR0FBOEIsRUFBRSxDQUFDO1FBQzVELDhCQUF5QixHQUFnQyxFQUFFLENBQUM7UUEvQjFELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDM0IsSUFBSSxDQUFDLFdB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