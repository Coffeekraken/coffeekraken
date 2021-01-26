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
const __svelte = require('svelte/compiler');
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SSvelteCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SSvelteCompilerParamsInterface"));
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
// @ts-ignore
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
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams);
                this.emit('log', {
                    type: 'file',
                    action: 'update',
                    file
                });
            }
        });
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.svelteFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        params = this.applyInterface('compilerParams', params);
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
            emit('log', {
                type: 'separator'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            let toCompile = this.content;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
                });
                // RENDERING HERE
                const result = __svelte.compile(toCompile, Object.assign({ filename: this.name, dev: !params.prod, preserveComments: !params.stripComments, preserveWhitespace: !params.prod, outputFilename: this.name, cssOutputFilename: this.name }, (params.svelte || {})));
                result.warnings.forEach((warning) => {
                    emit('warn', {
                        value: warning.toString()
                    });
                });
                // nativeConsole.log(result);
                // check if need to save
                if (params.save && params.outputDir) {
                    // build the save path
                    const savePath = path_1.default.resolve(params.outputDir, this.path
                        .replace(`${params.rootDir}/`, '')
                        .replace(/\.svelte$/, '.js'));
                    emit('log', {
                        type: 'file',
                        file: this,
                        to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                        action: 'save'
                    });
                    this.writeSync(result.js.code, {
                        path: savePath
                    });
                    // notify end
                    const time = duration.end();
                    emit('log', {
                        type: 'file',
                        action: 'saved',
                        to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                        file: this
                    });
                }
                // emit('log', {
                //   value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
                // });
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch] </blue>Watching for changes...`
                    });
                }
                return resolve(result);
            }
            catch (e) {
                console.log(e);
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
    compilerParams: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUM1QyxxRUFBK0M7QUFFL0Msd0RBQWtDO0FBQ2xDLDhEQUEyQztBQUUzQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUU1Qyx5RUFBbUQ7QUFLbkQsd0hBQWtHO0FBRWxHOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBRTdEO0FBRkQsb0VBRUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSxnQ0FBaUMsU0FBUSxvQkFBWTtDQVFqRTtBQVJELDRFQVFDO0FBMkNELGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxlQUFPO0lBK0IvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFxQyxFQUFFO1FBQy9ELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQVFKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQTJCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZ0NBQTJCLEdBQWlDLEVBQUUsQ0FBQztRQUMvRCw4QkFBeUIsR0FBbUMsRUFBRSxDQUFDO1FBaEU3RCx1RkFBdUY7UUFDdkYsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxV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