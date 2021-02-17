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
                            transpileOnly: true,
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
                if (params.watch) {
                    emit('notification', {
                        type: 'success',
                        title: `${this.id} compilation success`
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3ZlbHRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUc1Qyx3REFBa0M7QUFDbEMsOERBQTJDO0FBQzNDLGtFQUE0QztBQUM1QyxvRkFBOEQ7QUFFOUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFNUMseUVBQW1EO0FBRW5ELHdIQUFrRztBQUVsRzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw0QkFBNkIsU0FBUSxvQkFBWTtDQUU3RDtBQUZELG9FQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsZ0NBQWlDLFNBQVEsb0JBQVk7Q0FRakU7QUFSRCw0RUFRQztBQW9CRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLE1BQU0sV0FBWSxTQUFRLGVBQU87SUEyQi9COzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQXFDLEVBQUU7UUFDL0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBZUo7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsOEJBQXlCLEdBQW9DLEVBQUUsQ0FBQztRQWhDOUQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRTtnQkFD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