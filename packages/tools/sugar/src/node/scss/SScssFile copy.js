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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SFileCache_1 = __importDefault(require("@coffeekraken/s-cache/SFileCache"));
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
            // this.pipeFrom(useFile, {
            //   events: 'update',
            //   processor: (value, metas) => {
            //     return [value, metas];
            //   }
            // });
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
                if (this._isCompiling)
                    return;
                if (this._import.type !== 'main')
                    return;
                const promise = this.compile(this._currentCompilationParams, {
                    // @ts-ignore
                    _updatedFile: file.toObject()
                });
            }
        });
    }
    compile(params, settings) {
        settings = deepMerge_1.default(this.scssFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);
        const completeParams = this.applyInterface('compilerParams', params);
        // if (settings._updatedFile) {
        //   console.log('comp', this.relPath, settings._updatedFile.relPath);
        // }
        if (completeParams.watch) {
            this.watch();
        }
        // init the promise
        return new s_promise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
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
                    file: settings._updatedFile
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
            if (params.cache) {
                const cachedValue = yield this._fileCache.get(this.path, {
                    context: {
                        configHash: sugar_1.default('$.hash')
                    }
                });
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
                    }, {
                        context: {
                            configHash: sugar_1.default('$.hash')
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlIGNvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2Nzc0ZpbGUgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFDbEMsd0ZBQWtFO0FBQ2xFLGtGQUE0RDtBQUM1RCw2Q0FBbUQ7QUFDbkQsNkNBQTJEO0FBQzNELDBEQUE2QztBQUM3QyxnREFBMEI7QUFDMUIsdURBQWlDO0FBQ2pDLGtFQUE0QztBQUM1QyxnREFBMEI7QUFDMUIsd0VBQWlEO0FBQ2pELG9FQUE4QztBQUM5Qyw0REFBNEM7QUFDNUMsa0ZBQTREO0FBQzVELDBGQUFvRTtBQUVwRSxnREFBMEI7QUFDMUIsK0VBQXlEO0FBRXpELGdHQUEwRTtBQUUxRSw4REFBMkM7QUFFM0MseUVBQW1EO0FBR25ELG9IQUE4RjtBQUU5Rjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFBNUQsZ0VBRUM7QUFEUSxxQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFBaEUsd0VBUUM7QUFQUSx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQTJDSixhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZUFBTztJQWdEN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBbUMsRUFBRTtRQUM3RCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF6Q0o7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQU8sR0FB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