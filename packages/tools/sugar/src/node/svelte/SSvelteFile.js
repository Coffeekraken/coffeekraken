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
const STsFile_1 = __importDefault(require("../typescript/STsFile"));
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
        // listen for change event
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
        params = this.applyInterface('compilerParams', params);
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipe, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
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
                    // notify end
                    const time = duration.end();
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
        class: SSvelteCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SSvelteFileCtorSettingsInterface
    }
};
exports.default = SSvelteFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBQzNDLGtFQUE0QztBQUM1QyxvRUFBOEM7QUFFOUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFNUMseUVBQW1EO0FBRW5ELHdIQUFrRztBQUVsRzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw0QkFBNkIsU0FBUSxvQkFBWTtDQUU3RDtBQUZELG9FQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsZ0NBQWlDLFNBQVEsb0JBQVk7Q0FRakU7QUFSRCw0RUFRQztBQW9CRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLE1BQU0sV0FBWSxTQUFRLGVBQU87SUEyQi9COzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQXFDLEVBQUU7UUFDL0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBZUo7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsOEJBQXlCLEdBQW9DLEVBQUUsQ0FBQztRQWhDOUQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRTtnQkFD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