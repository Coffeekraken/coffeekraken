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
/**
 * @name            SSvelteFile
 * @namespace       sugar.node.svelte
 * @type            Class
 * @extends         SFile
 * @beta
 *
 * This represent a svelte file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISSvelteFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SSvelteFile from '@coffeekraken/sugar/node/svelte/SSvelteFile';
 * const file = new SSvelteFile('/my/cool/file.svelte');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
        settings = deepMerge_1.default(this.svelteFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        params = this.applyInterface('compilerParams', params);
        if (params.watch) {
            this.startWatch();
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
                clear: true,
                type: 'time'
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
                // nativeConsole.log(result.js.map.toString());
                // check if need to save
                if (params.save) {
                    // build the save path
                    let savePath;
                    if (params.outputDir === undefined) {
                        savePath = this.path.replace(/\.svelte$/, '.js');
                    }
                    else {
                        savePath = path_1.default.resolve(params.outputDir, this.path
                            .replace(`${params.rootDir}/`, '')
                            .replace(/\.svelte$/, '.js'));
                    }
                    emit('log', {
                        type: 'file',
                        file: this,
                        to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                        action: 'save'
                    });
                    this.writeSync(result.js.code, {
                        path: savePath
                    });
                    if (params.map) {
                        this.writeSync(result.js.map.toString(), {
                            path: savePath.replace(/\.js$/, '.js.map')
                        });
                        emit('log', {
                            type: 'file',
                            action: 'saved',
                            to: savePath
                                .replace(/\.js$/, '.js.map')
                                .replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                            file: this
                        });
                    }
                    // notify end
                    const time = duration.end();
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
                return resolve(result);
            }
            catch (e) {
                return reject(e.toString());
            }
            return true;
        }));
    }
}
SSvelteFile.interfaces = {
    compilerParams: {
        apply: false,
        class: SSvelteCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SSvelteFileCtorSettingsInterface
    }
};
exports.default = SSvelteFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBRTNDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTVDLHlFQUFtRDtBQUtuRCx3SEFBa0c7QUFFbEc7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsb0JBQVk7Q0FFN0Q7QUFGRCxvRUFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLGdDQUFpQyxTQUFRLG9CQUFZO0NBUWpFO0FBUkQsNEVBUUM7QUFzQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxlQUFPO0lBMkIvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFxQyxFQUFFO1FBQy9ELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQStCSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQ0FBMkIsR0FBaUMsRUFBRSxDQUFDO1FBQy9ELDhCQUF5QixHQUFtQyxFQUFFLENBQUM7SUFsRC9ELENBQUM7SUFuQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBeUJEOzs7Ozs7Ozs7O09BVUc7SUFD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