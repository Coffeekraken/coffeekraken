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
exports.SScssFileCtorSettingsInterface = exports.SScssFileSettingsInterface = void 0;
const SFile_1 = __importDefault(require("../fs/SFile"));
const findImportStatements_1 = __importDefault(require("./utils/findImportStatements"));
const resolveDependency_1 = __importDefault(require("./utils/resolveDependency"));
const scss_parser_1 = require("scss-parser");
const scss_parser_2 = require("scss-parser");
const query_ast_1 = __importDefault(require("query-ast"));
const sass_1 = __importDefault(require("sass"));
const md5_1 = __importDefault(require("../crypt/md5"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SFileCache_1 = __importDefault(require("../cache/SFileCache"));
const putUseStatementsOnTop_1 = __importDefault(require("./utils/putUseStatementsOnTop"));
const csso_1 = __importDefault(require("csso"));
const stripCssComments_1 = __importDefault(require("../css/stripCssComments"));
const getSharedResourcesString_1 = __importDefault(require("./utils/getSharedResourcesString"));
const filename_1 = __importDefault(require("../fs/filename"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SScssCompilerParamsInterface"));
/**
 * @name      SScssFileSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @status              beta
 *
 * Scss file settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssFileSettingsInterface extends SInterface_1.default {
}
exports.SScssFileSettingsInterface = SScssFileSettingsInterface;
SScssFileSettingsInterface.definition = {};
/**
 * @name      SScssFileCtorSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @status              beta
 *
 * Scss file constructor settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssFileCtorSettingsInterface extends SInterface_1.default {
}
exports.SScssFileCtorSettingsInterface = SScssFileCtorSettingsInterface;
SScssFileCtorSettingsInterface.definition = {
    scssFile: {
        interface: SScssFileSettingsInterface,
        type: 'Object',
        required: true
    }
};
// @ts-ignore
class SScssFile extends SFile_1.default {
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
            scssFile: {}
        }, settings));
        /**
         * @name        dependencyType
         * @type        String
         * @values      main, import, use
         * @default     main
         *
         * Store the dependendy type of this file.
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._import = {
            type: 'main'
        };
        /**
         * @name          mixinsAndVariables
         * @type          String
         * @get
         *
         * Get the mixins and variables from the file content
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._mixinsAndVariables = undefined;
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISScssFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
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
        SScssFile.FILES[this.path] = this;
        this._fileCache = new SFileCache_1.default(this.constructor.name);
        this.on('watch', this._onWatch.bind(this));
    }
    /**
     * @name      scssFileSettings
     * @type      ISScssFileSettings
     * @get
     *
     * Access the scssFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssFileSettings() {
        return this._settings.scssFile;
    }
    get dependencies() {
        // cache
        if (this._dependencies)
            return this._dependencies;
        // read the file
        const content = this.readSync();
        // find dependencies
        let deps = findImportStatements_1.default(content);
        deps = deps
            .map((dep) => {
            const f = resolveDependency_1.default(dep.path, {
                from: this.path
            });
            return {
                path: f,
                import: dep
            };
        })
            .filter((p) => p.path !== undefined)
            .map((obj) => {
            let file;
            if (SScssFile.FILES[obj.path])
                file = SScssFile.FILES[obj.path];
            else {
                file = new SScssFile(obj.path, {
                    scssFile: (deepMerge_1.default(this.scssFileSettings, this._currentCompilationSettings))
                });
                file.pipeTo(this, {
                    events: 'update'
                });
            }
            file._import = obj.import;
            return file;
        });
        if (Object.keys(deps).length) {
            this._dependencies = deps;
        }
        return this._dependencies || [];
    }
    /**
     * @name          dependenciesHash
     * @type          String
     * @get
     *
     * Parse the content of the file to find the dependencies like import and use statements,
     * then generate a hash depending on these dependencies
     *
     * @since        2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get dependenciesHash() {
        const hashesStrArray = [];
        // @ts-ignore
        const content = [this._sharedResources || '', this.content].join('\n');
        const imports = findImportStatements_1.default(content)
            // .filter(
            //   // @ts-ignore
            //   (importObj) => importObj.type === 'use'
            // )
            .forEach((useObj) => {
            // @ts-ignore
            const realPath = resolveDependency_1.default(useObj.path, {
                from: this.path
            });
            if (!realPath) {
                // @ts-ignore
                this.emit('warn', {
                    value: [
                        `It seems that you're trying to load a file that does not exists:`,
                        `- From: <cyan>${this.path}</cyan>`,
                        // @ts-ignore
                        `- ${useObj.raw}`
                    ].join('\n')
                });
                return;
            }
            let useFile;
            if (SScssFile.FILES[realPath])
                useFile = SScssFile.FILES[realPath];
            else
                useFile = new SScssFile(realPath, {
                    // @ts-ignore
                    file: this.fileSettings,
                    scssFile: (deepMerge_1.default(this.scssFileSettings, this._currentCompilationSettings))
                });
            // pipe the update events
            this.pipeFrom(useFile, {
                events: 'update',
                processor: (value, metas) => {
                    return [value, metas];
                }
            });
            [useFile, ...useFile.dependencies].forEach((depFile) => {
                // @ts-ignore
                hashesStrArray.push(depFile.hash);
            });
        });
        return md5_1.default.encrypt(hashesStrArray.join('-'));
    }
    get mixinsAndVariables() {
        // cache
        if (this._mixinsAndVariables)
            return this._mixinsAndVariables;
        // extract the things that can be used
        // by others like mixins and variables declarations$
        const ast = scss_parser_1.parse(this.content);
        const $ = query_ast_1.default(ast);
        this._mixinsAndVariables = '';
        const nodes = $('stylesheet')
            .children()
            .filter((node) => {
            return ((node.node.type === 'atrule' &&
                node.node.value[0].value === 'mixin') ||
                node.node.type === 'declaration');
        });
        nodes.nodes.forEach((node) => {
            this._mixinsAndVariables += `\n${scss_parser_2.stringify(node.node)}`;
        });
        return this._mixinsAndVariables;
    }
    /**
     * @name        _onWatch
     * @type        Function
     * @private
     *
     * Start to watch the file. Does this only once
     * to avoid multiple compilation and logs
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _onWatch() {
        // listen for change event
        this.on('update', (file, metas) => {
            if (this._currentCompilationParams.watch) {
                // if (file._import.type !== 'main') {
                //   // console.log('NOT MAIN', file.relPath);
                //   // file.emit('childUpdate', file);
                //   return;
                // }
                if (this._import.type !== 'main') {
                    return;
                }
                const promise = this.compile(this._currentCompilationParams, {
                    // @ts-ignore
                    _updatedFile: file
                });
            }
        });
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.scssFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        const completeParams = this.applyInterface('compilerParams', params);
        if (completeParams.watch) {
            this.watch();
        }
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            emit('notification', {
                title: `${this.id} compilation started`
            });
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            // sass settings
            const sassSettings = Object.assign({ outputStyle: completeParams.style || sugar_1.default('scss.compile.style'), sourceMap: completeParams.map !== undefined
                    ? completeParams.map
                    : sugar_1.default('scss.compile.map'), includePaths: [
                    this.dirPath,
                    ...sugar_1.default('scss.compile.includePaths')
                ] }, (completeParams.sass || {}));
            if (!completeParams.serve) {
                emit('log', {
                    clear: true,
                    type: 'time'
                });
            }
            // @ts-ignore
            if (settings._updatedFile) {
                this.emit('log', {
                    type: 'file',
                    action: 'update',
                    // @ts-ignore
                    file: settings._updatedFile.toObject()
                });
            }
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            if (completeParams.clearCache)
                yield this._fileCache.clear();
            let toCompile = this.content;
            // @ts-ignore
            this._sharedResources = getSharedResourcesString_1.default(
            // @ts-ignore
            completeParams.sharedResources);
            if (this._import.type === 'main') {
                SScssFile.COMPILED_CSS = [];
            }
            const depsArray = this.dependencies;
            for (let i = 0; i < depsArray.length; i++) {
                const depFile = depsArray[i];
                // avoid compiling @use statements
                if (depFile._import && depFile._import.type === 'use') {
                    continue;
                }
                // compile the dependency
                const res = yield depFile.compile(Object.assign(Object.assign({}, completeParams), { clearCache: false }), settings);
                // replace the import in the content
                toCompile = toCompile.replace(depFile._import.raw, ``);
            }
            // check if we are loaded through a "use"
            if (this._import.type === 'use') {
                return resolve(`@use "${this.path}" as ${this._import.as}`);
            }
            const dependenciesHash = this.dependenciesHash;
            // check cache
            const cachedValue = yield this._fileCache.get(this.path);
            if (cachedValue &&
                cachedValue.dependenciesHash === dependenciesHash &&
                completeParams.cache) {
                let resultCss = cachedValue.css;
                SScssFile.COMPILED_CSS[this.path] = resultCss;
                emit('log', {
                    value: `<magenta>[cached]</magenta> File "<cyan>${this.relPath}</cyan>"`
                });
                if (this._import.type === 'main') {
                    // prepend all the compiled css
                    // @ts-ignore
                    resultCss = [
                        ...Object.values(SScssFile.COMPILED_CSS),
                        resultCss
                    ].join('\n');
                }
                // process the result
                resultCss = this._processResultCss(resultCss, completeParams);
                // check if need to save
                if (this._import.type === 'main' &&
                    completeParams.save &&
                    completeParams.outputDir) {
                    // build the save path
                    const savePath = path_1.default.resolve(completeParams.outputDir, this.path
                        .replace(`${completeParams.rootDir}/`, '')
                        .replace(/\.s[ac]ss$/, '.css'));
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'save',
                    //   to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this.toObject()
                    // });
                    this.writeSync(resultCss, {
                        path: savePath
                    });
                    // // notify end
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'saved',
                    //   to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this.toObject()
                    // });
                }
                // const durationEnd = duration.end();
                // // notify end
                // emit('log', {
                //   value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${durationEnd.formatedDuration}s</yellow>`
                // });
                emit('log', {
                    type: 'separator'
                });
                if (completeParams.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
                emit('notification', {
                    type: 'success',
                    title: `${this.id} compilation success`
                });
                return resolve(Object.assign({ css: resultCss, map: undefined }, duration.end()));
            }
            if (this._sharedResources) {
                toCompile = [this._sharedResources, toCompile].join('\n');
            }
            toCompile = putUseStatementsOnTop_1.default(toCompile);
            let renderObj;
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
                });
                renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
                // save in cache
                if (completeParams.cache) {
                    // @ts-ignore
                    yield this._fileCache.set(this.path, {
                        dependenciesHash,
                        css: renderObj.css.toString()
                    });
                }
                if (this._import.type === 'main') {
                    let resultCss = renderObj.css.toString();
                    // prepend all the compiled css
                    resultCss = [
                        ...Object.values(SScssFile.COMPILED_CSS),
                        resultCss
                    ].join('\n');
                    resultCss = this._processResultCss(resultCss, completeParams);
                    // check if need to save
                    if (completeParams.save && completeParams.outputDir) {
                        // build the save path
                        const savePath = path_1.default.resolve(completeParams.outputDir, this.path
                            .replace(`${completeParams.rootDir}/`, '')
                            .replace(/\.s[ac]ss$/, '.css'));
                        emit('log', {
                            type: 'file',
                            action: 'save',
                            to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                            file: this.toObject()
                        });
                        this.writeSync(resultCss, {
                            path: savePath
                        });
                        // notify end
                        emit('log', {
                            type: 'file',
                            action: 'saved',
                            to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                            file: this.toObject()
                        });
                    }
                    const durationEnd = duration.end();
                    // notify end
                    emit('log', {
                        value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${durationEnd.formatedDuration}s</yellow>`
                    });
                    emit('log', {
                        type: 'separator'
                    });
                    if (completeParams.watch) {
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }
                    emit('notification', {
                        type: 'success',
                        title: `${this.id} compilation success`
                    });
                    return resolve(Object.assign({ css: this._processResultCss(resultCss, completeParams) }, durationEnd));
                }
                else {
                    emit('log', {
                        type: 'separator'
                    });
                    if (completeParams.watch) {
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }
                    emit('notification', {
                        type: 'success',
                        title: `${this.id} compilation success`
                    });
                    SScssFile.COMPILED_CSS[this.path] = renderObj.css;
                    return resolve(Object.assign({ css: this._processResultCss(renderObj.css.toString(), completeParams), map: undefined }, duration.end()));
                }
            }
            catch (e) {
                emit('notification', {
                    type: 'error',
                    title: `${this.id} compilation error`
                });
                return reject(new Error(e.toString()));
            }
            return true;
        }));
    }
    _processResultCss(css, params) {
        // remove @charset "UTF-8";
        css = css.replace(/@charset "UTF-8";/gm, '');
        if (params.stripComments) {
            css = stripCssComments_1.default(css);
        }
        if (params.minify) {
            css = csso_1.default.minify(css, {
                comments: false
            }).css;
        }
        // remove empty lines
        css = css.split(/^\s*[\r\n]/gm).join('');
        return css;
    }
    update() {
        this._mixinsAndVariables = undefined;
        this._dependencies = undefined;
        super.update();
    }
}
SScssFile.interfaces = {
    compilerParams: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SScssFileCtorSettingsInterface
    }
};
SScssFile.COMPILED_CSS = {};
SScssFile.FILES = {};
exports.default = SScssFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFDbEUsa0ZBQTREO0FBQzVELDZDQUFtRDtBQUNuRCw2Q0FBMkQ7QUFDM0QsMERBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQix1REFBaUM7QUFDakMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUM1QyxxRUFBK0M7QUFDL0MsMEZBQW9FO0FBRXBFLGdEQUEwQjtBQUMxQiwrRUFBeUQ7QUFFekQsZ0dBQTBFO0FBRTFFLDhEQUEyQztBQUUzQyx5RUFBbUQ7QUFHbkQsb0hBQThGO0FBRTlGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDBCQUEyQixTQUFRLG9CQUFZOztBQUE1RCxnRUFFQztBQURRLHFDQUFVLEdBQUcsRUFBRSxDQUFDO0FBR3pCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDhCQUErQixTQUFRLG9CQUFZOztBQUFoRSx3RUFRQztBQVBRLHlDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDBCQUEwQjtRQUNyQyxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBMkNKLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxlQUFPO0lBZ0Q3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFtQyxFQUFFO1FBQzdELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixRQUFRLEVBQUUsRUFBRTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXpDSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUFRO1lBQ2IsSUFB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