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
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SScssCompilerParamsInterface"));
/**
 * @name      SScssFileSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @beta
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
 * @beta
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
                useFile = useFile = new SScssFile(realPath, {
                    scssFile: (deepMerge_1.default(this.scssFileSettings, this._currentCompilationSettings))
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
        settings = deepMerge_1.default(this.scssFileSettings, settings);
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
            // sass settings
            const sassSettings = Object.assign({ outputStyle: params.style || sugar_1.default('scss.compile.style'), sourceMap: params.map !== undefined
                    ? params.map
                    : sugar_1.default('scss.compile.map'), includePaths: [
                    this.dirPath,
                    ...sugar_1.default('scss.compile.includePaths')
                ] }, (params.sass || {}));
            // start watching the file if needed
            if (params.watch) {
                this.startWatch();
            }
            emit('log', {
                type: 'separator'
            });
            // notify start
            emit('log', {
                value: `Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
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
                let result = cachedValue.css;
                SScssFile.COMPILED_CSS[this.path] = result;
                emit('log', {
                    value: `<green>[from cache]</green> "<cyan>${this.relPath}</cyan>"`
                });
                if (this._import.type === 'main') {
                    // prepend all the compiled css
                    // @ts-ignore
                    result = [...Object.values(SScssFile.COMPILED_CSS), result].join('\n');
                }
                // process the result
                result = this._processResultCss(result, params);
                // check if need to save
                if (this._import.type === 'main' && params.save && params.outputDir) {
                    // build the save path
                    const savePath = path_1.default.resolve(params.outputDir, this.path
                        .replace(`${params.rootDir}/`, '')
                        .replace(/\.s[ac]ss$/, '.css'));
                    emit('log', {
                        value: `Saving the file "<cyan>${this.relPath}</cyan>" to "<magenta>${savePath.replace(`${sugar_1.default('storage.rootDir')}/`, '')}</magenta>" `
                    });
                    this.writeSync(result, {
                        path: savePath
                    });
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
                }
                return resolve(result);
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
                    let result = renderObj.css.toString();
                    // prepend all the compiled css
                    result = [...Object.values(SScssFile.COMPILED_CSS), result].join('\n');
                    result = this._processResultCss(result, params);
                    // check if need to save
                    if (params.save && params.outputDir) {
                        // build the save path
                        const savePath = path_1.default.resolve(params.outputDir, this.path
                            .replace(`${params.rootDir}/`, '')
                            .replace(/\.s[ac]ss$/, '.css'));
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
                else {
                    if (params.watch) {
                        emit('log', {
                            value: `<blue>Watching for changes...</blue>`
                        });
                    }
                    SScssFile.COMPILED_CSS[this.path] = renderObj.css;
                    return resolve(this._processResultCss(renderObj.css.toString(), params));
                }
            }
            catch (e) {
                // .log(e);
                return reject(e.toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Njc3NGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUNsQyx3RkFBa0U7QUFDbEUsa0ZBQTREO0FBQzVELDZDQUFtRDtBQUNuRCw2Q0FBMkQ7QUFDM0QsMERBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQix1REFBaUM7QUFDakMsa0VBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLDREQUE0QztBQUM1QyxxRUFBK0M7QUFDL0MsMEZBQW9FO0FBRXBFLGdEQUEwQjtBQUMxQiwrRUFBeUQ7QUFFekQsZ0dBQTBFO0FBQzFFLHdEQUFrQztBQUNsQyw4REFBMkM7QUFFM0MseUVBQW1EO0FBTW5ELG9IQUE4RjtBQUU5Rjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFBNUQsZ0VBRUM7QUFEUSxxQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFBaEUsd0VBUUM7QUFQUSx5Q0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQTRDSixhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZUFBTztJQWdEN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBbUMsRUFBRTtRQUM3RCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsUUFBUSxFQUFFLEVBQUU7U0FDYixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF6Q0o7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQU8s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