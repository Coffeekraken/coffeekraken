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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __getRoot from './utils/getRoot';
import __cacache from 'cacache';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        target: 'prod',
        inlineImport: true,
        cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
    }, settings);
    const cacheDir = `${__packageCacheDir()}/postcssSugarPlugin`;
    // load all the styles
    // const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    // const stylesCss: string[] = [];
    // stylesPaths.forEach((path) => {
    //   stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    // });
    function pluginIntegrityHash() {
        const hash = __folderHash(`${__dirname()}`, {
            include: {
                ctime: true,
            },
        });
        return hash;
    }
    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
        return;
    }
    function fromCache(hash, id = 'unknown') {
        return __awaiter(this, void 0, void 0, function* () {
            let cached;
            if (!settings.cache)
                return;
            try {
                cached = yield __cacache.get(cacheDir, `${hash}-${pluginIntegrityHash()}`);
            }
            catch (e) { }
            if (cached) {
                if (id) {
                    return `/* FROMCACHE:${hash}:${id} */`;
                }
                return `/* FROMCACHE:${hash} */`;
            }
            return;
        });
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
        return settings.target === 'dev';
    }
    function replaceWith(atRule, nodes) {
        if (nodes instanceof CssVars) {
            nodes = nodes._stack;
        }
        nodes = !Array.isArray(nodes) ? [nodes] : nodes;
        atRule.walkComments((comment) => {
            comment.remove();
        });
        let isAllText = true;
        nodes.forEach((n) => {
            if (!isAllText)
                return;
            if (typeof n !== 'string')
                isAllText = false;
        });
        if (isAllText)
            nodes = [nodes.join('\n')];
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
    const mixinsStack = {}, functionsStack = {}, postProcessorsRegisteredFn = [];
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
    function _load() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
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
            return true;
        });
    }
    class CssVars {
        constructor(str) {
            this._stack = [];
            if (str)
                this._stack.push(str);
        }
        comment(str) {
            return this;
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
        Once() {
            return __awaiter(this, void 0, void 0, function* () {
                if (__SBench.isBenchActive('postcssSugarPlugin')) {
                    __SBench.start('postcssSugarPlugin');
                }
                // if (useCache) {
                //     try {
                //         const cached = await __cacache.get(
                //             cacheDir,
                //             'postcssSugarPlugin',
                //         );
                //         if (cached) {
                //             console.log('LOADED FROM CACHE');
                //             cacheObj = JSON.parse(cached.data.toString());
                //         }
                //     } catch (e) {}
                // }
                yield _load();
            });
        },
        OnceExit(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                    const fn = postProcessorsRegisteredFn[i];
                    yield fn();
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
                if (__SBench.isBenchActive('postcssSugarPlugin')) {
                    __SBench.end('postcssSugarPlugin', true);
                }
                const pluginHash = pluginIntegrityHash();
                // caching system
                if (settings.cache) {
                    const $comments = [];
                    root.walkComments((comment) => __awaiter(this, void 0, void 0, function* () {
                        $comments.push(comment);
                    }));
                    for (let i = 0; i < $comments.length; i++) {
                        const comment = $comments[i];
                        // handle things to cache
                        const toCacheMatches = comment.text
                            .trim()
                            .match(/^CACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (toCacheMatches) {
                            const nodes = [];
                            const cacheHash = toCacheMatches[1];
                            const cacheId = (_a = toCacheMatches[2]) !== null && _a !== void 0 ? _a : 'unkown';
                            let endFinded = false, $current = comment;
                            let protectLoopIdx = 0;
                            while (!endFinded) {
                                protectLoopIdx++;
                                if (protectLoopIdx >= 9999) {
                                    console.log(`[warning] The postcssSugarPlugin cache id "${cacheHash}:${cacheId}" seems to miss his end comment "/* ENDCACHE:${cacheHash} */"...`);
                                    break;
                                }
                                $current = $current.next();
                                if ($current.type !== 'comment') {
                                    nodes.push($current);
                                    continue;
                                }
                                const endCachParts = $current.text
                                    .trim()
                                    .split(':');
                                if (endCachParts.length >= 2 &&
                                    endCachParts[0] === 'ENDCACHE') {
                                    endFinded = true;
                                    break;
                                }
                                else {
                                    nodes.push($current);
                                    continue;
                                }
                            }
                            const cacheStr = nodes
                                .map((n) => n.toString())
                                .join('\n');
                            console.log(`<yellow>[postcss]</yellow> Caching "<cyan>${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}</cyan>"...`);
                            yield __cacache.put(cacheDir, `${cacheHash}-${pluginHash}`, cacheStr);
                        }
                        // handle code coming from cache
                        const fromCacheMatches = comment.text
                            .trim()
                            .match(/^FROMCACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (fromCacheMatches) {
                            const cacheHash = fromCacheMatches[1];
                            const cacheId = (_b = fromCacheMatches[2]) !== null && _b !== void 0 ? _b : 'unkown';
                            let cached;
                            try {
                                cached = yield __cacache.get(cacheDir, `${cacheHash}-${pluginHash}`);
                            }
                            catch (e) { }
                            if (cached) {
                                console.log(`<yellow>[cache]</yellow> Getting "<cyan>${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}</cyan>" from cache...`);
                                // console.log(cached.data.toString());
                                comment.replaceWith(cached.data.toString());
                            }
                        }
                    }
                }
            });
        },
        AtRule(atRule, postcssApi) {
            return __awaiter(this, void 0, void 0, function* () {
                if (atRule.name.match(/^sugar\./)) {
                    let mixinId = atRule.name.replace(/^sugar\./, '');
                    if (!mixinsStack[mixinId]) {
                        mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                    }
                    if (!mixinsStack[mixinId]) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                    }
                    const mixinObj = mixinsStack[mixinId];
                    // let dependenciesHash;
                    // if (useCache) {
                    //     dependenciesHash = await __dependenciesHash({
                    //         files: [mixinObj.path],
                    //         data: {
                    //             path: mixinObj.path,
                    //             params: atRule.params,
                    //         },
                    //     });
                    // }
                    const root = __getRoot(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();
                    const mixinFn = mixinsStack[mixinId].mixin;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const sanitizedParams = atRule.params;
                    const params = mixinInterface.apply(sanitizedParams, {});
                    delete params.help;
                    let result = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        fromCache,
                        CssVars,
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
                        if (result instanceof CssVars) {
                            result = result._stack;
                        }
                        if (!Array.isArray(result))
                            result = [result];
                        replaceWith(atRule, result);
                    }
                    // if (result && useCache) {
                    //     // cacheObj[dependenciesHash] = result.join('\n');
                    //     // __cacache.put(
                    //     //     cacheDir,
                    //     //     dependenciesHash,
                    //     //     result.join('\n'),
                    //     // );
                    //     // nodeCache.set(dependenciesHash, result.join('\n'));
                    // }
                }
                else if (atRule.name.match(/^import/)) {
                    // check settings
                    if (!settings.inlineImport)
                        return;
                    // do not take care of imported assets using url('...');
                    if (atRule.params.match(/^url\(/))
                        return;
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
                // replace vh units
                const vhMatches = decl.value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
                if (vhMatches) {
                    vhMatches.forEach((match) => {
                        if (match.match(/^var\(--vh,/))
                            return;
                        const val = match.replace('vh', '');
                        decl.value = decl.value.replace(match, `calc(${val} * var(--vh,1vh))`);
                    });
                }
                if (!decl.prop || !decl.value)
                    return;
                if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                    return;
                const calls = decl.value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
                if (!calls || !calls.length)
                    return;
                for (let i = 0; i < calls.length; i++) {
                    let sugarStatement = calls[i];
                    // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                    const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
                    const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
                    if (openingParenthesisCount > closingParenthesisCount) {
                        sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                    }
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
                    // let dependenciesHash;
                    // if (useCache) {
                    //     dependenciesHash = await __dependenciesHash({
                    //         files: [fnObject.path],
                    //         data: {
                    //             path: fnObject.path,
                    //             params,
                    //         },
                    //     });
                    //     // // check cache
                    //     // try {
                    //     //     const cached = cacheObj[dependenciesHash];
                    //     //     // const cached = await __cacache.get(
                    //     //     //     cacheDir,
                    //     //     //     dependenciesHash,
                    //     //     // );
                    //     //     // const cached = nodeCache.get(dependenciesHash);
                    //     //     if (cached) {
                    //     //         // console.log(
                    //     //         //     'From cache function',
                    //     //         //     functionName,
                    //     //         //     paramsStatement,
                    //     //         // );
                    //     //         // decl.value = cached.data.toString();
                    //     //         decl.value = cached;
                    //     //         return;
                    //     //     }
                    //     // } catch (e) {}
                    // }
                    try {
                        const result = yield fnObject.fn({
                            params,
                            settings,
                        });
                        decl.value = decl.value.replace(sugarStatement, result);
                        // if (result && useCache) {
                        //     // console.log('SET cache FN', functionName, result);
                        //     cacheObj[dependenciesHash] = result;
                        //     // __cacache.put(cacheDir, dependenciesHash, result);
                        //     // nodeCache.set(dependenciesHash, result.join('\n'));
                        // }
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                }
            });
        },
    };
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBRTlFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFLaEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ2QsWUFBWSxFQUFFLElBQUk7UUFDbEIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7S0FDeEQsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLEdBQUcsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7SUFFN0Qsc0JBQXNCO0lBRXRCLGtFQUFrRTtJQUNsRSxrQ0FBa0M7SUFDbEMsa0NB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