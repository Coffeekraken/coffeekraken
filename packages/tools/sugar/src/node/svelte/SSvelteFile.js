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
                    value: `<blue>[updated]</blue> "<cyan>${file.relPath}</cyan>"`
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
            let toCompile = this.content;
            let renderObj;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
                });
                // RENDERING HERE
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUM1QyxxRUFBK0M7QUFFL0Msd0RBQWtDO0FBQ2xDLDhEQUEyQztBQUUzQyx5RUFBbUQ7QUFDbkQsK0RBSW1DO0FBRW5DOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDRCQUE2QixTQUFRLG9CQUFZO0NBRTdEO0FBRkQsb0VBRUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSxnQ0FBaUMsU0FBUSxvQkFBWTtDQVFqRTtBQVJELDRFQVFDO0FBMkNELGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxlQUFPO0lBK0IvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFxQyxFQUFFO1FBQy9ELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQVFKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQXlCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZ0NBQTJCLEdBQWlDLEVBQUUsQ0FBQztRQUMvRCw4QkFBeUIsR0FBbUMsRUFBRSxDQUFDO1FBOUQ3RCx1RkFBdUY7UUFDdkYsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxvQkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFB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