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
import __getRoot from './utils/getRoot';
import __cacache from 'cacache';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
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
                cached = yield __cacache.get(cacheDir, hash);
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
    function replaceWith(atRule, nodes) {
        nodes = !Array.isArray(nodes) ? [nodes] : nodes;
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
                // root.walkComments((comment) => {
                //     comment.remove();
                // });
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
                            console.log(`[cache] Caching "${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}"...`);
                            yield __cacache.put(cacheDir, cacheHash, cacheStr);
                        }
                        // handle code coming from cache
                        const fromCacheMatches = comment.text
                            .trim()
                            .match(/^FROMCACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (fromCacheMatches) {
                            const cacheHash = fromCacheMatches[1];
                            const cacheId = (_b = fromCacheMatches[2]) !== null && _b !== void 0 ? _b : 'unkown';
                            const cached = yield __cacache.get(cacheDir, cacheHash);
                            if (cached) {
                                console.log(`[cache] Getting "${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}" from cache...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBRTlFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFLaEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFlBQVksRUFBRSxJQUFJO1FBQ2xCLEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO0tBQ3hELEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxHQUFHLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO0lBRTdELHNCQUFzQjtJQUV0QixrRUFBa0U7SUFDbEUsa0NBQWtDO0lBQ2xDLGtDQUFrQztJQUNsQyxnRUFBZ0U7SUFDaEUsTUFBTTtJQUVOLFNBQVMsTUFBTSxDQUFDLElBQUks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