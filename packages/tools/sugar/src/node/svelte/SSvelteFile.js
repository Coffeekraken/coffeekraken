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
const SScssFile_1 = __importDefault(require("../scss/SScssFile"));
const STsCompiler_1 = __importDefault(require("../typescript/compile/STsCompiler"));
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
        return new SPromise_1.default(({ resolve, reject, emit, pipe, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
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
                // preprocess
                const preprocessResult = yield __svelte.preprocess(toCompile, {
                    style: (input) => __awaiter(this, void 0, void 0, function* () {
                        // if (
                        //   !input.attributes ||
                        //   !input.attributes.type ||
                        //   input.attributes.type !== 'text/scss'
                        // ) {
                        //   emit('log', {
                        //     value: 'No scss'
                        //   });
                        //   return {
                        //     code: input.content
                        //   };
                        // }
                        // create a temp file
                        const tmpSScssFile = new SScssFile_1.default('%tmpDir/svelte/compile.scss', {
                            file: {
                                checkExistence: false
                            }
                        });
                        tmpSScssFile.writeSync(input.content);
                        emit('log', {
                            value: `<yellow>[scss]</yellow> Processing scss`
                        });
                        const compileRes = yield tmpSScssFile.compile({
                            save: false,
                            map: false
                        });
                        if (compileRes.css) {
                            emit('log', {
                                value: `<green>[scss]</green> Scss processed <green>successfully</green>`
                            });
                            return {
                                code: compileRes.css
                            };
                        }
                        else {
                            return compileRes;
                        }
                    }),
                    script: (input) => __awaiter(this, void 0, void 0, function* () {
                        if (!input.attributes ||
                            !input.attributes.type ||
                            input.attributes.type !== 'text/ts') {
                            return {
                                code: input.content
                            };
                        }
                        // create a temp file
                        const tmpTsFile = new SFile_1.default('%tmpDir/ts/compile.ts', {
                            file: {
                                checkExistence: false
                            }
                        });
                        tmpTsFile.writeSync(input.content);
                        emit('log', {
                            value: `<yellow>[ts]</yellow> Processing typescript`
                        });
                        const compiler = new STsCompiler_1.default();
                        const compilePromise = compiler.compile({
                            input: [tmpTsFile.path],
                            rootDir: tmpTsFile.dirPath,
                            save: false,
                            target: 'browser',
                            map: false
                        });
                        pipe(compilePromise, {
                            events: 'error'
                        });
                        const compileRes = yield compilePromise;
                        if (compileRes.js) {
                            emit('log', {
                                value: `<green>[ts]</green> Typescript processed <green>successfully</green>`
                            });
                            return {
                                code: compileRes.js
                            };
                        }
                        else {
                            console.log(compileRes);
                            return compileRes;
                        }
                    })
                }, {});
                // render svelte
                const result = __svelte.compile(preprocessResult.code, Object.assign({ filename: this.name, dev: !params.prod, customElement: true, preserveComments: !params.stripComments, preserveWhitespace: !params.prod, outputFilename: this.name, cssOutputFilename: this.name }, (params.svelte || {})));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBQzNDLGtFQUE0QztBQUM1QyxvRkFBOEQ7QUFFOUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFNUMseUVBQW1EO0FBRW5ELHdIQUFrRztBQUVsRzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw0QkFBNkIsU0FBUSxvQkFBWTtDQUU3RDtBQUZELG9FQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsZ0NBQWlDLFNBQVEsb0JBQVk7Q0FRakU7QUFSRCw0RUFRQztBQW9CRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLE1BQU0sV0FBWSxTQUFRLGVBQU87SUEyQi9COzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQXFDLEVBQUU7UUFDL0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBNEJKOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLDhCQUF5QixHQUFvQyxFQUFFLENBQUM7SUE5Q2hFLENBQUM7SUFuQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBeUJEOzs7Ozs7Ozs7O09BVUc7SUFDSyxX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