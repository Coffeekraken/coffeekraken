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
var _a;
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
const SScssCompileParamsInterface_1 = __importDefault(require("./compile/interface/SScssCompileParamsInterface"));
module.exports = (_a = class SScssFile extends SFile_1.default {
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
            super(path, settings);
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
            this._settings.compile = deepMerge_1.default(SScssCompileParamsInterface_1.default.defaults(), this._settings.compile || {});
            SScssFile.FILES[this.path] = this;
            this._fileCache = new SFileCache_1.default(this.constructor.name);
            // start watching the file if needed
            // @ts-ignore
            if (settings.compile.watch) {
                this.startWatch();
            }
            // listen for change event
            // @ts-ignore
            this.on('update', () => {
                console.log('UP');
                if (this._settings.compile.compileOnChange) {
                    const promise = this.compile(this._settings.compile);
                    // @ts-ignore
                    promise.trigger('log', {
                        value: `<blue>[updated]</blue> ""`
                    });
                }
            });
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
                else
                    file = file = new SScssFile(obj.path, deepMerge_1.default(this._settings, {
                        compile: Object.assign(Object.assign({}, (this._settings.compile || {})), (this._currentCompilationSettings || {}))
                    }));
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
                    this.trigger('warn', {
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
                    useFile = useFile = new SScssFile(realPath, deepMerge_1.default(this._settings, {
                        compile: Object.assign(Object.assign({}, (this._settings.compile || {})), (this._currentCompilationSettings || {}))
                    }));
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
        compile(settings = {}) {
            settings = deepMerge_1.default(Object.assign({}, SScssCompileParamsInterface_1.default.defaults()), this._settings.compile || {}, settings);
            this._currentCompilationSettings = Object.assign({}, settings);
            // init the promise
            const promise = new SPromise_1.default({});
            // listen for the end
            promise.on('finally', () => {
                this._isCompiling = false;
            });
            // // pipe this promise
            // @ts-ignore
            this.pipe(promise);
            if (this._isCompiling) {
                promise.trigger('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            // sass settings
            const sassSettings = Object.assign({ outputStyle: settings.style || sugar_1.default('scss.compile.style'), sourceMap: settings.map !== undefined
                    ? settings.map
                    : sugar_1.default('scss.compile.map'), includePaths: [
                    this.dirPath,
                    ...sugar_1.default('scss.compile.includePaths')
                ] }, (settings.sass || {}));
            // start watching the file if needed
            if (settings.watch) {
                this.startWatch();
            }
            promise.trigger('log', {
                type: 'separator'
            });
            // notify start
            promise.trigger('log', {
                value: `Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            (() => __awaiter(this, void 0, void 0, function* () {
                yield wait_1.default(0);
                if (settings.clearCache)
                    yield this._fileCache.clear();
                let toCompile = this.content;
                // @ts-ignore
                this._sharedResources = getSharedResourcesString_1.default(
                // @ts-ignore
                settings.sharedResources);
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
                    // promise.trigger('log', {
                    //   value: `<yellow>[dependency]</yellow> "<cyan>${depFile.relPath}</cyan>"`
                    // });
                    // compile the dependency
                    const res = yield depFile.compile(Object.assign(Object.assign({}, settings), { clearCache: false }));
                    // replace the import in the content
                    toCompile = toCompile.replace(depFile._import.raw, ``);
                }
                // check if we are loaded through a "use"
                if (this._import.type === 'use') {
                    return promise.resolve(`@use "${this.path}" as ${this._import.as}`);
                }
                const dependenciesHash = this.dependenciesHash;
                // check cache
                const cachedValue = yield this._fileCache.get(this.path);
                if (cachedValue &&
                    cachedValue.dependenciesHash === dependenciesHash &&
                    settings.cache) {
                    // console.log('from cache');
                    let result = cachedValue.css;
                    SScssFile.COMPILED_CSS[this.path] = result;
                    promise.trigger('log', {
                        value: `<green>[from cache]</green> "<cyan>${this.relPath}</cyan>"`
                    });
                    if (this._import.type === 'main') {
                        // prepend all the compiled css
                        // @ts-ignore
                        result = [...Object.values(SScssFile.COMPILED_CSS), result].join('\n');
                    }
                    // process the result
                    result = this._processResultCss(result, settings);
                    // check if need to save
                    if (this._import.type === 'main' &&
                        settings.save &&
                        settings.outputDir) {
                        // build the save path
                        const savePath = path_1.default.resolve(settings.outputDir, this.path
                            .replace(`${settings.rootDir}/`, '')
                            .replace(/\.s[ac]ss$/, '.css'));
                        promise.trigger('log', {
                            value: `Saving the file "<cyan>${this.relPath}</cyan>" to "<magenta>${savePath.replace(`${sugar_1.default('storage.rootDir')}/`, '')}</magenta>" `
                        });
                        this.writeSync(result, {
                            path: savePath
                        });
                        // notify end
                        const time = duration.end();
                        promise.trigger('log', {
                            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
                        });
                    }
                    return promise.resolve(result);
                }
                if (this._sharedResources) {
                    toCompile = [this._sharedResources, toCompile].join('\n');
                }
                toCompile = putUseStatementsOnTop_1.default(toCompile);
                let renderObj;
                try {
                    promise.trigger('log', {
                        value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
                    });
                    // console.log('comepile', toCompile);
                    renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
                    // save in cache
                    if (settings.cache) {
                        // console.log('save in cache', this.path);
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
                        result = this._processResultCss(result, settings);
                        // check if need to save
                        if (settings.save && settings.outputDir) {
                            // build the save path
                            const savePath = path_1.default.resolve(
                            // @ts-ignore
                            settings.outputDir, this.path
                                .replace(`${settings.rootDir}/`, '')
                                .replace(/\.s[ac]ss$/, '.css'));
                            promise.trigger('log', {
                                value: `Saving the file "<cyan>${this.relPath}</cyan>" to "<magenta>${savePath.replace(`${sugar_1.default('storage.rootDir')}/`, '')}</magenta>" `
                            });
                            this.writeSync(result, {
                                path: savePath
                            });
                        }
                        // notify end
                        const time = duration.end();
                        promise.trigger('log', {
                            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
                        });
                        return promise.resolve(result);
                    }
                    else {
                        SScssFile.COMPILED_CSS[this.path] = renderObj.css;
                        return promise.resolve(this._processResultCss(renderObj.css.toString(), settings));
                    }
                }
                catch (e) {
                    // .log(e);
                    return promise.reject(e.toString());
                }
                return true;
            }))();
            return promise;
        }
        _processResultCss(css, settings = {}) {
            // remove @charset "UTF-8";
            css = css.replace(/@charset "UTF-8";/gm, '');
            if (settings.stripComments) {
                css = stripCssComments_1.default(css);
            }
            if (settings.minify) {
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
    },
    _a.COMPILED_CSS = {},
    _a.FILES = {},
    _a);
//# sourceMappingURL=SScssFile.js.map