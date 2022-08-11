"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postcss = exports.getMixinsOrFunctionsList = exports.getMixinsList = exports.getFunctionsList = void 0;
// import __postcss from 'postcss';
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const folderHash_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderHash"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const packageCacheDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageCacheDir"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/node/token/replaceTokens"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const unquote_1 = __importDefault(require("@coffeekraken/sugar/shared/string/unquote"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const getRoot_1 = __importDefault(require("./utils/getRoot"));
const compressVarName_1 = __importDefault(require("@coffeekraken/sugar/shared/css/compressVarName"));
const CssVars_1 = __importDefault(require("./CssVars"));
const mixinsStack = {}, functionsStack = {};
let pluginHash = (0, folderHash_1.default)(path_1.default.resolve((0, dirname_1.default)(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise;
const _cacheObjById = {};
function getFunctionsList() {
    return getMixinsOrFunctionsList('functions');
}
exports.getFunctionsList = getFunctionsList;
function getMixinsList() {
    return getMixinsOrFunctionsList('mixins');
}
exports.getMixinsList = getMixinsList;
function getMixinsOrFunctionsList(what) {
    // process some tokens
    const folderPath = (0, replaceTokens_1.default)(`${(0, dirname_1.default)()}/${what}`);
    const paths = glob_1.default
        .sync(`${folderPath}/**/*.js`, {
        cwd: '',
    })
        .map((path) => {
        const relativePath = path_1.default.relative(folderPath, path);
        let dotPath = relativePath
            .replace(/\//g, '.')
            .split('.')
            .slice(0, -1)
            .join('.'), dotCall = dotPath;
        const parts = dotPath.split('.');
        if (parts.slice(-2)[0] === parts.slice(-1)[0]) {
            dotCall = parts.slice(0, -1).join('.');
        }
        return {
            path,
            dotPath,
            dotCall,
        };
    });
    return paths;
}
exports.getMixinsOrFunctionsList = getMixinsOrFunctionsList;
const plugin = (settings = {}) => {
    settings = (0, deepMerge_1.default)({
        excludeByTypes: [],
        excludeCommentByTypes: [],
        excludeCodeByTypes: [],
        target: 'production',
        inlineImport: true,
        cache: false,
    }, settings);
    let themeHash, cacheDir;
    function _loadConfig() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            settings = (0, deepMerge_1.default)(settings, {
                excludeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeByTypes'),
                excludeCommentByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCommentByTypes'),
                excludeCodeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCodeByTypes'),
                cache: s_sugar_config_1.default.get('postcssSugarPlugin.cache'),
            });
            // set theme hash
            themeHash = s_theme_1.default.hash();
            // set cache directory
            cacheDir = `${(0, packageCacheDir_1.default)()}/postcssSugarPlugin`;
            // remove cache if not for vite target
            if (settings.cache === undefined && settings.target !== 'vite') {
                settings.cache = false;
            }
            if ((_a = settings.excludeByTypes) === null || _a === void 0 ? void 0 : _a.length) {
                CssVars_1.default.excludeByTypes(settings.excludeByTypes);
            }
            if ((_b = settings.excludeCommentByTypes) === null || _b === void 0 ? void 0 : _b.length) {
                CssVars_1.default.excludeCommentByTypes(settings.excludeCommentByTypes);
            }
            if ((_c = settings.excludeCodeByTypes) === null || _c === void 0 ? void 0 : _c.length) {
                CssVars_1.default.excludeCodeByTypes(settings.excludeCodeByTypes);
            }
            return true;
        });
    }
    function contentToArray(content) {
        if (content instanceof CssVars_1.default) {
            content = content.toString();
        }
        if (!Array.isArray(content))
            content = [content];
        return content;
    }
    function contentToString(content) {
        return contentToArray(content).join('\n');
    }
    function findUp(node, checker) {
        if (!node)
            return;
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
        return;
    }
    const _cacheHashById = {};
    function saveCache() {
        // store the hash for the id
        if (!_cacheObjById[id])
            _cacheObjById[id] = {};
        _cacheObjById[id].hash = hash;
        _cacheObjById[id].content = content;
        const cachePath = getCacheFilePath(hash);
        if (!fs_1.default.existsSync(cachePath)) {
            console.log(`<yellow>[cache]</yellow> Caching object "<cyan>${id}</cyan>"`);
            const returned = `
                /* CACHE:${hash} */
                ${Array.isArray(content) ? content.join('\n') : content}
                /* ENDCACHE:${hash} */
            `;
            _cacheObjById[id].return = returned;
        }
        console.log(`<green>[postcss]</green> Object "<cyan>${id}</cyan>" taken from cache`);
        // const returned = `/* FROMCACHE:${hash} */`;
        try {
            const returned = fs_1.default.readFileSync(cachePath, 'utf8').toString();
            _cacheObjById[id].return = returned;
            return returned;
        }
        catch (e) { }
        return content;
    }
    function getCacheFilePath(cacheId) {
        const fileName = `${cacheId}.css`;
        return `${(0, packageCacheDir_1.default)()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
    }
    // function applyNoScopes(scopes: string[], fromNode): string[] {
    //     const noScopeRule = findUp(fromNode, (node) => {
    //         if (node?.name === 'sugar.scope.no') return node;
    //         return;
    //     });
    //     if (noScopeRule && noScopeRule.params) {
    //         const noScopes = noScopeRule.params
    //             .trim()
    //             .replace(/^\(/, '')
    //             .replace(/\)$/, '')
    //             .split(/[,\s]/)
    //             .map((l) => l.trim());
    //         const newScopes = scopes.filter((scope) => {
    //             return noScopes.indexOf(scope) === -1;
    //         });
    //         return newScopes;
    //     }
    //     return scopes;
    // }
    function nodesToString(nodes) {
        return nodes
            .map((node) => node.toString())
            .map((l) => l.trim())
            .map((n) => {
            if (!n.match(/(\{|\}|\*\/|;)$/))
                n += ';';
            return n;
        })
            .join('\n');
    }
    function replaceWith(atRule, nodes) {
        nodes = contentToArray(nodes);
        // atRule.walkComments((comment) => {
        //     comment.remove();
        // });
        // let isAllText = true;
        // nodes.forEach((n) => {
        //     if (!isAllText) return;
        //     if (typeof n !== 'string') isAllText = false;
        // });
        // if (isAllText) nodes = [nodes.join('\n')];
        if (atRule.parent) {
            let finalNodes = [];
            nodes
                .map((n) => (typeof n === 'string' ? n.trim() : n))
                .forEach((n) => {
                var _a;
                if (typeof n === 'string') {
                    finalNodes = [
                        ...finalNodes,
                        ...((_a = postcss_1.default.parse(n).nodes) !== null && _a !== void 0 ? _a : []),
                    ];
                }
                else {
                    finalNodes.push(n);
                }
            });
            for (const node of finalNodes.reverse()) {
                if (!node)
                    continue;
                atRule.parent.insertAfter(atRule, node);
            }
        }
        atRule.remove();
    }
    const sharedData = {
        noScopes: [],
    };
    const postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
            // process some tokens
            folderPath = (0, replaceTokens_1.default)(folderPath);
            const paths = glob_1.default.sync(`${folderPath}/**/*.js`, {
                // cwd: __dirname(),
                cwd: '',
            });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const { default: fn, interface: int, dependencies, } = yield Promise.resolve().then(() => __importStar(require(path)));
                if (type === 'mixins') {
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                }
                else {
                    functionsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                    functionsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                }
            }
        });
    }
    function _processDeclaration(value, atRule) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // replace vh units
            const vhMatches = value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
            if (vhMatches) {
                vhMatches.forEach((match) => {
                    if (match.match(/^var\(--vh,/))
                        return;
                    const val = match.replace('vh', '');
                    value = value.replace(match, `calc(${val} * var(--vh,1vh)) `);
                });
            }
            if (!value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                return value;
            const calls = value.match(/@?sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
            if (!calls || !calls.length)
                return value;
            for (let i = 0; i < calls.length; i++) {
                let sugarStatement = (_a = calls[i]) !== null && _a !== void 0 ? _a : '';
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (sugarStatement.match(/\(/g) || [])
                    .length;
                const closingParenthesisCount = (sugarStatement.match(/\)/g) || [])
                    .length;
                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                }
                let stack = functionsStack;
                if (sugarStatement.trim().match(/^\@/)) {
                    stack = mixinsStack;
                }
                // @ts-ignore
                const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                let fnId = functionName;
                if (!stack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }
                const fnObject = stack[fnId];
                if (!fnObject) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = stack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                // for (let [key, value] of Object.entries(params)) {
                //     if (key === 'dotPath') continue;
                //     if (
                //         typeof value === 'string' &&
                //         value.match(/^theme\.[a-zA-Z0-9_-]+/)
                //     ) {
                //         const themeValue = __STheme.getSafe(
                //             value.replace(/^theme\./, ''),
                //         );
                //         if (themeValue === undefined) continue;
                //         params[key] = themeValue;
                //         console.log('THEME', params[key], key);
                //     }
                // }
                function themeValueProxy(dotPathOrValue) {
                    const value = s_theme_1.default.getSafe(dotPathOrValue);
                    if (value !== undefined)
                        return value;
                    return dotPathOrValue;
                }
                try {
                    const result = yield fnObject.fn({
                        params,
                        atRule,
                        settings,
                        cacheDir,
                        pluginHash,
                        themeHash,
                        themeValueProxy,
                    });
                    value = value.replace(sugarStatement, result);
                }
                catch (e) {
                    console.error(e.message);
                }
            }
            return value;
        });
    }
    function _load() {
        if (loadedPromise)
            return loadedPromise;
        loadedPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // load config
            yield _loadConfig();
            // func sugar json
            const sugarJsonInstance = new s_sugar_json_1.default();
            const sugarJson = yield sugarJsonInstance.read();
            for (let i = 0; i < Object.keys(sugarJson).length; i++) {
                const packageName = Object.keys(sugarJson)[i];
                const packageSugarJson = sugarJson[packageName];
                if (!packageSugarJson.postcss)
                    continue;
                // mixins loading
                const mixinsFolders = (_b = (_a = packageSugarJson.postcss.folders) === null || _a === void 0 ? void 0 : _a.mixins) !== null && _b !== void 0 ? _b : [];
                for (let j = 0; j < mixinsFolders.length; j++) {
                    const folderObj = mixinsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = path_1.default.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'mixins');
                }
                // functions loading
                const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) === null || _c === void 0 ? void 0 : _c.functions) !== null && _d !== void 0 ? _d : [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = path_1.default.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'functions');
                }
            }
            // list all mixins
            yield _loadFolder(`${(0, dirname_1.default)()}/mixins`, 'mixins');
            // list all functions
            yield _loadFolder(`${(0, dirname_1.default)()}/functions`, 'functions');
            resolve(true);
        }));
        return loadedPromise;
    }
    return {
        postcssPlugin: 'sugar',
        Once(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                s_bench_1.default.start('postcssSugarPlugin');
                yield _load();
                if ((_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from) {
                    if (!rootDir) {
                        rootDir = (0, folderPath_1.default)(root.source.input.from);
                    }
                }
            });
        },
        OnceExit(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                    const fn = postProcessorsRegisteredFn[i];
                    yield fn(root);
                }
                const postProcessorsPaths = glob_1.default.sync('**/*.js', {
                    cwd: `${(0, dirname_1.default)()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield Promise.resolve().then(() => __importStar(require(`${(0, dirname_1.default)()}/postProcessors/${path}`)));
                    yield processorFn({
                        CssVars: CssVars_1.default,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: getRoot_1.default,
                        getCacheFilePath,
                        settings,
                        root,
                        sharedData,
                    });
                }
                let cssStr = root.toString();
                // CACHE
                const cacheMatches = cssStr.match(/\/\*\sCACHE:[a-zA-Z0-9@\._-]+\s\*\//gm);
                cacheMatches === null || cacheMatches === void 0 ? void 0 : cacheMatches.forEach((cacheStr) => {
                    const cacheId = cacheStr
                        .replace('/* CACHE:', '')
                        .replace(' */', '')
                        .trim();
                    const toCache = cssStr.match(new RegExp(`\\/\\*\\sCACHE:${cacheId}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sENDCACHE:${cacheId}\\s\\*\\/`, 'g'));
                    if (!toCache)
                        return;
                    const cachePath = getCacheFilePath(cacheId);
                    const toCacheStr = toCache[0]
                        .replace(`/* CACHE:${cacheId} */`, '')
                        .replace(`/* ENDCACHE:${cacheId} */`, '');
                    (0, writeFileSync_1.default)(cachePath, toCacheStr);
                });
                // compress --s-theme-... variables
                root.walkDecls((node) => {
                    if (node.variable) {
                        if (node.prop.match(/--s-theme/)) {
                            const compressedProp = (0, compressVarName_1.default)(node.prop);
                            node.prop = compressedProp;
                        }
                    }
                    const valueMatches = node.value.match(/--s-theme-[^,\)]+/gm);
                    if (valueMatches) {
                        valueMatches.forEach((match) => {
                            node.value = node.value.replace(match, (0, compressVarName_1.default)(match));
                        });
                    }
                });
                s_bench_1.default.end('postcssSugarPlugin').log({
                    body: `File: <cyan>${path_1.default.relative((0, packageRoot_1.default)(), (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from)}</cyan>`,
                });
            });
        },
        AtRule(atRule, postcssApi) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (atRule.name.match(/^sugar\./)) {
                    let mixinId = atRule.name.replace(/^sugar\./, '');
                    if (!mixinsStack[mixinId]) {
                        mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                    }
                    if (!mixinsStack[mixinId]) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                    }
                    const root = (0, getRoot_1.default)(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? path_1.default.dirname(root.source.input.file)
                        : (0, dirname_1.default)();
                    const mixinFn = mixinsStack[mixinId].fn;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const processedParams = yield _processDeclaration(atRule.params, atRule);
                    const params = mixinInterface.apply(processedParams, {});
                    delete params.help;
                    let result = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        nodesToString,
                        CssVars: CssVars_1.default,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: getRoot_1.default,
                        getCacheFilePath,
                        replaceWith(nodes) {
                            replaceWith(atRule, nodes);
                        },
                        atRootStart(css) {
                            const root = (0, getRoot_1.default)(atRule);
                            root.prepend(css);
                        },
                        atRootEnd(css) {
                            const root = (0, getRoot_1.default)(atRule);
                            root.append(css);
                        },
                        postcssApi,
                        sourcePath,
                        sharedData,
                        registerPostProcessor(fn) {
                            postProcessorsRegisteredFn.push(fn);
                        },
                        postcss: postcss_1.default,
                        settings,
                    });
                    if (result) {
                        result = contentToString(result);
                        replaceWith(atRule, result);
                    }
                }
                else if (atRule.name.match(/^import/)) {
                    // check settings
                    if (!settings.inlineImport)
                        return;
                    // do not take care of imported assets using url('...');
                    if (atRule.params.match(/^url\(/))
                        return;
                    if (!((_a = atRule.source) === null || _a === void 0 ? void 0 : _a.input)) {
                        throw new Error(`Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`);
                    }
                    const dirName = typeof atRule.source.input.file === 'string'
                        ? path_1.default.dirname(atRule.source.input.file)
                        : (0, dirname_1.default)();
                    const path = path_1.default.resolve(dirName, (0, unquote_1.default)(atRule.params));
                    if (!fs_1.default.existsSync(path)) {
                        throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
                    }
                    const contentStr = fs_1.default.readFileSync(path, 'utf8').toString();
                    atRule.after(contentStr);
                    atRule.remove();
                }
            });
        },
        Declaration(decl) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!decl.prop)
                    return;
                decl.value = yield _processDeclaration(decl.value);
            });
        },
    };
};
plugin.postcss = true;
exports.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELG9FQUE2QztBQUM3QyxrRkFBNEQ7QUFDNUQsd0ZBQWtFO0FBQ2xFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsb0dBQThFO0FBQzlFLDRGQUFzRTtBQUN0RSxpR0FBMkU7QUFDM0UsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUNsRSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLHFHQUErRTtBQUMvRSx3REFBa0M7QUFFbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksVUFBVSxHQUFHLElBQUEsb0JBQVksRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQy9ELE9BQU8sRUFBRTtRQUNMLEtBQUssRUFBRSxJQUFJO0tBQ2Q7Q0FDSixDQUFDLEVBQ0YsT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBV3pCLFNBQWdCLGdCQUFnQjtJQUM1QixPQUFPLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFGRCw0Q0FFQztBQUNELFNBQWdCLGFBQWE7SUFDekIsT0FBTyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxJQUE0QjtJQUNqRSxzQkFBc0I7SUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBQSx1QkFBZSxFQUFD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