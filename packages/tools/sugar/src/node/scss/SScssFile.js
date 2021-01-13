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
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const SFileCache_1 = __importDefault(require("../cache/SFileCache"));
const putUseStatementsOnTop_1 = __importDefault(require("./utils/putUseStatementsOnTop"));
const csso_1 = __importDefault(require("csso"));
const stripCssComments_1 = __importDefault(require("../css/stripCssComments"));
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
            this._fileCache = new SFileCache_1.default(this.constructor.name);
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
                const file = new SScssFile(obj.path);
                file._import = obj.import;
                return file;
            });
            if (Object.keys(deps).length) {
                this._dependencies = deps;
            }
            return this._dependencies || [];
        }
        get hash() {
            return md5_1.default.encrypt(this.content);
        }
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
                const useFile = new SScssFile(realPath);
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
        getCompileString() {
            // const strArray: string[] = [];
            // let content = this.content;
            // // check if the file is in the cache
            // const cacheValue = await this._fileCache.get(this.path);
            // if (cacheValue) {
            // }
            // const depsArray = this.dependencies || [];
            // for (let i = 0; i < depsArray.length; i++) {
            //   const file = depsArray[i];
            //   if (file.dependencyType === 'use') {
            //     continue;
            //   }
            //   const str = file.getCompileString();
            //   content = content.replace(file.dependencyLoadString, str);
            // }
            // return content;
        }
        compile(settings = {}) {
            settings = deepMerge_1.default({
                clearCache: false,
                cache: true,
                minify: true,
                stripComments: true,
                sharedResources: null,
                sass: {}
            }, settings);
            return new SPromise_1.default((resolve, reject, trigger) => __awaiter(this, void 0, void 0, function* () {
                if (settings.clearCache)
                    yield this._fileCache.clear();
                let toCompile = this.content;
                // @ts-ignore
                this._sharedResources = settings.sharedResources || '';
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
                    const res = yield depFile.compile(settings);
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
                    settings.cache) {
                    console.log('from cache');
                    const result = this._processResultCss(cachedValue.css, settings);
                    SScssFile.COMPILED_CSS[this.path] = result;
                    return resolve(result);
                }
                if (settings.sharedResources) {
                    toCompile = [settings.sharedResources, toCompile].join('\n');
                }
                toCompile = putUseStatementsOnTop_1.default(toCompile);
                let sassPassedSettings = Object.assign({}, settings.sass);
                const sassSettings = deepMerge_1.default({
                    outputStyle: 'expanded',
                    sourceMap: false,
                    includePaths: [
                        this.dirPath,
                        ...sugar_1.default('scss.compile.includePaths')
                    ]
                }, sassPassedSettings);
                let renderObj;
                try {
                    // console.log(toCompile);
                    // if (this._import.type === 'main') {
                    //   toCompile = [COMPILED_CSS.join('\n'), toCompile].join('\n');
                    // }
                    console.log('comepile', this.path);
                    // if (this.path.includes('index.scss')) {
                    //   console.log('CCC', toCompile);
                    // }
                    renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
                    // save in cache
                    if (settings.cache) {
                        console.log('save in cache');
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
                        return resolve(result);
                    }
                    else {
                        SScssFile.COMPILED_CSS[this.path] = renderObj.css;
                        return resolve(this._processResultCss(renderObj.css.toString(), settings));
                    }
                }
                catch (e) {
                    console.log(e);
                    return reject(e.toString());
                }
            }));
        }
        _processResultCss(css, settings = {}) {
            // try {
            // css = css.replace(/^\s*[\r\n]/gm, '').trim();
            // } catch (e) {}
            if (settings.stripComments) {
                css = stripCssComments_1.default(css);
            }
            if (settings.minify) {
                css = csso_1.default.minify(css).css;
            }
            return css;
        }
        update() {
            this._mixinsAndVariables = undefined;
            this._dependencies = undefined;
            super.update();
        }
    },
    _a.COMPILED_CSS = {},
    _a);
//# sourceMappingURL=SScssFile.js.map