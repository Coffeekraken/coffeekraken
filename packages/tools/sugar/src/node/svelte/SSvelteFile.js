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
 * @status              beta
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
 * @status              beta
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
 * @status              beta
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
        this.on('update', (file, metas) => __awaiter(this, void 0, void 0, function* () {
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams, {
                    _updatedFile: file
                });
            }
        }));
    }
    compile(params, settings = {}) {
        settings = deepMerge_1.default(this.svelteFileSettings.compile, settings);
        this._currentCompilationParams = Object.assign({}, params);
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
            if (settings._updatedFile) {
                emit('log', {
                    clear: true,
                    type: 'file',
                    action: 'update',
                    file: this
                });
            }
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            let toCompile = this.content;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBRTNDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTVDLHlFQUFtRDtBQUtuRCx3SEFBa0c7QUFFbEc7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsb0JBQVk7Q0FFN0Q7QUFGRCxvRUFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLGdDQUFpQyxTQUFRLG9CQUFZO0NBUWpFO0FBUkQsNEVBUUM7QUEwQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxlQUFPO0lBMkIvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFxQyxFQUFFO1FBQy9ELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQTRCSjs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQiw4QkFBeUIsR0FBbUMsRUFBRSxDQUFDO0lBOUMvRCxDQUFDO0lBbkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQXlCRDs7Ozs7Ozs7OztPQVVHO0lBQ0ssV0FBVztRQUNqQiwwQkFBMEI7UUFDMUIsSUFB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