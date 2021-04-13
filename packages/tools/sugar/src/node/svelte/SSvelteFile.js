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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const wait_1 = __importDefault(require("../../shared/time/wait"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const filename_1 = __importDefault(require("../fs/filename"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SScssFile_1 = __importDefault(require("../scss/SScssFile"));
const STsFile_1 = __importDefault(require("../ts/STsFile"));
const s_svelte_compiler_1 = require("@coffeekraken/s-svelte-compiler");
// @ts-ignore
const __svelte = require('svelte/compiler'); // eslint-disable-line
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
class SSvelteFileSettingsInterface extends s_interface_1.default {
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
class SSvelteFileCtorSettingsInterface extends s_interface_1.default {
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
 * @param       {String}            path            The path to the scss file
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
class SSvelteFile extends s_file_1.default {
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
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isCompiling = false;
        this._currentCompilationParams = {};
        // listen for change event
        // @weird:ts-compilation-issue
        this.on('update', (file, metas) => __awaiter(this, void 0, void 0, function* () {
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams, {
                    _updatedFile: file
                });
            }
        }));
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
    compile(params, settings = {}) {
        settings = deepMerge_1.default(this.svelteFileSettings.compile, settings);
        this._currentCompilationParams = Object.assign({}, params);
        // @weird:ts-compilation-issue
        params = this.applyInterface('compilerParams', params);
        // init the promise
        return new s_promise_1.default(({ resolve, reject, emit, pipe, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            if (params.watch) {
                this.watch();
            }
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
            if (settings._updatedFile) {
                emit('log', {
                    clear: true,
                    type: 'file',
                    action: 'update',
                    file: this.toObject()
                });
            }
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new s_duration_1.default();
            yield wait_1.default(0);
            const toCompile = this.content;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
                });
                // preprocess
                const preprocessResult = yield __svelte.preprocess(toCompile, {
                    style: (input) => __awaiter(this, void 0, void 0, function* () {
                        if (!input.attributes ||
                            !input.attributes.type ||
                            input.attributes.type !== 'text/scss') {
                            return {
                                code: input.content
                            };
                        }
                        if (input.content.trim() === '') {
                            return '';
                        }
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
                        const tmpTsFile = new STsFile_1.default('%tmpDir/ts/compile.ts', {
                            file: {
                                checkExistence: false
                            }
                        });
                        tmpTsFile.writeSync(input.content);
                        emit('log', {
                            value: `<yellow>[ts]</yellow> Processing typescript`
                        });
                        const compilePromise = tmpTsFile.compile({
                            save: false,
                            // @ts-ignore
                            target: 'browser',
                            map: false
                        });
                        // const compiler = new __STsCompiler();
                        // const compilePromise = compiler.compile({
                        //   input: [tmpTsFile.path],
                        //   rootDir: tmpTsFile.dirPath,
                        //   save: false,
                        //   transpileOnly: true,
                        //   target: 'browser',
                        //   map: false
                        // });
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
                        file: this.toObject(),
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
                            file: this.toObject()
                        });
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
                emit('notification', {
                    type: 'success',
                    // @weird:ts-compilation-issue
                    title: `${this.id} compilation success`
                });
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch] </blue>Watching for changes...`
                    });
                    this._isCompiling = false;
                    return;
                }
                // resolve only if not watching
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
        class: s_svelte_compiler_1.SSvelteCompilerInterface
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SSvelteFileCtorSettingsInterface
    }
};
exports.default = SSvelteFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBaUQ7QUFDakQsZ0RBQTBCO0FBQzFCLDhFQUF3RDtBQUN4RCwwRUFBbUQ7QUFDbkQsa0VBQTRDO0FBQzVDLHNFQUFzRDtBQUN0RCw4REFBMkM7QUFDM0Msa0VBQXVEO0FBQ3ZELDRFQUFxRDtBQUNyRCxrRUFBNEM7QUFDNUMsNERBQXNDO0FBQ3RDLHVFQUd5QztBQUV6QyxhQUFhO0FBQ2IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7QUFFbkU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEscUJBQVk7Q0FFN0Q7QUFGRCxvRUFFQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLGdDQUFpQyxTQUFRLHFCQUFZO0NBUWpFO0FBUkQsNEVBUUM7QUFvQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxnQkFBTztJQTJCL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBcUMsRUFBRTtRQUMvRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFnQko7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsOEJBQXlCLEdBQW9DLEVBQUUsQ0FBQztRQWpDOUQsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUN4QixJQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3QyxJQUFJ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