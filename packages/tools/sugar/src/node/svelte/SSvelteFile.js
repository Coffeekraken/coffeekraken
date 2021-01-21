"use strict";
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
exports.SSvelteFileCtorSettingsInterface = exports.SSvelteFileSettingsInterface = void 0;
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SFileCache_1 = __importDefault(require("../cache/SFileCache"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SSvelteCompiler_1 = require("./compile/SSvelteCompiler");
/**
 * @name          SSvelteFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteFileSettingsInterface extends SInterface_1.default {
}
exports.SSvelteFileSettingsInterface = SSvelteFileSettingsInterface;
/**
 * @name          SSvelteFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteFileCtorSettingsInterface extends SInterface_1.default {
}
exports.SSvelteFileCtorSettingsInterface = SSvelteFileCtorSettingsInterface;
class SSvelteFile extends SFile_1.default {
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
            svelteFile: {}
        }, settings));
        /**
         * @name        _watch
         * @type        Function
         * @private
         *
         * Start to watch the file. Does this only once
         * to avoid multiple compilation and logs
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._alreadyWatch = false;
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISSvelteFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
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
        this._currentCompilationSettings = {};
        this._currentCompilationParams = {};
        // store this instance in a stack to avoid creating multiple instances of the same file
        SSvelteFile.FILES[this.path] = this;
        this._fileCache = new SFileCache_1.default(this.constructor.name);
    }
    /**
     * @name      svelteFileSettings
     * @type      ISSvelteFileSettings
     * @get
     *
     * Access the svelteFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteFileSettings() {
        return this._settings.svelteFile;
    }
    _watch() {
        if (this._alreadyWatch)
            return;
        this._alreadyWatch = true;
        if (!this._currentCompilationParams)
            return;
        // start watching the file if needed
        if (this._currentCompilationParams.watch) {
            this.startWatch();
        }
        // listen for change event
        this.on('update', (file, metas) => {
            if (this._currentCompilationParams.compileOnChange) {
                const promise = this.compile(this._currentCompilationParams);
                this.emit('log', {
                    value: `<blue>[updated]</blue> "<cyan>${file.relPath}</cyan>"`
                });
            }
        });
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.svelteFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        this.applyInterface('compilerParams', params);
        if (params.watch) {
            this._watch();
        }
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
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
            // svelte settings
            const svelteSettings = Object.assign({ sourceMap: params.map !== undefined
                    ? params.map
                    : sugar_1.default('scss.compile.map') }, (params.svelte || {}));
            emit('log', {
                type: 'separator'
            });
            // notify start
            emit('log', {
                value: `Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            if (params.clearCache)
                yield this._fileCache.clear();
            let toCompile = this.content;
            //   // check cache
            //   const cachedValue = await this._fileCache.get(this.path);
            //   if (
            //     cachedValue &&
            //     params.cache
            //   ) {
            //     // console.log('from cache');
            //     let result = cachedValue.js;
            //     SSvelteFile.COMPILED_SVELTE[this.path] = result;
            //     emit('log', {
            //       value: `<green>[from cache]</green> "<cyan>${this.relPath}</cyan>"`
            //     });
            //     // check if need to save
            //     if (params.save && params.outputDir) {
            //       // build the save path
            //       const savePath = __path.resolve(
            //         params.outputDir,
            //         this.path
            //           .replace(`${params.rootDir}/`, '')
            //           .replace(/\.svelte$/, '.js')
            //       );
            //       emit('log', {
            //         value: `Saving the file "<cyan>${
            //           this.relPath
            //         }</cyan>" to "<magenta>${savePath.replace(
            //           `${__sugarConfig('storage.rootDir')}/`,
            //           ''
            //         )}</magenta>" `
            //       });
            //       this.writeSync(result, {
            //         path: savePath
            //       });
            //       // notify end
            //       const time = duration.end();
            //       emit('log', {
            //         value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
            //       });
            //       if (params.watch) {
            //         emit('log', {
            //           value: `<blue>Watching for changes...</blue>`
            //         });
            //       }
            //     }
            //     return resolve(result);
            //   }
            let renderObj;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
                });
                // RENDERING HERE
                // save in cache
                if (params.cache) {
                    // console.log('save in cache', this.path);
                    // @ts-ignore
                    yield this._fileCache.set(this.path, {
                        js: renderObj.js.toString()
                    });
                }
                let result = renderObj.js.toString();
                // check if need to save
                if (params.save && params.outputDir) {
                    // build the save path
                    const savePath = path_1.default.resolve(params.outputDir, this.path
                        .replace(`${params.rootDir}/`, '')
                        .replace(/\.svelte$/, '.js'));
                    emit('log', {
                        value: `Saving the file "<cyan>${this.relPath}</cyan>" to "<magenta>${savePath.replace(`${sugar_1.default('storage.rootDir')}/`, '')}</magenta>" `
                    });
                    this.writeSync(result, {
                        path: savePath
                    });
                }
                // notify end
                const time = duration.end();
                emit('log', {
                    value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
                });
                if (params.watch) {
                    emit('log', {
                        value: `<blue>Watching for changes...</blue>`
                    });
                }
                return resolve(result);
            }
            catch (e) {
                // .log(e);
                return reject(e.toString());
            }
            return true;
        }));
    }
    update() {
        super.update();
    }
}
SSvelteFile.interfaces = {
    // ...__SFile.interfaces,
    compilerParams: {
        apply: false,
        class: SSvelteCompiler_1.SSvelteCompilerParamsInterface
    }
    // _settings: {
    //   apply: true,
    //   class: SSvelteFileCtorSettingsInterface
    // }
};
SSvelteFile.COMPILED_SVELTE = {};
SSvelteFile.FILES = {};
// import getExtendsStack from '../class/getExtendsStack';
// class Sup {
//   static coco = {
//     hello: 'world'
//   };
//   constructor() {
//     console.log(
//       getExtendsStack(this, {
//         includeBaseClass: true
//       })
//     );
//   }
// }
// class Middle extends Sup {
//   static coco = {
//     plop: 'OPOP',
//     hello: 'HELLO'
//   };
//   constructor() {
//     super();
//   }
// }
// class Sub extends Middle {
//   static coco = {
//     plop: 'rop',
//     hello: 'hello'
//   };
//   constructor() {
//     super();
//   }
// }
// const sub = new Sub();
exports.default = SSvelteFile;
//# sourceMappingURL=SSvelteFile.js.map