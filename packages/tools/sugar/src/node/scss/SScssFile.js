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
            // sass settings
            const sassSettings = Object.assign({ outputStyle: params.style || sugar_1.default('scss.compile.style'), sourceMap: params.map !== undefined
                    ? params.map
                    : sugar_1.default('scss.compile.map'), includePaths: [
                    this.dirPath,
                    ...sugar_1.default('scss.compile.includePaths')
                ] }, (params.sass || {}));
            if (!params.serve) {
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
                    file: settings._updatedFile
                });
            }
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            if (params.clearCache)
                yield this._fileCache.clear();
            let toCompile = this.content;
            // @ts-ignore
            this._sharedResources = getSharedResourcesString_1.default(
            // @ts-ignore
            params.sharedResources);
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
                const res = yield depFile.compile(Object.assign(Object.assign({}, params), { clearCache: false }), settings);
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
                params.cache) {
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
                resultCss = this._processResultCss(resultCss, params);
                // check if need to save
                if (this._import.type === 'main' && params.save && params.outputDir) {
                    // build the save path
                    const savePath = path_1.default.resolve(params.outputDir, this.path
                        .replace(`${params.rootDir}/`, '')
                        .replace(/\.s[ac]ss$/, '.css'));
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'save',
                    //   to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this
                    // });
                    this.writeSync(resultCss, {
                        path: savePath
                    });
                    // // notify end
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'saved',
                    //   to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this
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
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
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
                if (params.cache) {
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
                    resultCss = this._processResultCss(resultCss, params);
                    // check if need to save
                    if (params.save && params.outputDir) {
                        // build the save path
                        const savePath = path_1.default.resolve(params.outputDir, this.path
                            .replace(`${params.rootDir}/`, '')
                            .replace(/\.s[ac]ss$/, '.css'));
                        emit('log', {
                            type: 'file',
                            action: 'save',
                            to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                            file: this
                        });
                        this.writeSync(resultCss, {
                            path: savePath
                        });
                        // notify end
                        emit('log', {
                            type: 'file',
                            action: 'saved',
                            to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                            file: this
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
                    if (params.watch) {
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }
                    return resolve(Object.assign({ css: this._processResultCss(resultCss, params) }, durationEnd));
                }
                else {
                    emit('log', {
                        type: 'separator'
                    });
                    if (params.watch) {
                        emit('log', {
                            value: `<blue>[watch]</blue> Watching for changes...`
                        });
                    }
                    SScssFile.COMPILED_CSS[this.path] = renderObj.css;
                    return resolve(Object.assign({ css: this._processResultCss(renderObj.css.toString(), params), map: undefined }, duration.end()));
                }
            }
            catch (e) {
                // .log(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFDbEUsa0ZBQTREO0FBQzVELDZDQUFtRDtBQUNuRCw2Q0FBMkQ7QUFDM0QsMERBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQix1REFBaUM7QUFDakMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUM1QyxxRUFBK0M7QUFDL0MsMEZBQW9FO0FBRXBFLGdEQUEwQjtBQUMxQiwrRUFBeUQ7QUFFekQsZ0dBQTBFO0FBRTFFLDhEQUEyQztBQUUzQyx5RUFBbUQ7QUFNbkQsb0hBQThGO0FBRTlGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDBCQUEyQixTQUFRLG9CQUFZOztBQUE1RCxnRUFFQztBQURRLHFDQUFVLEdBQUcsRUFBRSxDQUFDO0FBR3pCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFhLDhCQUErQixTQUFRLG9CQUFZOztBQUFoRSx3RUFRQztBQVBRLHlDQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDBCQUEwQjtRQUNyQyxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBNENKLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxlQUFPO0lBZ0Q3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxXQUFtQyxFQUFFO1FBQzdELEtBQUssQ0FDSCxJQUFJLEVBQ0osbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixRQUFRLEVBQUUsRUFBRTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXpDSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBTyxHQUFRO1lBQ2IsSUFB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