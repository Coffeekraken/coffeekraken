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
pluginHash = 'hhh';
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
    function _loadConfig() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            settings = (0, deepMerge_1.default)({
                excludeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeByTypes'),
                excludeCommentByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCommentByTypes'),
                excludeCodeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCodeByTypes'),
                target: 'production',
                inlineImport: true,
                cache: s_sugar_config_1.default.get('postcssSugarPlugin.cache'),
            }, settings);
            // remove cache if not for vite target
            if (settings.cache === undefined && settings.target !== 'vite') {
                settings.cache = false;
            }
            settings.cache = false;
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
    function cache(id, hash, content) {
        if (!settings.cache)
            return content;
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
            // sugar config
            // await __SSugarConfig.load();
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
                    // const fileHash = __fileHash(root.source.input.from, {
                    //     include: {
                    //         ctime: true,
                    //     },
                    // });
                    // const hash = __objectHash({
                    //     fileHash,
                    //     theme: __STheme.hash,
                    // });
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
                        cache,
                        nodesToString,
                        CssVars: CssVars_1.default,
                        pluginHash,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELG9FQUE2QztBQUM3QyxrRkFBNEQ7QUFDNUQsd0ZBQWtFO0FBQ2xFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsb0dBQThFO0FBQzlFLDRGQUFzRTtBQUN0RSxpR0FBMkU7QUFDM0UsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUNsRSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLHFHQUErRTtBQUMvRSx3REFBa0M7QUFFbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksVUFBVSxHQUFHLElBQUEsb0JBQVksRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQy9ELE9BQU8sRUFBRTtRQUNMLEtBQUssRUFBRSxJQUFJO0tBQ2Q7Q0FDSixDQUFDLEVBQ0YsT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRXpCLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFXbkIsU0FBZ0IsZ0JBQWdCO0lBQzVCLE9BQU8sd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUZELDRDQUVDO0FBQ0QsU0FBZ0IsYUFBYTtJQUN6QixPQUFPLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLElBQTRCO0lBQ2pFLHNCQUFzQjtJQUN0QixNQUFN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