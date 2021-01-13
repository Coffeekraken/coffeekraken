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
var _a;
const extension_1 = __importDefault(require("../../fs/extension"));
const unquote_1 = __importDefault(require("../../string/unquote"));
const path_1 = __importDefault(require("path"));
const stripCssComments_1 = __importDefault(require("../../css/stripCssComments"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const sass_1 = __importDefault(require("sass"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const filename_1 = __importDefault(require("../../fs/filename"));
const fs_1 = __importDefault(require("fs"));
const getSharedResourcesString_1 = __importDefault(require("../utils/getSharedResourcesString"));
const putUseStatementsOnTop_1 = __importDefault(require("../utils/putUseStatementsOnTop"));
const glob_1 = __importDefault(require("glob"));
const csso_1 = __importDefault(require("csso"));
const is_glob_1 = __importDefault(require("is-glob"));
const unique_1 = __importDefault(require("../../array/unique"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SScssInterface_1 = __importDefault(require("./interface/SScssInterface"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const ensureDirSync_1 = __importDefault(require("../../fs/ensureDirSync"));
const SScssFile_1 = __importDefault(require("../SScssFile"));
module.exports = (_a = class SScssCompiler extends SCompiler_1.default {
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
            super(deepMerge_1.default({}, settings));
            this._includePaths = [];
            // prod
            if (this._settings.prod) {
                this._settings.cache = false;
                this._settings.style = 'compressed';
                this._settings.minify = true;
                this._settings.stripComments = true;
            }
        }
        /**
         * @name              _compile
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
        _compile(input, settings = {}) {
            return new SPromise_1.default((resolve, reject, trigger) => __awaiter(this, void 0, void 0, function* () {
                settings = deepMerge_1.default(this._settings, {
                    _isChild: false
                }, settings);
                const resultsObj = {};
                let filesPaths = [];
                // make input absolute
                input = absolute_1.default(input);
                // process inputs
                input.forEach((inputStr) => {
                    if (is_glob_1.default(inputStr)) {
                        filesPaths = [...filesPaths, ...glob_1.default.sync(inputStr)];
                    }
                    else {
                        filesPaths.push(inputStr);
                    }
                });
                const startTime = Date.now();
                for (let i = 0; i < filesPaths.length; i++) {
                    let filePath = filesPaths[i];
                    let file = new SScssFile_1.default(filePath);
                    let compileObj = {
                        file,
                        children: {},
                        importStatements: [],
                        includePaths: [],
                        sharedResources: null,
                        sharedResourcesStr: null,
                        sharedResourcesHash: null,
                        mixinsAndVariables: null,
                        mixinsAndVariablesFromChilds: null,
                        settings: Object.assign({}, settings),
                        outputPath: null,
                        scss: null,
                        css: null
                    };
                    const includePaths = unique_1.default([
                        ...(settings.includePaths
                            ? !Array.isArray(settings.includePaths)
                                ? [settings.includePaths]
                                : settings.includePaths
                            : []),
                        ...(settings.rootDir
                            ? !Array.isArray(settings.rootDir)
                                ? [settings.rootDir]
                                : settings.rootDir
                            : []),
                        ...(settings.sass && settings.sass.includePaths
                            ? !Array.isArray(settings.sass.includePaths)
                                ? [settings.sass.includePaths]
                                : settings.sass.includePaths
                            : []),
                        `${packageRoot_1.default()}/node_modules`
                    ]);
                    compileObj.includePaths = includePaths;
                    // shared resources
                    let sharedResources = settings.sharedResources || [];
                    if (!Array.isArray(sharedResources))
                        sharedResources = [sharedResources];
                    const sharedResourcesStr = getSharedResourcesString_1.default(sharedResources);
                    if (sharedResourcesStr) {
                        compileObj.sharedResources = sharedResources;
                        compileObj.sharedResourcesStr = sharedResourcesStr;
                        compileObj.sharedResourcesHash = md5_1.default.encrypt(sharedResourcesStr);
                    }
                    // sass settings
                    let sassPassedSettings = Object.assign({}, settings.sass || {});
                    delete sassPassedSettings.includePaths;
                    delete sassPassedSettings.sharedResources;
                    const sassSettings = deepMerge_1.default({
                        outputStyle: settings.style,
                        importer: [this._importer(compileObj)],
                        sourceMap: settings.map,
                        includePaths: compileObj.includePaths
                    }, sassPassedSettings);
                    // // engage the cache
                    // const fileCache = new __SFileCache(settings.id, {
                    //   ttl: '10d'
                    // });
                    // if (settings.clearCache && !settings._isChild) {
                    //   await fileCache.clear();
                    // }
                    const res = yield file.compile({
                        sharedResources: getSharedResourcesString_1.default(settings.sharedResources || [])
                    });
                    console.log(res);
                    return reject();
                    // go down children
                    const compileImportPromise = this._compileImports(compileObj, settings);
                    compileImportPromise.on('reject', (e) => {
                        reject(e);
                    });
                    const { files, scss } = yield compileImportPromise;
                    compileObj.children = files;
                    compileObj.scss = scss;
                    // generate the mixins and variables string from the children
                    compileObj.file.mixinsAndVariablesFromChilds = this._generateMixinsAndVariablesStringFromChilds(compileObj);
                    let css = '';
                    if (!settings._isChild) {
                        css = this._generateCssStringFromChilds(compileObj);
                    }
                    // init the string to compile
                    let toCompile = putUseStatementsOnTop_1.default(`
              ${compileObj.sharedResourcesStr || ''}
              ${compileObj.file.mixinsAndVariablesFromChilds || ''}
              ${css}
              ${compileObj.scss}
            `);
                    const cacheContext = {
                        toCompile,
                        sassSettings
                    };
                    // try to get from cache
                    let cachedObj = {};
                    if (settings.cache) {
                        cachedObj = yield fileCache.get(filePath, {
                            context: cacheContext
                        });
                        if (cachedObj) {
                            console.log('from cache', filePath);
                            // build the css code to return
                            compileObj = cachedObj;
                            compileObj.fromCache = true;
                        }
                    }
                    // if (!settings._isChild) {
                    //   toCompile += this._bundleChildren(compileObj);
                    //   toCompile += compileObj.scss;
                    // } else {
                    //   toCompile += compileObj.scss;
                    // }
                    // compile
                    if (!compileObj.fromCache) {
                        let renderObj;
                        let compiledResultString = '';
                        try {
                            renderObj = sass_1.default.renderSync(Object.assign(Object.assign({}, sassSettings), { data: toCompile }));
                        }
                        catch (e) {
                            return reject(e.toString());
                        }
                        compiledResultString = settings.stripComments
                            ? stripCssComments_1.default(renderObj.css.toString())
                            : renderObj.css.toString();
                        compileObj.css = compiledResultString.trim();
                        if (renderObj.map) {
                            compileObj.map = renderObj.map.toString();
                        }
                        // set in cache if needed
                        if (settings.cache) {
                            console.log('SAVE cache', filePath);
                            yield fileCache.set(filePath, compileObj, {
                                context: cacheContext
                            });
                        }
                    }
                    // minify
                    if (settings.minify) {
                        compileObj.css = csso_1.default.minify(compileObj.css).css;
                    }
                    // remove empty lines
                    if (compileObj.css) {
                        try {
                            compileObj.css = compileObj.css.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '');
                        }
                        catch (e) { }
                    }
                    // banner
                    if (!settings._isChild && settings.banner) {
                        compileObj.css = `
              ${settings.banner}
              ${compileObj.css}
            `.trim();
                    }
                    // check if need to save
                    if (settings.save === true) {
                        const outputPath = `${settings.outputDir}/${filePath.replace(`${settings.rootDir}/`, '')}`.replace(/\.s[c|a]ss$/, '.css');
                        trigger('log', {
                            value: `Saving the css file "<cyan>${outputPath.replace(`${packageRoot_1.default()}/`, '')}</cyan>"`
                        });
                        // saving the path
                        compileObj.outputPath = outputPath;
                        ensureDirSync_1.default(folderPath_1.default(outputPath));
                        fs_1.default.writeFileSync(outputPath, compileObj.css, 'utf8');
                    }
                    // save into results object
                    resultsObj[filePath] = compileObj;
                }
                // resolve with the compilation result
                resolve({
                    files: resultsObj,
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }), {
                id: this._settings.id
            });
        }
        _importer(compileObj) {
            return (url, prev, done) => {
                if (compileObj.sharedResourcesStr) {
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
              ${compileObj.sharedResourcesStr}
              ${content}
            `
                        };
                    }
                }
                return null;
            };
        }
        _generateMixinsAndVariablesStringFromChilds(compileObj) {
            let string = '';
            let hashes = [];
            Object.keys(compileObj.children).forEach((path) => {
                const childCompileObj = compileObj.children[path];
                if (childCompileObj.children) {
                    string += this._generateMixinsAndVariablesStringFromChilds(childCompileObj);
                }
                const hash = md5_1.default.encrypt(childcompileObj.file.mixinsAndVariables.replace(/\s/g, ''));
                if (hashes.indexOf(hash) !== -1)
                    return;
                hashes.push(hash);
                string += childcompileObj.file.mixinsAndVariables;
            });
            return string;
        }
        _generateCssStringFromChilds(compileObj) {
            let string = '';
            let hashes = [];
            Object.keys(compileObj.children).forEach((path) => {
                const childCompileObj = compileObj.children[path];
                if (childCompileObj.children) {
                    string += this._generateMixinsAndVariablesStringFromChilds(childCompileObj);
                }
                const hash = md5_1.default.encrypt(childCompileObj.css.replace(/\s/g, ''));
                if (hashes.indexOf(hash) !== -1)
                    return;
                hashes.push(hash);
                string += childCompileObj.css;
            });
            return string;
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
        _compileImports(compileObj, settings) {
            return new SPromise_1.default((resolve, reject, trigger) => __awaiter(this, void 0, void 0, function* () {
                // loop on each imports
                const childrenObj = {};
                let scss = compileObj.scss;
                let finalImports = {};
                const includePaths = unique_1.default(compileObj.includePaths);
                for (let i = 0; i < compileObj.importStatements.length; i++) {
                    const importStatement = compileObj.importStatements[i].trim();
                    const importStatementPath = unquote_1.default(importStatement.replace('@import ', '').replace(';', '').trim());
                    let importAbsolutePath;
                    // search in include paths
                    for (let j = 0; j < includePaths.length; j++) {
                        const includePath = includePaths[j];
                        const potentialPath = this._getRealFilePath(path_1.default.resolve(includePath, importStatementPath));
                        if (fs_1.default.existsSync(potentialPath)) {
                            importAbsolutePath = potentialPath;
                            break;
                        }
                    }
                    if (!importAbsolutePath) {
                        continue;
                    }
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
                            const compilePromise = this.compile(importPath, Object.assign(Object.assign({}, settings), { _isChild: true, rootDir: folderPath_1.default(importPath), save: false }));
                            compilePromise.on('reject', (e) => {
                                reject(e);
                            });
                            const compileRes = yield compilePromise;
                            childrenObj[pathObj.absolutePath] =
                                compileRes.files[Object.keys(compileRes.files)[0]];
                        }
                    }
                    scss = scss.replace(importObj.rawStatement, '');
                }
                resolve({
                    files: childrenObj,
                    scss
                });
            }));
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
    },
    _a.interface = SScssInterface_1.default,
    _a);
//# sourceMappingURL=SScssCompiler.js.map