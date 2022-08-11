var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';
import __compressVarName from '@coffeekraken/sugar/shared/css/compressVarName';
import __CssVars from './CssVars';
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise;
const _cacheObjById = {};
export function getFunctionsList() {
    return getMixinsOrFunctionsList('functions');
}
export function getMixinsList() {
    return getMixinsOrFunctionsList('mixins');
}
export function getMixinsOrFunctionsList(what) {
    // process some tokens
    const folderPath = __replaceTokens(`${__dirname()}/${what}`);
    const paths = __glob
        .sync(`${folderPath}/**/*.js`, {
        cwd: '',
    })
        .map((path) => {
        const relativePath = __path.relative(folderPath, path);
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
const plugin = (settings = {}) => {
    settings = __deepMerge({
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
            yield __SSugarConfig.load();
            settings = __deepMerge(settings, {
                excludeByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeByTypes'),
                excludeCommentByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeCommentByTypes'),
                excludeCodeByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeCodeByTypes'),
                cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
            });
            // set theme hash
            themeHash = __STheme.hash();
            // set cache directory
            cacheDir = `${__packageCacheDir()}/postcssSugarPlugin`;
            // remove cache if not for vite target
            if (settings.cache === undefined && settings.target !== 'vite') {
                settings.cache = false;
            }
            if ((_a = settings.excludeByTypes) === null || _a === void 0 ? void 0 : _a.length) {
                __CssVars.excludeByTypes(settings.excludeByTypes);
            }
            if ((_b = settings.excludeCommentByTypes) === null || _b === void 0 ? void 0 : _b.length) {
                __CssVars.excludeCommentByTypes(settings.excludeCommentByTypes);
            }
            if ((_c = settings.excludeCodeByTypes) === null || _c === void 0 ? void 0 : _c.length) {
                __CssVars.excludeCodeByTypes(settings.excludeCodeByTypes);
            }
            return true;
        });
    }
    function contentToArray(content) {
        if (content instanceof __CssVars) {
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
        if (!__fs.existsSync(cachePath)) {
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
            const returned = __fs.readFileSync(cachePath, 'utf8').toString();
            _cacheObjById[id].return = returned;
            return returned;
        }
        catch (e) { }
        return content;
    }
    function getCacheFilePath(cacheId) {
        const fileName = `${cacheId}.css`;
        return `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
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
                        ...((_a = __postcss.parse(n).nodes) !== null && _a !== void 0 ? _a : []),
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
            folderPath = __replaceTokens(folderPath);
            const paths = __glob.sync(`${folderPath}/**/*.js`, {
                // cwd: __dirname(),
                cwd: '',
            });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const { default: fn, interface: int, dependencies, } = yield import(path);
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
                    const value = __STheme.getSafe(dotPathOrValue);
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
            const sugarJsonInstance = new __SSugarJson();
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
                    const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'mixins');
                }
                // functions loading
                const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) === null || _c === void 0 ? void 0 : _c.functions) !== null && _d !== void 0 ? _d : [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'functions');
                }
            }
            // list all mixins
            yield _loadFolder(`${__dirname()}/mixins`, 'mixins');
            // list all functions
            yield _loadFolder(`${__dirname()}/functions`, 'functions');
            resolve(true);
        }));
        return loadedPromise;
    }
    return {
        postcssPlugin: 'sugar',
        Once(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                __SBench.start('postcssSugarPlugin');
                yield _load();
                if ((_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from) {
                    if (!rootDir) {
                        rootDir = __folderPath(root.source.input.from);
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
                const postProcessorsPaths = __glob.sync('**/*.js', {
                    cwd: `${__dirname()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield import(`${__dirname()}/postProcessors/${path}`);
                    yield processorFn({
                        CssVars: __CssVars,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: __getRoot,
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
                    __writeFileSync(cachePath, toCacheStr);
                });
                // compress --s-theme-... variables
                root.walkDecls((node) => {
                    if (node.variable) {
                        if (node.prop.match(/--s-theme/)) {
                            const compressedProp = __compressVarName(node.prop);
                            node.prop = compressedProp;
                        }
                    }
                    const valueMatches = node.value.match(/--s-theme-[^,\)]+/gm);
                    if (valueMatches) {
                        valueMatches.forEach((match) => {
                            node.value = node.value.replace(match, __compressVarName(match));
                        });
                    }
                });
                __SBench.end('postcssSugarPlugin').log({
                    body: `File: <cyan>${__path.relative(__packageRoot(), (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from)}</cyan>`,
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
                    const root = __getRoot(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();
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
                        CssVars: __CssVars,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: __getRoot,
                        getCacheFilePath,
                        replaceWith(nodes) {
                            replaceWith(atRule, nodes);
                        },
                        atRootStart(css) {
                            const root = __getRoot(atRule);
                            root.prepend(css);
                        },
                        atRootEnd(css) {
                            const root = __getRoot(atRule);
                            root.append(css);
                        },
                        postcssApi,
                        sourcePath,
                        sharedData,
                        registerPostProcessor(fn) {
                            postProcessorsRegisteredFn.push(fn);
                        },
                        postcss: __postcss,
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
                        ? __path.dirname(atRule.source.input.file)
                        : __dirname();
                    const path = __path.resolve(dirName, __unquote(atRule.params));
                    if (!__fs.existsSync(path)) {
                        throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
                    }
                    const contentStr = __fs.readFileSync(path, 'utf8').toString();
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
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBQzlFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLGlCQUFpQixNQUFNLGdEQUFnRCxDQUFDO0FBQy9FLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVB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