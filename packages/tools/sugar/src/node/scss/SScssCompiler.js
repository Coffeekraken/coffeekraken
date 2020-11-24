"use strict";
// @ts-nocheck
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
const extension_1 = __importDefault(require("../fs/extension"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const unquote_1 = __importDefault(require("../string/unquote"));
const path_1 = __importDefault(require("path"));
const stripCssComments_1 = __importDefault(require("../css/stripCssComments"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const md5_1 = __importDefault(require("../crypt/md5"));
const sass_1 = __importDefault(require("sass"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const filename_1 = __importDefault(require("../fs/filename"));
const path_2 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
const getSharedResourcesString_1 = __importDefault(require("./getSharedResourcesString"));
const putUseStatementsOnTop_1 = __importDefault(require("./putUseStatementsOnTop"));
const glob_1 = __importDefault(require("glob"));
const scss_parser_1 = require("scss-parser");
const scss_parser_2 = require("scss-parser");
const query_ast_1 = __importDefault(require("query-ast"));
const csso_1 = __importDefault(require("csso"));
const is_glob_1 = __importDefault(require("is-glob"));
const unique_1 = __importDefault(require("../array/unique"));
const SBuildScssInterface_1 = __importDefault(require("./build/interface/SBuildScssInterface"));
module.exports = class SScssCompiler {
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the instance settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this._includePaths = [];
        this._settings = deepMerge_1.default(Object.assign(Object.assign({ id: this.constructor.name }, SBuildScssInterface_1.default.getDefaultValues()), { includePaths: [], putUseOnTop: true }), settings);
        // prod
        if (this._settings.prod) {
            this._settings.cache = false;
            this._settings.style = 'compressed';
            this._settings.minify = true;
            this._settings.stripComments = true;
        }
    }
    /**
     * @name              compile
     * @type              Function
     * @async
     *
     * This method is the main one that allows you to actually compile the
     * code you pass either inline, either a file path.
     *
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    compile(source, settings = {}) {
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this._settings, {
                _isChild: false
            }, settings);
            const startTime = Date.now();
            let dataObj = {
                children: {},
                importStatements: [],
                sharedResources: null,
                mixinsAndVariables: null,
                scss: null,
                css: null
            };
            source = source.trim();
            const includePaths = unique_1.default([
                ...(this._settings.includePaths
                    ? !Array.isArray(this._settings.includePaths)
                        ? [this._settings.includePaths]
                        : this._settings.includePaths
                    : []),
                ...(settings.rootDir
                    ? !Array.isArray(settings.rootDir)
                        ? [settings.rootDir]
                        : settings.rootDir
                    : []),
                ...(settings.sass.includePaths
                    ? !Array.isArray(settings.sass.includePaths)
                        ? [settings.sass.includePaths]
                        : settings.sass.includePaths
                    : []),
                `${packageRoot_1.default()}/node_modules`
                // '/'
            ]);
            this._includePaths = includePaths;
            let sharedResources = settings.sharedResources || [];
            if (!Array.isArray(sharedResources))
                sharedResources = [sharedResources];
            const resourceContent = getSharedResourcesString_1.default(sharedResources);
            if (resourceContent) {
                dataObj.sharedResources = resourceContent;
            }
            let sassPassedSettings = Object.assign({}, settings.sass || {});
            delete sassPassedSettings.includePaths;
            delete sassPassedSettings.sharedResources;
            const sassSettings = deepMerge_1.default({
                importer: [
                    (url, prev, done) => {
                        if (resourceContent) {
                            const realPath = this._findDependency(url);
                            if (realPath) {
                                let content = fs_1.default.readFileSync(realPath, 'utf8');
                                const importMatches = content.match(/@import\s['"].*['"];/gm);
                                if (importMatches) {
                                    importMatches.forEach((importStatement) => {
                                        let replaceImportStatement = importStatement;
                                        const importPathMatches = importStatement.match(/['"].*['"]/g);
                                        if (importPathMatches) {
                                            const importPath = unquote_1.default(importPathMatches[0]);
                                            const absoluteImportPath = path_1.default.resolve(folderPath_1.default(realPath), importPath);
                                            content = content.replace(importStatement, `@import "${absoluteImportPath}";`);
                                        }
                                    });
                                }
                                return {
                                    contents: `
                        ${resourceContent}
                        ${content}
                      `
                                };
                            }
                        }
                        return null;
                    }
                ],
                sourceMap: this._settings.map,
                includePaths
            }, sassPassedSettings);
            // engage the cache
            const cache = new SCache_1.default(this._settings.id, {
                ttl: '10d'
            });
            if (settings.clearCache && !settings._isChild) {
                yield cache.clear();
            }
            let cacheId;
            if (path_2.default(source)) {
                if (!fs_1.default.existsSync(source) && source.slice(0, 1) === '/') {
                    source = source.slice(1);
                }
                source = path_1.default.resolve(settings.rootDir, source);
                const sourcePath = this._getRealFilePath(source);
                if (sourcePath) {
                    // get the file stats
                    const stats = fs_1.default.statSync(sourcePath);
                    const mTimeMs = stats.mtimeMs;
                    // try to get from cache
                    cacheId = md5_1.default.encrypt(`${sourcePath}-${mTimeMs}`);
                    // add the folder path in the includePaths setting
                    const filePath = folderPath_1.default(sourcePath);
                    sassSettings.includePaths.unshift(filePath);
                    settings.rootDir = filePath;
                    // read the file to get his content
                    dataObj.scss = fs_1.default.readFileSync(source, 'utf8');
                }
            }
            else {
                // set the scss property with the source
                dataObj.scss = source;
                // create the cache id using the source code
                cacheId = md5_1.default.encrypt(source);
            }
            // try to get from cache
            const cachedObj = yield cache.get(cacheId);
            if (this._settings.cache && cachedObj) {
                // build the css code to return
                dataObj = cachedObj;
                dataObj.fromCache = true;
            }
            // extract the things that can be used
            // by others like mixins and variables declarations$
            if (!dataObj.fromCache) {
                const ast = scss_parser_1.parse(dataObj.scss);
                const $ = query_ast_1.default(ast);
                let mixinsVariablesString = '';
                const nodes = $('stylesheet')
                    .children()
                    .filter((node) => {
                    return ((node.node.type === 'atrule' &&
                        node.node.value[0].value === 'mixin') ||
                        node.node.type === 'declaration');
                });
                nodes.nodes.forEach((node) => {
                    mixinsVariablesString += `
              ${scss_parser_2.stringify(node.node)}
            `;
                });
                // save the mixin and variables resources
                dataObj.mixinsAndVariables = mixinsVariablesString;
                // strip comments of not
                dataObj.scss = settings.stripComments
                    ? stripCssComments_1.default(dataObj.scss)
                    : dataObj.scss;
            }
            if (!dataObj.fromCache) {
                const findedImports = dataObj.scss.match(/^((?!\/\/)[\s]{0,999999999999}?)@import\s['"].*['"];/gm);
                if (findedImports && findedImports.length) {
                    // save imports
                    dataObj.importStatements = findedImports.map((s) => s.trim());
                }
            }
            // go down children
            const { children, scss } = yield this._compileImports(dataObj.importStatements, dataObj.scss, settings);
            dataObj.children = children;
            dataObj.scss = scss;
            let toCompile = `
            ${dataObj.sharedResources || ''}
          `;
            if (!settings._isChild) {
                toCompile += this._bundleChildren(dataObj);
                toCompile += dataObj.scss;
            }
            else {
                toCompile += dataObj.scss;
            }
            // compile
            if (!dataObj.fromCache || !settings._isChild) {
                if (settings.putUseOnTop) {
                    toCompile = putUseStatementsOnTop_1.default(toCompile);
                }
                const renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
                let compiledResultString = settings.stripComments
                    ? stripCssComments_1.default(renderObj.css.toString())
                    : renderObj.css.toString();
                dataObj.css = compiledResultString.trim();
                if (renderObj.map) {
                    dataObj.map = renderObj.map.toString();
                }
                // set in cache if needed
                if (settings.cache) {
                    cache.set(cacheId, dataObj);
                }
            }
            if (settings.minify && !settings._isChild) {
                dataObj.css = csso_1.default.minify(dataObj.css).css;
            }
            // remove empty lines
            if (dataObj.css) {
                try {
                    dataObj.css = dataObj.css.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '');
                }
                catch (e) { }
            }
            // banner
            if (!settings._isChild && settings.banner) {
                dataObj.css = `
            ${settings.banner}
            ${dataObj.css}
          `.trim();
            }
            // resolve with the compilation result
            resolve(Object.assign(Object.assign({}, dataObj), { startTime: startTime, endTime: Date.now(), duration: Date.now() - startTime }));
        }), {
            id: this._settings.id
        });
    }
    _findDependency(path) {
        for (let i = 0; i < this._includePaths.length; i++) {
            const includePath = this._includePaths[i];
            const realPath = this._getRealFilePath(`${includePath}/${path}`);
            if (realPath)
                return realPath;
        }
        return null;
    }
    _bundleChildren(object) {
        if (!object.children) {
            return '';
        }
        let resultString = '';
        Object.keys(object.children).forEach((importPath) => {
            const childObj = object.children[importPath];
            if (childObj.children) {
                const ch = this._bundleChildren(childObj);
                if (ch)
                    resultString += ch;
            }
            resultString += `
        ${childObj.css || ''}
      `;
        });
        return resultString;
    }
    _compileImports(importStatements, scss, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            // loop on each imports
            const childrenObj = {};
            let finalImports = {};
            for (let i = 0; i < importStatements.length; i++) {
                const importStatement = importStatements[i].trim();
                const importStatementPath = unquote_1.default(importStatement.replace('@import ', '').replace(';', '').trim());
                let importAbsolutePath = path_1.default.resolve(settings.rootDir, importStatementPath);
                if (is_glob_1.default(importAbsolutePath)) {
                    if (!finalImports[importStatement]) {
                        finalImports[importStatement] = {
                            rawStatement: importStatement,
                            rawPath: importStatementPath,
                            paths: []
                        };
                    }
                    const globPaths = glob_1.default.sync(importAbsolutePath, {});
                    if (globPaths && globPaths.length) {
                        globPaths.forEach((path) => {
                            finalImports[importStatement].paths.push({
                                absolutePath: path,
                                relativePath: path_1.default.relative(settings.rootDir, path)
                            });
                        });
                    }
                    continue;
                }
                finalImports[importStatement] = {
                    rawStatement: importStatement,
                    rawPath: importStatementPath,
                    paths: [
                        {
                            absolutePath: importAbsolutePath,
                            relativePath: path_1.default.relative(settings.rootDir, importAbsolutePath)
                        }
                    ]
                };
            }
            for (let i = 0; i < Object.keys(finalImports).length; i++) {
                const importObj = finalImports[Object.keys(finalImports)[i]];
                for (let j = 0; j < importObj.paths.length; j++) {
                    const pathObj = importObj.paths[j];
                    const importPath = this._getRealFilePath(pathObj.absolutePath);
                    if (importPath) {
                        // compile the finded path
                        const compileRes = yield this.compile(importPath, Object.assign(Object.assign({}, settings), { _isChild: true, rootDir: folderPath_1.default(importPath) }));
                        childrenObj[pathObj.absolutePath] = compileRes;
                    }
                }
                scss = scss.replace(importObj.rawStatement, '');
            }
            return {
                children: childrenObj,
                scss
            };
        });
    }
    _getRealFilePath(path) {
        const extension = extension_1.default(path);
        const filename = filename_1.default(path);
        const folderPath = folderPath_1.default(path);
        let pattern;
        if (!extension) {
            pattern = `${folderPath}/?(_)${filename}.*`;
        }
        else {
            pattern = `${folderPath}/?(_)${filename}`;
        }
        const potentialPaths = glob_1.default.sync(pattern);
        if (potentialPaths && potentialPaths.length) {
            return potentialPaths[0];
        }
        return null;
    }
};
