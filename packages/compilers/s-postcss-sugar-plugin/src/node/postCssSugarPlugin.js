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
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __STheme from '@coffeekraken/s-theme';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __getRoot from './utils/getRoot';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
let _mixinsPaths;
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise, alreadyLoaded = false;
const _cacheObjById = {};
pluginHash = 'hhh';
const plugin = (settings = {}) => {
    settings = __deepMerge({
        target: 'prod',
        inlineImport: true,
        cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
    }, settings);
    // remove cache if not for vite target
    if (settings.target !== 'vite') {
        settings.cache = false;
    }
    function contentToArray(content) {
        if (content instanceof CssVars) {
            content = content._stack;
        }
        if (!Array.isArray(content))
            content = [content];
        return content;
    }
    function contentToString(content) {
        return contentToArray(content).join('\n');
    }
    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
        return;
    }
    const _cacheHashById = {};
    function cache(id, hash, content) {
        // return `/* FROMCACHE:${hash} */`;
        // if (!settings.cache) return content;
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
        const returned = `/* FROMCACHE:${hash} */`;
        _cacheObjById[id].return = returned;
        return returned;
    }
    function getCacheFilePath(cacheId) {
        const fileName = `${cacheId}.css`;
        return `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
    }
    function applyNoScopes(scopes, fromNode) {
        const noScopeRule = findUp(fromNode, (node) => {
            if ((node === null || node === void 0 ? void 0 : node.name) === 'sugar.scope.no')
                return node;
            return;
        });
        if (noScopeRule && noScopeRule.params) {
            const noScopes = noScopeRule.params
                .trim()
                .replace(/^\(/, '')
                .replace(/\)$/, '')
                .split(/[,\s]/)
                .map((l) => l.trim());
            const newScopes = scopes.filter((scope) => {
                return noScopes.indexOf(scope) === -1;
            });
            return newScopes;
        }
        return scopes;
    }
    function commentsNeeded() {
        return settings.target !== 'vite';
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
            const paths = __glob.sync(`${folderPath}/**/*.js`, {
                // cwd: __dirname(),
                cwd: '',
            });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const { default: fn, interface: int, dependencies, } = yield import(`${path}`);
                if (type === 'mixins') {
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        mixin: fn,
                        interface: int,
                        dependencies,
                    };
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        mixin: fn,
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
    function _processDeclaration(value) {
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
            const calls = value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
            if (!calls || !calls.length)
                return value;
            for (let i = 0; i < calls.length; i++) {
                let sugarStatement = (_a = calls[i]) !== null && _a !== void 0 ? _a : '';
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
                const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                }
                // @ts-ignore
                const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                let fnId = functionName;
                if (!functionsStack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }
                const fnObject = functionsStack[fnId];
                if (!fnObject) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = functionsStack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                try {
                    const result = yield fnObject.fn({
                        params,
                        settings,
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
    class CssVars {
        constructor(str) {
            this._stack = [];
            if (str)
                this._stack.push(str);
        }
        comment(str) {
            if (!commentsNeeded())
                return this;
            if (typeof str === 'function')
                str = str();
            if (Array.isArray(str))
                str = str.join('\n');
            this._stack.push(str);
            return this;
        }
        code(str) {
            if (typeof str === 'function')
                str = str();
            if (Array.isArray(str))
                str = str.join('\n');
            this._stack.push(str);
            return this;
        }
        toString() {
            return this._stack.join('\n');
        }
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
                    const fileHash = __fileHash(root.source.input.from, {
                        include: {
                            ctime: true,
                        },
                    });
                    const hash = __objectHash({
                        fileHash,
                        theme: __STheme.hash,
                    });
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
                        root,
                        sharedData,
                    });
                }
                let cssStr = root.toString();
                // CACHE
                const cacheMatches = cssStr.match(/\/\*\sCACHE:[a-zA-Z0-9@\._-]+\s\*\//gm);
                cacheMatches === null || cacheMatches === void 0 ? void 0 : cacheMatches.forEach(cacheStr => {
                    const cacheId = cacheStr.replace('/* CACHE:', '').replace(' */', '').trim();
                    const toCache = cssStr.match(new RegExp(`\\/\\*\\sCACHE:${cacheId}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sENDCACHE:${cacheId}\\s\\*\\/`, 'g'));
                    if (!toCache)
                        return;
                    const cachePath = getCacheFilePath(cacheId);
                    const toCacheStr = toCache[0].replace(`/* CACHE:${cacheId} */`, '').replace(`/* ENDCACHE:${cacheId} */`, '');
                    __writeFileSync(cachePath, toCacheStr);
                });
                // root.walkComments((comment) => {
                //     if (comment.text.trim().match(/FROMCACHE:[a-zA-Z0-9@\._-]+/)) {
                //         const parts = comment.text.split(':').map(l => l.trim());
                //         const cacheHash = parts[1];
                //         const cacheId = parts[2];
                //         const fileName = `${cacheHash}.css`;
                //         const cacheUrl = `/cache/postcssSugarPlugin/${pluginHash}/${fileName}`;
                //         let newRule = __postcss.parse(`@import "${cacheUrl}";`);
                //         if (settings.target === 'vite') {
                //             newRule = __postcss.parse(`@import url("${cacheUrl}");`);
                //         }
                //         // comment.remove();
                //         root.prepend(newRule);
                //         // comment.replaceWith(newRule);
                //     }
                // });
                // MEDIA CLASSES
                const mediaClassesMatches = cssStr.match(/\/\*\sMEDIACLASSES:[a-zA-Z0-9_-]+\s\*\//gm);
                mediaClassesMatches === null || mediaClassesMatches === void 0 ? void 0 : mediaClassesMatches.forEach(mediaStr => {
                    const media = mediaStr.replace('/* MEDIACLASSES:', '').replace(' */', '').trim();
                    console.log('MED', media);
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
                    const mixinFn = mixinsStack[mixinId].mixin;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const processedParams = yield _processDeclaration(atRule.params);
                    const params = mixinInterface.apply(processedParams, {});
                    delete params.help;
                    let result = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        cache,
                        CssVars,
                        pluginHash,
                        getRoot: __getRoot,
                        getCacheFilePath,
                        commentsNeeded,
                        applyNoScopes(scopes = []) {
                            return applyNoScopes(scopes, atRule);
                        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBQzlFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUl4QyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQU14RSxJQUFJLFlBQVksQ0FBQztBQUVqQixNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUs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